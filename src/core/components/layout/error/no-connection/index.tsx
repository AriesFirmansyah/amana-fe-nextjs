export const NoConnectionError = (props: ErrorPageProps) => {
	return (
		<div className="flex flex-col items-center gap-3">
			<h1 className="text-[24px] lg:text-[40px] font-semibold">{props.title ?? "No Internet Connection"}</h1>
			<div className="text-[16px] lg:text-[20px] lg:font-medium max-w-[310px] sm:max-w-[630px] text-center">
				{props.description ?? "Maaf, sepertinya koneksi internet anda terputus. Silakan periksa kabel atau sambungan nirkabel Anda dan coba lagi."}
			</div>
		</div>
	)
}
