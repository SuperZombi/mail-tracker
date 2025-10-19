const services = [
	{
		"name": "An post", "value": "anpost",
		"img": "https://www.anpost.com/getapmedia/185a235d-2459-493c-b9aa-d800927e4674/An-Post-logo.jpg",
		"template": "https://www.anpost.com/Post-Parcels/Track/History?item={}"
	},
	{
		"name": "Nova posta", "value": "novapost",
		"img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz2w7BxtR4oDjLouwXrZ_nemt0R6PUZR8qcw&s",
		"template": "https://novaposhta.ua/en/tracking/{}"
	},
	{
		"name": "Ukr posta", "value": "ukrpost",
		"img": "https://media.acc.cv.ua/news/article/2017/07/14/8375/ukrposhta.w575.jpg",
		"template": "https://track.ukrposhta.ua/tracking_UA.html?barcode={}"
	},
	{
		"name": "Meest", "value": "meest",
		"img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMJwE-Lw2TOHF0oDkWuh-1q9Xasbd_sx-0nISz3Es_RmBXfU8VDTbhosK9dg_0d2qcFuQ&usqp=CAU",
		"template": "https://ua.meest.com/parcel-track?parcel_number={}"
	}
]
const getService = (value) => {
	return services.find(s => s.value === value);
}
const openInNewTab = (service, query) => {
	const target_url = getService(service)?.template.replace("{}", query)
	window.open(target_url, "_blank")
}
