export const InternalServerError = (props: ErrorPageProps) => {
	return (
		<div className="flex flex-col items-center gap-3">
			<h1 className="text-[24px] lg:text-[40px] font-semibold">{props.title ?? "Internal Server Error"}</h1>
			<div className="text-[16px] lg:text-[20px] lg:font-medium max-w-[310px] sm:max-w-[630px] text-center">
				{props.description ?? "Kami meminta maaf atas ketidaknyamanan ini. Server kami mengalami masalah internal. Harap kembali lagi nanti."}
			</div>
		</div>
	)
}
