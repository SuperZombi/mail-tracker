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
