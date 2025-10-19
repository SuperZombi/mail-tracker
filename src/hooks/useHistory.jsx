const useHistory = () => {
	const { useState, useEffect } = React;

	const [history, setHistory] = useState([])

	useEffect(() => {
		const saved = localStorage.getItem("history")
		if (saved){ setHistory(JSON.parse(saved)) }
	}, [])
	useEffect(() => {
		localStorage.setItem("history", JSON.stringify(history))
	}, [history])

	const saveToHistory = (service, code) => {
		setHistory(prev => {
			const filtered = prev.filter(
				h => !(h.service === service && h.barcode === code)
			)
			return [{ "service": service, "barcode": code }, ...filtered]
		})
	}
	return { history, saveToHistory, setHistory }
}
