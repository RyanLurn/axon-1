export interface Ok<TData> {
  isOk: true;
  data: TData;
}

export interface Err<TError extends Error> {
  isOk: false;
  error: TError;
}

export type Result<TData, TError extends Error> = Err<TError> | Ok<TData>;
