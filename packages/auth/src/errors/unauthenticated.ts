import { BaseError } from "@repo/errors/base";

export class UnauthenticatedError extends BaseError<
  "UNAUTHENTICATED_ERROR",
  null
> {
  method: Request["method"];
  url: Request["url"];

  constructor(request: Request) {
    super({
      name: "UnauthenticatedError",
      message: `An unauthenticated request made to "[${request.method}] ${request.url}".`,
      code: "UNAUTHENTICATED_ERROR",
      cause: null,
    });
    this.method = request.method;
    this.url = request.url;
  }
}
