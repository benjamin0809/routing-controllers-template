import {
  Allow,
  IsDateString,
  IsEmail,
  IsInt,
  IsString,
  MaxLength,
} from "class-validator";
import { User } from "../../mongo/type/User";
import { AuditedEntityDto } from "./CommonDto";

export class UserDto extends AuditedEntityDto {
  @IsString()
  name: string = "";
  @IsString()
  email: string = "";
  @IsString()
  gender: string = "";
  @IsString()
  account: string = "";
}

export class Condition {
  @IsString()
  name: string = "";
  @IsString()
  email: string = "";
  @IsString()
  gender: string = "";
  @IsString()
  account: string = "";
}

export class RegisterUserDto extends User {
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
