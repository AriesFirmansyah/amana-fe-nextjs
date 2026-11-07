import { Inter, Work_Sans, Mulish, Roboto, Open_Sans, Public_Sans } from "next/font/google"

const WorkSansFont = Work_Sans({
	variable: "--font-work-sans",
	subsets: ["latin"],
})
const MulishFont = Mulish({
	variable: "--font-mulish",
	subsets: ["latin"],
})
const OpenSansFont = Open_Sans({
	variable: "--font-open-sans",
	subsets: ["latin"],
})
const InterFont = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
})
const PublicSansFont = Public_Sans({
	variable: "--font-public-sans",
	subsets: ["latin"],
})
const RobotoFont = Roboto({
	variable: "--font-roboto",
	weight: ["100", "300", "400", "500", "700", "900"],
	subsets: ["latin"],
})

export const Fonts = {
	className: [WorkSansFont.variable, MulishFont.variable, OpenSansFont.variable, InterFont.variable, PublicSansFont.variable, RobotoFont.variable].join(" "),
}
