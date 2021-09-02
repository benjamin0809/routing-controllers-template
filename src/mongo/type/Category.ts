/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-09-02 17:42:52
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-09-02 17:46:50
 */
import { prop, getModelForClass  } from "@typegoose/typegoose";
import { Entity } from './Entity';
class Category extends Entity {
    @prop({required: true, unique: true})
    name: string;
    
  }
const CategoryModel = getModelForClass(Category);
export {
    CategoryModel,
    Category
} 