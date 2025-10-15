const App = () => {
	const { useState, useEffect, useRef} = React;
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

	const getService = (value) => {
		return services.find(s => s.value === value);
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

	const onSearch = query => {
		makeRequest(mailService.value, query)
		setHistory((prev) => {
			const exists = prev.some(
				(item) => item.service === mailService.value && item.barcode === query
			)
			if (exists) return prev;
			return [{ "service": mailService.value, "barcode": query }, ...prev]
		})
		setMailService(null)
		setSearchQuery("")
	}

	const makeRequest = (service, query) => {
		const target_url = getService(service).template.replace("{}", query)
		window.open(target_url, "_blank")
	}

	const deleteElement = deleteItem => {
		if (confirm(`Delete ${deleteItem.barcode}?`)){
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
		timerRef.current = setTimeout(() => {
			deleteElement(item)
		}, 500)
	}
	const handleEnd = _=>{
		clearTimeout(timerRef.current)
	}
	const handleRightClick = (event, item) => {
		event.preventDefault()
		deleteElement(item)
	}

	return (
		<div className="gap-2 flex flex-col p-2">
			<Search placeholder="Track number" allowed={canSearch} onSearch={onSearch}
				value={searchQuery} setValue={setSearchQuery}
			/>
			<Select data={services} placeholder="Select mail service" onChange={onSearchServiceChange}
				selected={mailService} setSelected={setMailService}
			/>

			<div className="grid grid-cols-2 gap-2">
				{[...history, ...Array(Math.max(2 - history.length, (history.length % 2 === 0 ? 0 : 1))).fill(null)
				 ].map((item, key) => (
					item ? (
						<Card key={key} className="
							!p-2 gap-1 flex flex-col items-center justify-end cursor-pointer select-none
							active:bg-[rgba(255,255,255,0.15)] active:scale-[0.98] transition
							hover:bg-[rgba(255,255,255,0.15)]
						"
						  onClick={_=>makeRequest(item.service, item.barcode)}
						  onContextMenu={event=>handleRightClick(event, item)}
						  onTouchStart={_=>handleStart(item)}
						  onTouchEnd={handleEnd}
						  onMouseDown={_=>handleStart(item)}
						  onMouseUp={handleEnd}
						  onMouseLeave={handleEnd}
						>
							<img className="h-26 object-contain rounded-lg"
								src={getService(item.service).img}
							/>
							<span>{item.barcode}</span>
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
	)
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />)
