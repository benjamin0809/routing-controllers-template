/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 18:03:39
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-09-03 14:16:47
 */
/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 11:14:18
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-09-03 11:08:02
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
import { DeleteCategoryDto, RegisterCategoryDto } from "./dto/categoryDto";
import { ApiError } from "../errors/Error";
import { CategoryErrorCode, RequestCode } from "../errors/ErrorCode";


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
  @Get("/find")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  find() {
    return this.categoryRepository.find();
  }


  @Authorized("get")
  @Get("/one/:id")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  one(@Param("id") id: string) {
    return this.categoryRepository.findOne(id);
  }

  @Post("/save")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Return a list of users' })
  async category(@Body() category: RegisterCategoryDto) {
    if(await this.categoryRepository.exist({name: category.name})) {
      throw new ApiError("Category name is existed!", RequestCode.Category_Name_Already_Exist);
    }
    return this.categoryRepository.save(category);
  }

  @Delete("/one/:id")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'Delete One' })
  deleteOne(@Param("id") id: string) {
    return this.categoryRepository.deleteOne(id);
  }

  @Delete("/many")
  @ResponseSchema(Category, { isArray: true })
  @OpenAPI({ summary: 'DeleteMany Categories' })
  deleteMany(@Body() dto: DeleteCategoryDto) {
    const ids = dto.ids.split(',')
    return this.categoryRepository.deleteMany(ids);
  }
}
