export const NotFoundError = (props: ErrorPageProps) => {
	return (
		<div className="flex flex-col items-center gap-3">
			<h1 className="text-[24px] lg:text-[40px] font-semibold">{props.title ?? "Not Found"}</h1>
			<div className="text-[16px] lg:text-[20px] lg:font-medium max-w-[310px] sm:max-w-[630px] text-center">
				{props.description ?? "Maaf, halaman yang Anda cari tidak dapat ditemukan. Mungkin halaman tersebut telah dipindahkan atau dihapus."}
			</div>
		</div>
	)
}
