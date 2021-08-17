/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 16:14:22
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-16 17:23:46
 */  
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers';

@Middleware({ type: 'after' })
export class ResponseMiddleware implements ExpressMiddlewareInterface {
  use(request: any, response: any, next: (err?: any) => any): void {
    // console.log('do something...',response);

    //response.text = JSON.parse(JSON.stringify(response.text)) 
  }
} 