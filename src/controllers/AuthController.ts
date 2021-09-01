/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-31 16:23:14
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-09-01 16:28:21
 */
import {
  JsonController,
  Post,
  Body,
  UseBefore,
  Req,
} from "routing-controllers";
import { Service } from "typedi";
import { RefreshTokenMiddleware } from "../middleware/TokenMiddleware";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { AuthError, ApiError } from "../errors/Error";
import { UserRepository } from "../repository/UserRepository";
import { Token } from "../common/token";
import { AuthErrorCode, RequestCode } from "../errors/ErrorCode";
import {
  LoginDto,
  LoginSuccessDto,
  ValidateTokenDto,
  ValidateTokenOutputDto,
} from "./dto/AuthDto";
import { RegisterUserDto } from "./dto/UserDto";

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

  @UseBefore(RefreshTokenMiddleware)
  @Post("/refreshToken")
  @ResponseSchema(ValidateTokenOutputDto, { isArray: false })
  @OpenAPI({ summary: "Refresh  accessToken by refreshToken!" })
  refreshToken(@Body() dto: ValidateTokenDto, @Req() request: any) {
    console.log(1);
    const r = new LoginSuccessDto();
    const token = request.headers.authorization.replace("Bearer ", "");
    const id = Token.validRefreshToken(token);
    r.accessToken = Token.generateUserToken(id);
    r.refreshToken = token;
    return r;
  }

  @Post("/register")
  @ResponseSchema(LoginSuccessDto, { isArray: false })
  @OpenAPI({ summary: "Register a new user" })
  async create(@Body() user: RegisterUserDto) {
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
    const res: any = await this.userRepository.save(user);
    const r = new LoginSuccessDto();
    r.accessToken = Token.generateUserToken(res._id);
    r.refreshToken = Token.generateAccessToken(res._id);
    return r;
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
        AuthErrorCode.Account_Not_Exist
      );
    }
  }
}
