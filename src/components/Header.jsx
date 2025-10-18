const Header = ({home}) => {
	return (
		<div className="p-4 pb-1">
			<a onClick={home} className="inline-flex items-center gap-2 select-none cursor-pointer">
				<img src="img/icon.png" className="h-8" draggable="false"/>
				<span className="text-xl uppercase font-bold
					bg-gradient-to-b from-blue-400 via-blue-500 to-blue-600 
					bg-clip-text text-transparent drop-shadow-lg
				">
					Mail tracker
				</span>
			</a>
		</div>
	)
}
