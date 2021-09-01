import { IsDateString, IsString } from "class-validator";

export class EntityDto {
  @IsString()
  _id: string = "";
}

export class AuditedEntityDto extends EntityDto {
  @IsDateString()
  createTime: string = "";
}
