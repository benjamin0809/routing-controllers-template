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
import { Entity } from './Entity';
class User extends Entity {
    @prop()
    name?: string;
    @prop({required: true, unique: true})
    email: string;
    @prop()
    gender?: number;
    @prop({required: true, unique: true})
    account: string;
    @prop({ default: '123456' })
    password?: string;
    
  }
const UserModel = getModelForClass(User);
export {
    UserModel,
    User
} 
