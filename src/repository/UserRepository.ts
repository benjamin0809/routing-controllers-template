/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 11:41:34
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-09-02 17:48:49
 */
import {
  plainToClass,
  classToClass,
  serialize,
  deserialize,
} from "class-transformer";
import { Service } from "typedi";
import { UserModel, User } from "../mongo/type/User";
import * as Response from "../model/User";
import { DocumentType } from "@typegoose/typegoose";
import { BaseRepository } from "./BaseRepository";

@Service()
export class UserRepository extends BaseRepository<User> {
  constructor() {
    super();
  }
  async exist(filter = {}): Promise<boolean> {
    const res = await UserModel.exists(filter);
    return res;
  }

  async find(filter = {}, skip = 0, limit = 10) {
    const res = await UserModel.find(filter).skip(skip).limit(limit).exec();
    return this.transformMany(res);
  }

  async findAll() {
    const res = await UserModel.find().exec();
    return this.transformMany(res);
  }

  async findOne(id: string) {
    const res = await UserModel.findById(id).exec();
    return this.transformOne(res);
  }

  async save(user: User) {
    const res = await UserModel.create(user);
    return this.transformOne(res);
  }

  async remove(id: number) {
    return await UserModel.remove({ id: id });
  }
}
