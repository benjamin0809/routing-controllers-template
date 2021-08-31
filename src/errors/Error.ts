import { HttpError } from "routing-controllers";
import { AuthErrorCode, RequestCode } from "./ErrorCode";

export class LoginError extends Error {
  private errCode = 0;
  constructor(message: string, errCode: number) {
    super(message);
    this.errCode = errCode;
  }
}

export class UserNotFoundError extends HttpError {
  constructor(name = "User not found!", statusCode = 500) {
    super(statusCode, name);
  }
}

export class AuthError extends HttpError {
  private errCode: AuthErrorCode = 0
  constructor(name = "User not found!", errCode: AuthErrorCode = 0) {
    super(401, name);
    this.errCode = errCode
  }
}

export class ApiError extends HttpError {
  private errCode: RequestCode = 0
  constructor(name = "User not found!", errCode: RequestCode = 0) {
    super(200, name);
    this.errCode = errCode
  }
}
