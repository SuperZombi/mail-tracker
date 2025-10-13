const App = () => {
	const services = [
		{"name": "An post", "value": "anpost", "img": "https://www.anpost.com/getapmedia/185a235d-2459-493c-b9aa-d800927e4674/An-Post-logo.jpg"},
		{"name": "Nova posta", "value": "novapost", "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz2w7BxtR4oDjLouwXrZ_nemt0R6PUZR8qcw&s"},
		{"name": "Ukr posta", "value": "ukrpost", "img": "https://media.acc.cv.ua/news/article/2017/07/14/8375/ukrposhta.w575.jpg"}
	]
	const [canSearch, setCanSearch] = React.useState(false)
	const [mailService, setMailService] = React.useState(null)

	const onSearchServiceChange = service=>{
		if (service){
			setCanSearch(true)
			setMailService(service.value)
		} else {
			setCanSearch(false)
			setMailService(null)
		}
	}

	const onSearch = query => {
		console.log(mailService, query)
	}

	return (
		<div className="gap-2 flex flex-col p-2">
			<Search placeholder="Track number" allowed={canSearch} onSearch={onSearch}/>
			<Select data={services} placeholder="Select mail service" onChange={onSearchServiceChange}/>

			<div className="grid grid-cols-2 gap-2">
				<Card className="h-32"/>
				<Card className="h-32"/>
				<Card className="h-32"/>
				<Card className="h-32"/>
			</div>
			

			<Card className="text-center">View history</Card>
		</div>
	)
}


ReactDOM.createRoot(document.getElementById("root")).render(<App />)
