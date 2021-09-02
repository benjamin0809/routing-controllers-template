/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 11:14:18
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-09-02 18:12:13
 */
import {
  JsonController,
  Get,
  Post,
  Param,
  Delete,
  Body,
  UseBefore,
  Authorized,
  getMetadataArgsStorage,
} from "routing-controllers";
import { Service } from "typedi";
import { CategoryRepository } from "../repository/CategoryRepository";
import { Category } from "../model/Category";
import { AbstractControllerTemplate } from "./BaseController";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi"; 


@Service()
@OpenAPI({
    security: [{ basicAuth: [] }],
  })
@JsonController("/api/v1/category")
// @UseBefore(TokenMiddleware)
export class CategoryController {
  constructor(private categoryRepository: CategoryRepository) { 
  }

  @Authorized()
  @Get("/all")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  all() {
    return this.categoryRepository.findAll();
  }

  @Authorized()
  @Get("/all")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  find() {
    return this.categoryRepository.find();
  }


  @Authorized("get")
  @Get("/categories/:id")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  one(@Param("id") id: string) {
    return this.categoryRepository.findOne(id);
  }

  @Post("/categories")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  category(@Body() category: Category) {
    return this.categoryRepository.save(category);
  }

  @Delete("/categories/:id")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  delete(@Param("id") id: number) {
    return this.categoryRepository.remove(id);
  }
}
