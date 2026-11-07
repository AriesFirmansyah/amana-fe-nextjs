import { DotProps } from "./dot/types"

type SpinnerSubComponents = {
	Dot?: DotProps
}

export type LoaderProps = {
	className?: string
} & SpinnerSubComponents
