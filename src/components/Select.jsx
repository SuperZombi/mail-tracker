const Select = ({data, placeholder, onChange}) => {
	const [focused, setFocused] = React.useState(false)
	const [query, setQuery] = React.useState("")
	const [selected, setSelected] = React.useState(null)

	const onFocus = _=>{ setFocused(true) }
	const onBlur = _=>{
		setTimeout(_=>{
			setFocused(false)
		}, 50)
	}
	const onSelect = val=>{
		setSelected(val)
		setFocused(false)
		onChange(val)
	}
	const changeSelect = _=>{
		setSelected(null)
		setFocused(true)
		onChange(null)
	}
	return (
		<div className="w-full relative">
			<Card className="relative overflow-hidden z-2">
				{selected ? (
					<div className="flex justify-between cursor-pointer select-none" onClick={changeSelect}>
						<img src={selected.img} className="h-6 rounded-sm"/><span>{selected.name}</span>
					</div>
				) : (
					<React.Fragment>
						<input type="text" onFocus={onFocus} onBlur={onBlur}
							value={query} onChange={e => setQuery(e.target.value)}
							name="service" placeholder={placeholder}
							className="outline-none border-0 w-9/10"
						/>
						<i className={`fa-solid fa-chevron-down transition-all duration-200
									h-full !flex items-center 
									absolute top-0 bottom-0 right-3
							${focused ? "rotate-90" : ""}
						`} onClick={_=>setFocused(prev=>!prev)}></i>
					</React.Fragment>
				)}
			</Card>
			
			<div className={`flex flex-col gap-2 absolute top-full w-full mt-2
				transition-all duration-400 z-1
				${focused ? "opacity-100" : "opacity-0 -translate-y-full invisible"}
			`}>
				{data.filter(s =>
					s.name.toLowerCase().includes(query.toLowerCase())
				).map((item, index) => (
					<Card key={index} className="flex justify-between cursor-pointer select-none" onClick={_=>onSelect(item)}>
						<img src={item.img} className="h-6 rounded-sm"/><span>{item.name}</span>
					</Card>
				))}
			</div>
		</div>
	)
}
