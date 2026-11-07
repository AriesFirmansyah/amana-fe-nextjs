"use client"

import { Component, ErrorInfo } from "react"

import { AppError } from "./app-error"
import config from "@/config/environment"
import { Error } from "@/core/components/layout/error"
import DefaultErrorLayout from "."

class ErrorBoundary extends Component<ErrorProps, ErrorState> {
	constructor(props: ErrorProps) {
		super(props)
		this.state = {
			hasError: false,
			error: undefined,
			status: undefined,
		}
	}

	static getDerivedStateFromError(error: Error): ErrorState {
		return {
			hasError: true,
			error: error,
		}
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error("error-boundary-info:", errorInfo)

		if (error instanceof AppError) {
			this.setState({ status: error.status })
		}
	}

	render() {
		if (this.state.hasError) {
			return <DefaultErrorLayout {...this.state} setHasError={() => this.setState({ hasError: false })} />
		}

		return this.props.children
	}
}

export default ErrorBoundary
