/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 11:41:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-26 21:16:19
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
    // here, for example you can load categories using mongoose
    // you can also return a promise here
    // simulate async with creating an empty promise
    const res = await UserModel.exists(filter);
    return res;
  }

  async find(filter = {}, skip = 0, limit = 10) {
    // here, for example you can load categories using mongoose
    // you can also return a promise here
    // simulate async with creating an empty promise
    const res = await UserModel.find(filter).skip(skip).limit(limit).exec();
    return this.transformMany(res);
  }

  async findAll() {
    // here, for example you can load categories using mongoose
    // you can also return a promise here
    // simulate async with creating an empty promise
    const res = await UserModel.find().exec();
    return this.transformMany(res);
  }

  async findOne(id: string) {
    // here, for example you can load category id using mongoose
    // you can also return a promise here
    const res = await UserModel.findById(id).exec();
    return this.transformOne(res);
  }

  async save(user: User) {
    // here, for example you can save a category to mongodb using mongoose
    const res = await UserModel.create(user);
    return this.transformOne(res);
  }

  async remove(id: number) {
    // here, for example you can save a category to mongodb using mongoose
    return await UserModel.remove({ id: id });
  }
}
