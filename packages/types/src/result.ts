export interface Success<TData> {
  success: true;
  data: TData;
}

export interface Failure<TError extends Error> {
  success: false;
  error: TError;
}

export type Result<TData, TError extends Error> =
  | Failure<TError>
  | Success<TData>;
