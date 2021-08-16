/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 10:38:35
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-16 14:29:59
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
  } from "routing-controllers";
  import { Service } from "typedi";
  import { CategoryRepository } from "../repository/CategoryRepository";
  import { User } from "../mongo/type/User";
  import * as Response from "../model/User";
  import { TokenMiddleware } from "../middleware/TokenMiddleware";
  import { AbstractControllerTemplate } from "./BaseController";
  import { OpenAPI, ResponseSchema } from "routing-controllers-openapi"; 
import { UserRepository } from "../repository/UserRepository";
  
  
  @Service()
  @OpenAPI({
      security: [{ basicAuth: [] }],
    })
  @JsonController("/api/v1")
  // @UseBefore(TokenMiddleware)
  export class UserController {
    constructor(private userRepository: UserRepository) { 
    }
  
    @Authorized()
    @Get("/users")
    @ResponseSchema(Response.User, { contentType: 'application/json', isArray: true })
    @OpenAPI({ tags: ['user'    ], summary: 'Return a list of users' })
    async all() {
        const res = await this.userRepository.findAll()
        console.log('all','res',typeof res, res) 
        return res
    }
  
    @Authorized("get")
    @Get("/user/:id")
    @ResponseSchema(Response.User, { isArray: false })
    @OpenAPI({ summary: 'Return a user' })
    async one(@Param("id") id: string): Promise<User> {
      return await this.userRepository.findOne(id);
    }
  
    // @Post("/categories")
    // @ResponseSchema(Category, { isArray: true })
    // @OpenAPI({ summary: 'Return a list of users' })
    // category(@Body() category: Category): Category {
    //   return this.categoryRepository.save(category);
    // }
  
    // @Delete("/categories/:id")
    // @ResponseSchema(Category, { isArray: true })
    // @OpenAPI({ summary: 'Return a list of users' })
    // delete(@Param("id") id: number): Category {
    //   return this.categoryRepository.remove(id);
    // }
  }
  