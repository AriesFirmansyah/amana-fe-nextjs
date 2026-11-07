import type { TypedUseSelectorHook } from "react-redux"
import { useDispatch as useDispatchRedux, useSelector as useSelectorRedux } from "react-redux"

import { store } from "@/core/redux/store"

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useDispatch: () => AppDispatch = useDispatchRedux
export const useSelector: TypedUseSelectorHook<RootState> = useSelectorRedux
