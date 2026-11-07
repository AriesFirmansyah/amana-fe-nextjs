import { cn } from "@/core/libraries/tailwind"
import "./index.css"

import React from "react"
import { DotProps } from "./types"

export const DotLoader = ({ className }: DotProps) => {
	return (
		<div className={cn("spinner-container", className)}>
			<div className="dot" />
		</div>
	)
}
