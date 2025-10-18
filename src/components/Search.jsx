const Search = ({placeholder, name, allowed, onSearch, value, setValue}) => {
	const onChange = e=>{
		setValue(e.target.value)
	}
	const onClick = _=>{
		if (allowed && value != ""){
			onSearch(value)
		}
	}
	return (
		<Card className="flex justify-between !p-2 z-2">
			<input className="outline-none border-0 w-full ps-2"
				type="text" name={name} placeholder={placeholder}
				value={value} onChange={onChange}
				onKeyDown={(e) => {
					if (e.keyCode == 13){
						onClick()
					}
				}}
			/>
			<Card className={`
				aspect-square flex align-center justify-center !p-2 select-none transition-all duration-200
				${(allowed && value != "") ? (
					"opacity-100 cursor-pointer active:bg-[rgba(255,255,255,0.15)] hover:bg-[rgba(255,255,255,0.15)]"
				) : "opacity-70 cursor-not-allowed"}
			`} onClick={onClick}>
				<i className="fa-solid fa-magnifying-glass fa-rotate-90"></i>
			</Card>
		</Card>
	)
}
