import { cn } from "@/core/libraries/tailwind"
import { DotLoader } from "./dot"
import { LoaderProps } from "./types"

export const Loader = ({ className }: LoaderProps) => {
	return (
		<div className="flex items-center justify-center flex-1 ">
			<div>
				<div
					className={cn("w-[75px] h-[75px] border-[12px] border-t-transparent border-black/50 border-solid rounded-full animate-spin", className)}
				></div>
			</div>
		</div>
	)
}

Loader.Dot = DotLoader
