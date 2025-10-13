const Search = ({placeholder, allowed, onSearch}) => {
	const [query, setQuery] = React.useState("")
	const onChange = e=>{
		setQuery(e.target.value)
	}
	const onClick = _=>{
		if (allowed && query != ""){
			onSearch(query)
		}
	}
	return (
		<Card className="flex justify-between !p-2 z-2">
			<input className="outline-none border-0 w-full ps-2"
				type="text" name="track" placeholder={placeholder}
				value={query} onChange={onChange}
				onKeyDown={(e) => {
					if (e.keyCode == 13){
						onClick()
					}
				}}
			/>
			<Card className={`
				aspect-square flex align-center justify-center !p-2 select-none transition-all duration-200
				${(allowed && query != "") ? "opacity-100 cursor-pointer" : "opacity-70 cursor-not-allowed"}
			`} onClick={onClick}>
				<i className="fa-solid fa-magnifying-glass fa-rotate-90"></i>
			</Card>
		</Card>
	)
}
