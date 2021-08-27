/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 10:38:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-26 22:51:51
 */
import { Type } from 'class-transformer'
import {
  JsonController,
  Get,
  Post,
  Param,
  Delete,
  Body,
  UseAfter,
  Authorized,
  ContentType,
} from "routing-controllers";
import { Service } from "typedi";
import { CategoryRepository } from "../repository/CategoryRepository";
import { User } from "../mongo/type/User";
import * as Response from "../model/User";
import { TokenMiddleware } from "../middleware/TokenMiddleware";
import { AbstractControllerTemplate, BaseController } from "./BaseController";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { UserRepository } from "../repository/UserRepository";
import { ResponseMiddleware } from "../middleware/ResponseMiddleware";
import { plainToClass } from "class-transformer";
import { Allow, IsEmail, IsEmpty, IsInt, IsNumber, IsObject, IsString, MaxLength } from "class-validator";
class UserResponse {
  @IsString()
  name: string

  @IsString({ each: true })
  hobbies: string[]
}
class Res {
  @IsNumber()
  errCode: number

  @IsString()
  msg: string

  @IsObject()
  result: UserResponse[]
}

class LoginDto { 
  @Allow()
  password?: string; 
  @IsString()
  @MaxLength(20)
  account: string; 
}

class LoginOutputDto {   
  @IsString() 
  _id: string = '';
  @IsString() 
  name: string = ''; 
  @Allow() 
  @IsString()
  email: string= ''; 
  @Allow() 
  @IsString()
  gender: string= '';  
  @IsString() 
  account: string= ''; 
}

class CreateUserDto extends User{
  @IsString()
  @MaxLength(20)
  name: string;
  @Allow() 
  @IsEmail()
  email: string;
  @IsInt()
  @Allow() 
  gender: number;
  @IsString()
  account: string; 
  @Allow() 
  password?: string;
}

class CreateUserResultDto extends User{
  @IsString()
  @MaxLength(20)
  name: string;
  @Allow() 
  @IsEmail()
  email: string;
  @IsInt()
  @Allow() 
  gender: number;
  @IsString()
  account: string; 
  @Allow() 
  @IsString() 
  password: string;
}

@Service()
@OpenAPI({
  security: [{ basicAuth: ['/api/v1/login'] }],
})
@JsonController("/api/v1")
export class UserController {
  constructor(private userRepository: UserRepository) {
  }
  ObjectMapper<T>(c: { new(): T; },source: any) { 
    const t = new c()
    console.log(t)
    console.log(Object.keys(t))
    Object.keys(t).map(i =>{
      (t as any)[i] = source[i]
    })
    return t
  }

  @Authorized()
  @Get("/users")
  @ResponseSchema(Res, {
    contentType: "application/json",
    isArray: true,
  }) 
  @OpenAPI({  summary: "Return a list of users" })
  async all() {
    const res = await this.userRepository.findAll(); 
    const user = plainToClass(Response.User, res)
    console.log(res, user) 
    return { res, user};
  }

  @Authorized()
  @Get("/getUsers")
  @ResponseSchema(UserResponse, { isArray: false })
  @OpenAPI({ summary: "Return a users" })
  async getUsers() {
    return await this.userRepository.find({});
  }


  @Authorized("get")
  @Get("/user/:id")
  @ResponseSchema(Response.User, { isArray: false })
  @OpenAPI({ summary: "Return a user" })
  one(@Param("id") id: string) {
    return this.userRepository.findOne(id);
  }

  @Post("/user")
  @ResponseSchema(LoginOutputDto, { isArray: false })
  @OpenAPI({ summary: 'Create a new user' })
  async create(@Body() user: CreateUserDto) { 
    const is_exist_account = await this.userRepository.exist({ account: user.account});
    if(is_exist_account) {
      throw new Error('User is exist!')
    }

    const is_exist_email = await this.userRepository.exist({ email: user.email}) 
    if(is_exist_email) {
      throw new Error('Email is exist!')
    }

    if(!user.password) {
      user.password = '123456'
    }

    const res = await this.userRepository.save(user);
    console.log(res)
    return this.ObjectMapper<LoginOutputDto>(LoginOutputDto, res)
  }

  @Post("/login")
  @ResponseSchema(LoginOutputDto, { isArray: false })
  @OpenAPI({ summary: 'Login' })
  async login(@Body() dto: LoginDto) {
    const res = await this.userRepository.find({ account: dto.account});
    if(res.length > 0) {
      let user: any = res[0]
      if(user.password === dto.password) { 
        return this.ObjectMapper<LoginOutputDto>(LoginOutputDto, user)
      }else {
        throw new Error('Password is incorrect!')
      }
    } else {
      throw new Error('Account is not exist!')
    }
    
  } 
}