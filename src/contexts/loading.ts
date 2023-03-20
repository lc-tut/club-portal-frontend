/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext } from "react"
import type { ErrorType, StateDispatch } from "../types/utils"

type LoadingState = {
  isLoading: boolean
  error: ErrorType
}

type SetLoadingState = {
  setIsLoading: StateDispatch<boolean>
  setError: StateDispatch<ErrorType>
}

export const LoadingStateContext = React.createContext<LoadingState>({
  isLoading: false,
  error: undefined,
})

export const SetLoadingStateContext = React.createContext<SetLoadingState>({
  setIsLoading: () => {},
  setError: () => {},
})

export const useLoadingStateContext = () => useContext(LoadingStateContext)
export const useSetLoadingStateContext = () =>
  useContext(SetLoadingStateContext)
