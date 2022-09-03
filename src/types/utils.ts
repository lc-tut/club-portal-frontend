import type { AxiosError } from "axios"
import type { Dispatch, SetStateAction } from "react"

export type StateDispatch<T> = Dispatch<SetStateAction<T>>

export type ErrorType = AxiosError<unknown, unknown> | Error | undefined
