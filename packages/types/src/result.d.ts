import type { CustomError } from "./custom-error";

export interface Ok<TData> {
  isOk: true;
  data: TData;
}

export interface Err<TError extends CustomError> {
  isOk: false;
  error: TError;
}

export type Result<TData, TError extends CustomError> = Err<TError> | Ok<TData>;
