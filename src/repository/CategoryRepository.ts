/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 11:14:18
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-09-03 12:03:39
 */
import { Service } from "typedi"; 
import { CategoryModel, Category } from "../mongo/type/Category";
import { BaseRepository } from "./BaseRepository";

@Service()
export class CategoryRepository extends BaseRepository<Category>{ 

  async exist(filter = {}): Promise<boolean> {
    const res = await CategoryModel.exists(filter);
    return res;
  }

  async find(filter = {}, skip = 0, limit = 10) { 
    const res = await CategoryModel.find(filter).skip(skip).limit(limit).exec();
    return this.transformMany(res);
  }

  async findAll() {
    const res = await CategoryModel.find().exec();
    return this.transformMany(res);
  }

  async findOne(id: string) {
    const res = await CategoryModel.findById(id).exec();
    return this.transformOne(res);
  }

  async save(category: Category) {
    const res = await CategoryModel.create(category);
    return this.transformOne(res);
  }

  async deleteOne(id: string) {
    return await CategoryModel.deleteOne({ _id: id });
  }

  async deleteMany(id: string[]) {
    return await CategoryModel.deleteMany({ _id: { $in:  id} });
  }
}
