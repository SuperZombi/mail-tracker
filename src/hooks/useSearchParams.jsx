const useSearchParams = () => {
	const { useState, useEffect } = React;

	const [searchParams, setParams] = useState(() => new URLSearchParams(window.location.search))

	useEffect(() => {
		const handler = () => setParams(new URLSearchParams(window.location.search))
		window.addEventListener("popstate", handler)
		return () => window.removeEventListener("popstate", handler)
	}, [])

	const updateSearchParams = (obj) => {
		const newParams = new URLSearchParams(window.location.search)
		Object.entries(obj).forEach(([k, v]) => newParams.set(k, v))
		const newUrl = `${window.location.pathname}?${newParams.toString()}`
		window.history.pushState({}, "", newUrl)
		setParams(newParams)
	}
	const resetSearchParams = () => {
		window.history.pushState({}, "", window.location.pathname);
		setParams(new URLSearchParams())
	}
	return { searchParams, updateSearchParams, resetSearchParams }
}
