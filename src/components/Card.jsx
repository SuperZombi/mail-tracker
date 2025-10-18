const Card = ({children, className, ...props}) => {
	return (
		<div className={`p-4 rounded-lg
			backdrop-blur-lg bg-[rgba(65,65,65,0.308)]
			border border-[rgba(255,255,255,0.089)] ${className}`}
			{...props}
		>
			{children}
		</div>
	)
}
