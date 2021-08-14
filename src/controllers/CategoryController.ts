/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 11:14:18
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-14 15:56:12
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
import { TokenMiddleware } from "../middleware/TokenMiddleware";
import { AbstractControllerTemplate } from "./BaseController";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi"; 


@Service()
@OpenAPI({
    security: [{ basicAuth: [] }],
  })
@JsonController("/api/v1")
// @UseBefore(TokenMiddleware)
export class CategoryController {
  constructor(private categoryRepository: CategoryRepository) { 
  }

  @Authorized()
  @Get("/categories")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  all(): Promise<Category[]> {
    return this.categoryRepository.findAll();
  }

  @Authorized("get")
  @Get("/categories/:id")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  one(@Param("id") id: number): Category {
    return this.categoryRepository.findOne(id);
  }

  @Post("/categories")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  category(@Body() category: Category): Category {
    return this.categoryRepository.save(category);
  }

  @Delete("/categories/:id")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  delete(@Param("id") id: number): Category {
    return this.categoryRepository.remove(id);
  }
}
