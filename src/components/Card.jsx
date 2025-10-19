const Card = ({children, className, ...props}) => {
	return (
		<div className={`p-4 rounded-lg
			backdrop-blur-lg bg-[rgba(65,65,65,0.3)]
			border border-[rgba(255,255,255,0.1)] ${className}`}
			{...props}
		>
			{children}
		</div>
	)
}
const CardButton = ({children, className, disabled, ...props}) => {
	return (
		<Card className={`transition select-none ${className}
			${disabled ? "cursor-not-allowed" : "cursor-pointer bg-[rgba(65,65,110,0.3)] active:bg-[rgba(160,160,255,0.15)] hover:bg-[rgba(160,160,255,0.15)]"}
		`} {...props}>
			{children}
		</Card>
	)
}
