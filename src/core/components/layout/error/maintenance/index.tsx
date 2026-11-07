export const MaintenanceError = (props: ErrorPageProps) => {
	return (
		<div className="flex flex-col items-center gap-3">
			<h1 className="text-[24px] lg:text-[40px] font-semibold">{props.title ?? "Under Maintenance"}</h1>
			<div className="text-[16px] lg:text-[20px] lg:font-medium max-w-[310px] sm:max-w-[630px] text-center">
				{props.description ??
					"Kami sedang melakukan pemeliharaan rutin untuk meningkatkan kualitas layanan kami. Harap kembali lagi dalam beberapa saat."}
			</div>
		</div>
	)
}
