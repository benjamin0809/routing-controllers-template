/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 10:42:13
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-26 20:45:56
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
  }
const UserModel = getModelForClass(User);
export {
    UserModel,
    User
} 
