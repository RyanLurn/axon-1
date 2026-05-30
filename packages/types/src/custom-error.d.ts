export interface CustomError<TCode extends string, TCause = null> {
  code: TCode;
  message: {
    ui: string;
    log: string;
  };
  cause: TCause;
}
