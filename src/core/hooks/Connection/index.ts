"use client"

import { useState } from "react"
import { useEventListener } from "usehooks-ts"

const useConnection = () => {
	const [isOnline, setIsOnline] = useState(true)

	function changeStatus() {
		setIsOnline(navigator.onLine)
	}

	useEventListener("online", changeStatus)
	useEventListener("offline", changeStatus)

	return isOnline
}

export default useConnection
