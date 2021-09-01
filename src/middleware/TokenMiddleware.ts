/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 14:04:32
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-14 14:11:03
 */
import { ExpressMiddlewareInterface } from "routing-controllers";
import { Token } from "../common/token";
import { AuthError } from "../errors/Error";
import { AuthErrorCode } from "../errors/ErrorCode";
export class RefreshTokenMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next?: (err?: any) => any): any {
    if (request.headers.authorization) {
      const t = request.headers.authorization.replace("Bearer ", "");
      console.log("token:", t);
      if (Token.validRefreshToken(t)) {
        next();
        return;
      }
    }
    throw new AuthError(
      "RefreshToken is invalid",
      AuthErrorCode.Refresh_Token_Invalid
    );
  }
}

export class AccessTokenMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next?: (err?: any) => any): any {
    if (request.headers.authorization) {
      const t = request.headers.authorization.replace("Bearer ", "");
      console.log("token:", t);
      if (Token.validToken(t)) {
        next();
        return;
      }
    }
    throw new AuthError(
      "AccessToken is invalid",
      AuthErrorCode.Access_Token_Invalid
    );
  }
}