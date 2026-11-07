"use client"

import { useEffect } from "react"

import config from "@/config/environment"

import { Error } from "@/core/components/layout/error"

const DefaultErrorLayout = (props: DefaultErrorLayoutProps) => {
	if (config.appEnv === "production") {
		return <Error />
	}

	return (
		<div className="grid">
			<h2>Something went wrong!</h2>
			{props.status && <p>Status Code: {props.status}</p>}

			<p>{props.error?.message}</p>
			<button onClick={props.setHasError}>Try again</button>
		</div>
	)
}

export default DefaultErrorLayout
