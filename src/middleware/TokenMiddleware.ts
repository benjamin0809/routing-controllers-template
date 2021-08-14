/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 14:04:32
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-14 14:11:03
 */
import { ExpressMiddlewareInterface } from 'routing-controllers';

export class TokenMiddleware implements ExpressMiddlewareInterface {
  // interface implementation is optional

  use(request: any, response: any, next?: (err?: any) => any): any { 
    if(request.headers.Authorization) {
        console.log('do something...');
        next();
    } else {
        response.json({
            errCode: 401,
            msg: 'UnAuthorization'
        })
    } 
   
  }
}