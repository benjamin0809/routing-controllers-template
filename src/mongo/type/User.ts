/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 10:42:13
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-16 15:06:02
 */
import { Expose } from 'class-transformer';
import { prop, getModelForClass  } from "@typegoose/typegoose";
class User  {
    @prop()
    name?: string;
    @prop()
    email: string;
    @prop()
    gender?: number;
    @prop()
    account: string;
    @prop()
    password?: string;
    @Expose()
    get fullName(): string {
      return this.email + this.name
    }
  }
const UserModel = getModelForClass(User);
export {
    UserModel,
    User
} 
