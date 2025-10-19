const TrackPage = ({service, barcode, trackingData}) => {
	const { Fragment } = React;
	return (
		<Fragment>
			<div className="p-2 flex flex-col gap-2">
				<Card className="flex justify-between items-center gap-2 !px-3">
					<div className="inline-flex gap-3 items-center max-w-full overflow-hidden">
						<img className="h-12 object-contain rounded-lg select-none"
							src={getService(service).img}
							draggable="false"
						/>
						<span className="font-bold truncate overflow-hidden whitespace-nowrap">{barcode}</span>
					</div>
					<div className="text-xs flex gap-2">
						<CardButton className="aspect-square flex w-fit h-fit !p-3"
							onClick={_=>navigator.clipboard.writeText(window.location.href)}>
							<i className="fa-solid fa-copy"/>
						</CardButton>
						<CardButton className="aspect-square flex w-fit h-fit !p-3"
							onClick={_=>openInNewTab(service, barcode)}>
							<i className="fa-solid fa-up-right-from-square"/>
						</CardButton>
					</div>
				</Card>
				<Card>
					{trackingData ? (
						<DeliveryTimeline events={trackingData}/>
					) : (
						<img src="img/loading.svg" className="h-16 m-auto"/>
					)}
				</Card>
			</div>
		</Fragment>
	)
}
