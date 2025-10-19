const App = () => {
	const { useState, useEffect, Fragment } = React;

	const { history, saveToHistory, setHistory } = useHistory()
	const { searchParams, updateSearchParams, resetSearchParams } = useSearchParams()

	const [service, code] = [searchParams.get("service"), searchParams.get("code")]
	const [trackingData, setTrackingData] = useState(null)

	const makeRequest = (service, query) => {
		updateSearchParams({"service": service, "code": query})
		saveToHistory(service, query)
	}
	const goHome = () => { resetSearchParams() }

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
