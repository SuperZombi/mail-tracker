const Card = ({children, className, onClick}) => {
	return (
		<div className={`p-4 rounded-lg
			backdrop-blur-[30px] bg-[rgba(65,65,65,0.308)]
			border border-[rgba(255,255,255,0.089)] ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	)
}
