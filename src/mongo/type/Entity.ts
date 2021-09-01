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
class Entity  {
    @prop({ default: new Date()})
    createTime: Date;
    @prop()
    createUser: string;
  } 
export { 
    Entity
} 
