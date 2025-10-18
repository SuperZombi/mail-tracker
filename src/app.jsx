const App = () => {
	const { useState, useEffect, useRef, Fragment} = React;
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

	const [searchQuery, setSearchQuery] = useState("")
	const [canSearch, setCanSearch] = useState(false)
	const [mailService, setMailService] = useState(null)
	const [history, setHistory] = useState([])
	const [searchParams, setSearchParams] = useState(() => new URLSearchParams(window.location.search))
	const [service, code] = [searchParams.get("service"), searchParams.get("code")]
	const [trackingData, setTrackingData] = useState(null)

	const getService = (value) => {
		return services.find(s => s.value === value);
	}

	useEffect(_=>{
		const handler = _=>{
			setSearchParams(new URLSearchParams(window.location.search))
		}

		window.addEventListener("popstate", handler)
		return _=>{window.removeEventListener("popstate", handler)}
	}, [])

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

	const onSearchServiceChange = service=>{
		if (service){
			setCanSearch(true)
			setMailService(service)
		} else {
			setCanSearch(false)
			setMailService(null)
		}
	}

	useEffect(() => {
		const saved = localStorage.getItem("history")
		if (saved){ setHistory(JSON.parse(saved)) }
	}, [])

	useEffect(() => {
		localStorage.setItem("history", JSON.stringify(history))
	}, [history])

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

	const onSearch = query => {
		makeRequest(mailService.value, query)
		setCanSearch(false)
		setMailService(null)
		setSearchQuery("")
	}

	const openInNewTab = (service, query) => {
		const target_url = getService(service).template.replace("{}", query)
		window.open(target_url, "_blank")
	}

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

	const openFromHistory = item => {
		makeRequest(item.service, item.barcode)
	}

	const deleteElement = deleteItem => {
		if (confirm(`Delete «${deleteItem.barcode}»?`)){
			setHistory(prev => prev.filter(
				item => !(item.service === deleteItem.service && item.barcode === deleteItem.barcode)
			))
		}
	}
	const deleteAllHistory = _=>{
		if (confirm("Delete all history?")){ setHistory([]) }
	}

	const timerRef = useRef(null);
	const handleStart = item => {
		clearTimeout(timerRef.current)
		timerRef.current = setTimeout(() => {
			deleteElement(item)
		}, 500)
	}
	const handleEnd = _=>{
		clearTimeout(timerRef.current)
	}
	const handleRightClick = (event, item) => {
		event.preventDefault()
		clearTimeout(timerRef.current)
		deleteElement(item)
	}

	const [isDesktop, setIsDesktop] = useState(false)
	useEffect(() => {
		const checkScreen = () => setIsDesktop(window.innerWidth >= 768)
		checkScreen()
		window.addEventListener("resize", checkScreen)
		return () => window.removeEventListener("resize", checkScreen)
	}, [])
	const columns = isDesktop ? 4 : 2;
	const totalItems = Math.max(
		columns,
		Math.ceil(history.length / columns) * columns
	)
	const paddedHistory = [
		...history,
		...Array(totalItems - history.length).fill(null)
	]

	
	if (service && code){
		return (
			<Fragment>
				<Header home={goHome}/>
				<div className="p-2 flex flex-col gap-2">
					<Card className="flex justify-between items-center gap-2 !px-3">
						<div className="inline-flex gap-3 items-center max-w-full overflow-hidden">
							<img className="h-12 object-contain rounded-lg select-none"
								src={getService(service).img}
								draggable="false"
							/>
							<span className="font-bold truncate overflow-hidden whitespace-nowrap">{code}</span>
						</div>
						<div className="text-xs flex gap-2">
							<Card className="aspect-square flex cursor-pointer w-fit h-fit !p-3
								transition-all duration-200 active:bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.15)]
							" onClick={_=>navigator.clipboard.writeText(window.location.href)}>
								<i className="fa-solid fa-copy"></i>
							</Card>

							<Card className="aspect-square flex cursor-pointer w-fit h-fit !p-3
								transition-all duration-200 active:bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.15)]
							" onClick={_=>openInNewTab(service, code)}>
								<i className="fa-solid fa-up-right-from-square"></i>
							</Card>
						</div>
					</Card>
					<Card>
						{trackingData ? (
							<DeliveryTimeline events={trackingData}/>
						) : (
							<img src="img/loading.svg" className="h-16 m-auto"/>
						)}
					</Card>
				</div>
			</Fragment>
		)
	}

	return (
		<Fragment>
			<Header home={goHome}/>
			<div className="gap-2 flex flex-col p-2">
				<Search name="code" placeholder="Track number" allowed={canSearch} onSearch={onSearch}
					value={searchQuery} setValue={setSearchQuery}
				/>
				<Select name="service" data={services} placeholder="Select mail service" onChange={onSearchServiceChange}
					selected={mailService} setSelected={setMailService}
				/>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-2">
					{paddedHistory.map((item, key) => (
						item ? (
							<Card key={key} className="
								!p-2 gap-2 flex flex-col items-center justify-end cursor-pointer select-none
								active:bg-[rgba(255,255,255,0.15)] active:scale-[0.98] transition
								hover:bg-[rgba(255,255,255,0.15)]
							"
							  onClick={_=>openFromHistory(item)}
							  onContextMenu={event=>handleRightClick(event, item)}
							  onTouchStart={_=>handleStart(item)}
							  onTouchEnd={handleEnd}
							  onMouseDown={_=>handleStart(item)}
							  onMouseUp={handleEnd}
							  onMouseLeave={handleEnd}
							>
								<img className="h-24 object-contain rounded-lg"
									src={getService(item.service).img}
									draggable="false"
								/>
								<span className="font-bold">{item.barcode}</span>
							</Card>
						) : (
							<Card key={key} className="h-38"/>
						)
					))}
				</div>

				<Card className="text-center cursor-pointer select-none
					active:bg-[rgba(255,255,255,0.15)] active:scale-[0.98] transition
					hover:bg-[rgba(255,255,255,0.15)]"
					onClick={deleteAllHistory}
				>Delete history</Card>
			</div>
		</Fragment>
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
