const DeliveryTimeline = ({ events }) => {
	const { useState, useEffect } = React
	const sortedEvents = [...events].sort((a, b) => b.time - a.time)

	const formatDate = (unixTime) => {
		const date = new Date(unixTime * 1000)
		const day = String(date.getDate()).padStart(2, "0")
		const month = String(date.getMonth() + 1).padStart(2, "0")
		const hours = String(date.getHours()).padStart(2, "0")
		const minutes = String(date.getMinutes()).padStart(2, "0")
		return (
			<div className="flex gap-2 text-sm font-mono font-bold">
				<span className="text-gray-500">{day}.{month}</span>
				<span className="text-gray-400">{hours}:{minutes}</span>
			</div>
		)
	}

	const [visible, setVisible] = useState(false)
	useEffect(() => {
		const timer = setTimeout(_=>{
			setVisible(true)
		}, 100)
		return _=> clearTimeout(timer)
	}, [])

	return (
		<div className="flex flex-col">
			{sortedEvents.length > 0 ? sortedEvents.map((event, index) => (
				<div
					key={index}
					className={`flex flex-col border-l-2 border-gray-400 ps-4 pb-4 last:pb-0 relative
						transform origin-top transition-transform duration-500 ease-out
						${visible ? "scale-y-100" : "scale-y-0"}
					`}
					style={{ transitionDelay: `${index * 250}ms` }}
				>
					<div className={`absolute left-0 top-0 -translate-x-[calc(50%+1px)] w-[10px] h-[10px]
						rounded-full before:block ${index === 0 ? "bg-blue-400" : "bg-gray-400"}`}></div>
					<div className="-translate-y-[5px]">
						{formatDate(event.time)}
						<div className="font-medium">
							{event.text}
						</div>
					</div>
				</div>
			)) : (
				<div className="flex flex-col items-center gap-4">
					<img src="img/ghost.png" className="h-24 select-none" draggable="false"/>
					<span className="text-xl font-bold text-center">Information unavailable</span>
				</div>
			)}
		</div>
	)
}
