type ErrorProps = {
	children: React.ReactNode
}

type DefaultErrorLayoutProps = ErrorState & {
	setHasError: () => void
}
type ErrorState = {
	hasError: boolean
	error?: Error
	status?: number
}

type AppErrorOption = {
	stack?: string
	status: number
}
