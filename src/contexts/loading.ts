/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext } from "react"

import type { ErrorType, StateDispatch } from "../types/utils"

type LoadingState = {
  isLoadingOuter: boolean
  isLoadingInner: boolean
  error: ErrorType
}

type SetLoadingState = {
  setIsLoadingOuter: StateDispatch<boolean>
  setIsLoadingInner: StateDispatch<boolean>
  setError: StateDispatch<ErrorType>
}

export const LoadingStateContext = React.createContext<LoadingState>({
  isLoadingOuter: false,
  isLoadingInner: false,
  error: undefined,
})

export const SetLoadingStateContext = React.createContext<SetLoadingState>({
  setIsLoadingOuter: () => {},
  setIsLoadingInner: () => {},
  setError: () => {},
})

export function useLoadingStateContext() {
  return useContext(LoadingStateContext)
}
export function useSetLoadingStateContext() {
  return useContext(SetLoadingStateContext)
}
