import { Metadata } from "next"
import { ReactNode } from "react"

export const metadata: Metadata = {
	title: "404 Not Found",
	robots: { index: false, follow: false },
}

export default function NotFoundLayout({ children }: { children: ReactNode }) {
	return children
}
