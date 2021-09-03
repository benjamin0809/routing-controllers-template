/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-09-03 10:26:04
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-09-03 12:10:15
 */

import { IsString, MaxLength } from "class-validator";
import { Category } from "../../mongo/type/Category";

export class RegisterCategoryDto extends Category {
  @IsString()
  @MaxLength(20)
  name: string;
}

export class DeleteCategoryDto extends Category {
  @IsString() 
  ids: string;
}
