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
			<CardButton className="aspect-square flex w-fit h-fit !p-2"
				disabled={!(allowed && value != "")}
				onClick={onClick}
			>
				<i className="fa-solid fa-magnifying-glass fa-rotate-90"/>
			</CardButton>
		</Card>
	)
}
