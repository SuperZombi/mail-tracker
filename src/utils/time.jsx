const formatDate = (unixTime) => {
	const date = new Date(unixTime * 1000)
	const day = String(date.getDate()).padStart(2, "0")
	const month = String(date.getMonth() + 1).padStart(2, "0")
	const year = String(date.getFullYear()).slice(-2)
	const hours = String(date.getHours()).padStart(2, "0")
	const minutes = String(date.getMinutes()).padStart(2, "0")

	return (
		<div className="flex gap-2.5 text-sm font-mono font-bold">
			<time className="text-gray-400">{day}.{month}.{year}</time>
			<time className="text-gray-500">{hours}:{minutes}</time>
		</div>
	)
}
