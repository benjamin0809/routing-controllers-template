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
  HeaderParam,
  ResponseClassTransformOptions,
  UseBefore,
  Req,
} from "routing-controllers";
import { Service } from "typedi";
import { CategoryRepository } from "../repository/CategoryRepository";
import { User } from "../mongo/type/User";
import * as Response from "../model/User";
import { TokenMiddleware } from "../middleware/TokenMiddleware";
import { AbstractControllerTemplate, BaseController } from "./BaseController";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { LoginError, AuthError, ApiError } from "../errors/Error";
import { UserRepository } from "../repository/UserRepository";
import { ResponseMiddleware } from "../middleware/ResponseMiddleware";
import { plainToClass } from "class-transformer";
import { Token } from "../common/token";
import {
  Allow,
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsInt,
  IsNumber,
  IsObject,
  IsString,
  MaxLength,
} from "class-validator";
import { AuthErrorCode, RequestCode } from "../errors/ErrorCode";
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

class LoginOutputDto {
  @IsString()
  _id: string = "";
  @IsString()
  name: string = "";
  @Allow()
  @IsString()
  email: string = "";
  @Allow()
  @IsString()
  gender: string = "";
  @IsString()
  account: string = "";
}
class ValidateTokenDto {
  @Allow()
  @IsString()
  accessToken: string = "";
  @Allow()
  @IsString()
  refreshToken: string = "";
}
class LoginSuccessDto extends ValidateTokenDto {
  @Allow()
  @IsString()
  accessToken: string = "";
  @Allow()
  @IsString()
  refreshToken: string = "";
}

class ValidateTokenOutputDto {
  @IsBoolean()
  validateAccessToken: boolean = false;
  @IsBoolean()
  validateRefreshToken: boolean = false;
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
@JsonController("/api/v1/auth") 
export class AuthController {
  constructor(private userRepository: UserRepository) {}

  @Post("/validate")
  @ResponseSchema(ValidateTokenOutputDto, { isArray: false })
  @OpenAPI({ summary: "validate access Token" })
  validate(@Body() dto: ValidateTokenDto) {
    const res = new ValidateTokenOutputDto();
    res.validateAccessToken = !!Token.validToken(dto.accessToken);
    res.validateRefreshToken = !!Token.validRefreshToken(dto.refreshToken);
    return res;
  }

  @UseBefore(TokenMiddleware)
  @Post("/refreshToken")
  @ResponseSchema(ValidateTokenOutputDto, { isArray: false })
  @OpenAPI({ summary: "Refresh  accessToken by refreshToken!" })
  refreshToken(
    @Body() dto: ValidateTokenDto, @Req() request: any
  ) { 
      console.log(1)
      const r = new LoginSuccessDto();
      const token = request.headers.authorization.replace('Bearer ','')
      const id = Token.validRefreshToken(token);
    r.accessToken = Token.generateUserToken(id);
    r.refreshToken = token
    return r; 
  }

  @Post("/register")
  @ResponseSchema(LoginOutputDto, { isArray: false })
  @OpenAPI({ summary: "Register a new user" })
  async create(@Body() user: CreateUserDto) {
    const is_exist_account = await this.userRepository.exist({
      account: user.account,
    });
    if (is_exist_account) {
      throw new ApiError("User is exist!", RequestCode.Account_Already_Exist);
    }
    const is_exist_email = await this.userRepository.exist({
      email: user.email,
    });
    if (is_exist_email) {
      throw new ApiError("Email is exist!", RequestCode.Email_Already_Exist);
    }
    if (!user.password) {
      user.password = "123456";
    }
    const res = await this.userRepository.save(user);
    console.log(res);
    return this.userRepository.ObjectMapper<LoginOutputDto>(
      LoginOutputDto,
      res
    );
  }

  @Post("/login")
  @ResponseSchema(LoginSuccessDto, { isArray: false })
  @OpenAPI({ summary: "Login" })
  async login(@Body() dto: LoginDto) {
    const res = await this.userRepository.find({ account: dto.account });
    if (res.length > 0) {
      let user: any = res[0];
      if (user.password === dto.password) {
        const r = new LoginSuccessDto();
        r.accessToken = Token.generateUserToken(user._id);
        r.refreshToken = Token.generateAccessToken(user._id);
        return r;
      } else {
        throw new AuthError(
          "Password is incorrect!",
          AuthErrorCode.Password_Not_Exist
        );
      }
    } else {
      throw new AuthError(
        "Account is not exist!",
        AuthErrorCode.Password_Not_Exist
      );
    }
  }
}
