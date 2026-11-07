"use client"

import config from "@/config/environment"

export class AppError extends Error {
	readonly status?: number
	readonly stack?: string
	readonly isOperational?: boolean

	constructor(message: string, option?: AppErrorOption) {
		super(message)
		this.name = this.constructor.name

		const defaultState = {
			stack: "",
			status: 500,
			message: "Sorry, an unexpected error has occurred.",
			isOperational: true,
		}

		this.status = defaultState.status
		this.message = defaultState.message

		if (config.appEnv !== "production") {
			this.stack = option?.stack || defaultState.stack
			this.isOperational = defaultState.isOperational
		}

		if (message || (option && typeof option === "object")) {
			this.message = message || defaultState.message

			if (option && typeof option === "object") {
				this.status = option.status
				this.stack = option.stack || defaultState.stack
			}
		}
	}
}
