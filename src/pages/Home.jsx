const HomePage = ({ history, setHistory, makeRequest }) => {
	const { useState, Fragment } = React;

	const [searchQuery, setSearchQuery] = useState("")
	const [canSearch, setCanSearch] = useState(false)
	const [mailService, setMailService] = useState(null)

	const onSearch = query => {
		makeRequest(mailService.value, query)
		setCanSearch(false)
		setMailService(null)
		setSearchQuery("")
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
	const openFromHistory = item => {
		makeRequest(item.service, item.barcode)
	}

	return (
		<Fragment>
			<div className="gap-2 flex flex-col p-2">
				<Search name="code" placeholder="Track number" allowed={canSearch} onSearch={onSearch}
					value={searchQuery} setValue={setSearchQuery}
				/>
				<Select name="service" data={services} placeholder="Select mail service" onChange={onSearchServiceChange}
					selected={mailService} setSelected={setMailService}
				/>

				<History history={history} setHistory={setHistory} openFromHistory={openFromHistory}/>
			</div>
		</Fragment>
	)
}

const History = ({ history, setHistory, openFromHistory }) => {
	const { useState, useEffect, useRef, Fragment } = React;

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
	return (
		<Fragment>
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
		</Fragment>
	)
}
