import { Allow, IsBoolean, IsString, MaxLength } from "class-validator";

export class ValidateTokenDto {
  @Allow()
  @IsString()
  accessToken: string = "";
  @Allow()
  @IsString()
  refreshToken: string = "";
}

export class ValidateTokenOutputDto {
  @IsBoolean()
  validateAccessToken: boolean = false;
  @IsBoolean()
  validateRefreshToken: boolean = false;
}

export class LoginSuccessDto extends ValidateTokenDto {
  @IsString()
  accessToken: string = "";
  @IsString()
  refreshToken: string = "";
}

export class LoginDto {
  @Allow()
  password?: string;
  @IsString()
  @MaxLength(20)
  account: string;
}
