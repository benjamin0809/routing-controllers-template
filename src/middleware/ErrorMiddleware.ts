import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, request: any, response: any, next: (err?: any) => any) {
    // console.log('do something...',response);
    console.log(error);
    response.statusCode = 401
    next();
  }
}