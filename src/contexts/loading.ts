/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useContext } from "react"
import type { ErrorType, StateDispatch } from "../types/utils"

type LoadingState = {
  isLoading: boolean
  isError: ErrorType
}

type SetLoadingState = {
  setIsLoading: StateDispatch<boolean>
  setIsError: StateDispatch<ErrorType>
}

export const LoadingStateContext = React.createContext<LoadingState>({
  isLoading: true,
  isError: undefined,
})

export const SetLoadingStateContext = React.createContext<SetLoadingState>({
  setIsLoading: () => {},
  setIsError: () => {},
})

export const useLoadingStateContext = () => useContext(LoadingStateContext)
export const useSetLoadingStateContext = () =>
  useContext(SetLoadingStateContext)
