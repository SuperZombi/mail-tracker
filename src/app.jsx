const services = [
	{
		"name": "An post", "value": "anpost",
		"img": "https://www.anpost.com/getapmedia/185a235d-2459-493c-b9aa-d800927e4674/An-Post-logo.jpg",
		"template": "https://www.anpost.com/Post-Parcels/Track/History?item={}"
	},
	{
		"name": "Nova posta", "value": "novapost",
		"img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz2w7BxtR4oDjLouwXrZ_nemt0R6PUZR8qcw&s",
		"template": "https://novaposhta.ua/en/tracking/{}"
	},
	{
		"name": "Ukr posta", "value": "ukrpost",
		"img": "https://media.acc.cv.ua/news/article/2017/07/14/8375/ukrposhta.w575.jpg",
		"template": "https://track.ukrposhta.ua/tracking_UA.html?barcode={}"
	},
	{
		"name": "Meest", "value": "meest",
		"img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJwE-Lw2TOHF0oDkWuh-1q9Xasbd_sx-0nISz3Es_RmBXfU8VDTbhosK9dg_0d2qcFuQ&usqp=CAU",
		"template": "https://ua.meest.com/parcel-track?parcel_number={}"
	}
]
const getService = (value) => {
	return services.find(s => s.value === value);
}
const openInNewTab = (service, query) => {
	const target_url = getService(service).template.replace("{}", query)
	window.open(target_url, "_blank")
}


const App = () => {
	const { useState, useEffect, Fragment } = React;

	const [searchParams, setSearchParams] = useState(() => new URLSearchParams(window.location.search))
	const [service, code] = [searchParams.get("service"), searchParams.get("code")]
	const [trackingData, setTrackingData] = useState(null)
	const [history, setHistory] = useState([])

	useEffect(() => {
		const saved = localStorage.getItem("history")
		if (saved){ setHistory(JSON.parse(saved)) }
	}, [])
	useEffect(() => {
		localStorage.setItem("history", JSON.stringify(history))
	}, [history])

	useEffect(_=>{
		const handler = _=>{
			setSearchParams(new URLSearchParams(window.location.search))
		}
		window.addEventListener("popstate", handler)
		return _=>{window.removeEventListener("popstate", handler)}
	}, [])

	const makeRequest = (service, query) => {
		changeQuery({"service": service, "code": query})
		saveToHistory(service, query)
	}
	const saveToHistory = (s, c) => {
		setHistory(prev => {
			const filtered = prev.filter(
				h => !(h.service === s && h.barcode === c)
			)
			return [{ "service": s, "barcode": c }, ...filtered]
		})
	}
	const changeQuery = paramsObj => {
		const params = new URLSearchParams(window.location.search)
		Object.entries(paramsObj).forEach(([key, value])=>{
			params.set(key, value)
		})
		const newUrl = `${window.location.pathname}?${params.toString()}`
		window.history.pushState({}, "", newUrl)
		setSearchParams(params)
	}
	const goHome = () => {
		window.history.pushState({}, "", window.location.pathname)
		setSearchParams(new URLSearchParams())
	}

	useEffect(()=>{
		setTrackingData(null)
		if (service && code){
			saveToHistory(service, code)
			const timer = setTimeout(_=>{
				if (code === "test"){
					setTrackingData([
						{"time": 1747270080, "text": "Your item has been delivered"},
						{"time": 1747252380, "text": "Your item is out for delivery"},
						{"time": 1746973620, "text": "We have received information about your incoming item from the sender"}
					])
				} else {
					setTrackingData([])
				}
			}, 500)
			return _=> clearTimeout(timer)
		}
	}, [service, code])

	if (service && code){
		return (
			<Fragment>
				<Header home={goHome}/>
				<TrackPage service={service} barcode={code} trackingData={trackingData}/>
			</Fragment>
		)
	}

	return (
		<Fragment>
			<Header home={goHome}/>
			<HomePage history={history} setHistory={setHistory} makeRequest={makeRequest}/>
		</Fragment>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
