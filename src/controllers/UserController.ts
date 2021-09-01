/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 10:38:35
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-26 22:51:51
 */
import { Type } from "class-transformer";
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
  UseBefore,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import { CategoryRepository } from "../repository/CategoryRepository";
import { User } from "../mongo/type/User";
import * as Response from "../model/User";
import { AccessTokenMiddleware } from "../middleware/TokenMiddleware";
import { AbstractControllerTemplate, BaseController } from "./BaseController";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { LoginError, AuthError, ApiError } from "../errors/Error";
import { UserRepository } from "../repository/UserRepository";
import { ResponseMiddleware } from "../middleware/ResponseMiddleware";
import { plainToClass } from "class-transformer";
import {
  Allow,
  IsDateString,
  IsEmail,
  IsEmpty,
  IsInt,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
} from "class-validator";
import { AuthErrorCode, RequestCode } from "../errors/ErrorCode";
import { Condition, UserDto } from "./dto/UserDto";
class UserResponse {
  @IsString()
  name: string;

  @IsString({ each: true })
  hobbies: string[];
}
class Res {
  @IsNumber()
  errCode: number;

  @IsString()
  msg: string;

  @IsObject()
  result: UserResponse[];
}

class LoginDto {
  @Allow()
  password?: string;
  @IsString()
  @MaxLength(20)
  account: string;
}

class CreateUserDto extends User {
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

class CreateUserResultDto extends User {
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
  security: [{ basicAuth: ["/api/v1/login"] }],
})
@UseBefore(AccessTokenMiddleware)
@JsonController("/api/v1/user")
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Authorized()
  @Get("/all")
  @ResponseSchema(UserDto, {
    contentType: "application/json",
    isArray: true,
  })
  @OpenAPI({ summary: "Return a list of users" })
  async all() {
    const res = await this.userRepository.findAll();
    return this.userRepository.ObjectArrayMapper<UserDto>(UserDto, res);
  }

  @Authorized()
  @Get("/find")
  @ResponseSchema(UserDto, { isArray: false })
  @OpenAPI({ summary: "Return user list by option" })
  async getUsers(
    @QueryParam("name") name: string,
    @QueryParam("account") account: string,
    @QueryParam("email") email: string,
    @QueryParam("gender") gender: number ,
    @QueryParam("skip") skip: number ,
    @QueryParam("limit") limit: number
  ) {
    console.log(gender)
    let cond = {
      name: new RegExp(name, "i"),
      account: new RegExp(account, "i"),
      email: new RegExp(email, "i"),
    };
    if(typeof gender === 'number') {
      cond = Object.assign(cond, { gender })
    }
    return await this.userRepository.find(cond,skip,limit);
  }

  @Authorized("get")
  @Get("/user/:id")
  @ResponseSchema(UserDto, { isArray: false })
  @OpenAPI({ summary: "Return a user" })
  one(@Param("id") id: string) {
    return this.userRepository.findOne(id);
  }
}
