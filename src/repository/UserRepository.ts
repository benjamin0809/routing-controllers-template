/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 11:41:34
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-16 15:05:38
 */ 
import { plainToClass,serialize,deserialize } from "class-transformer";
import { Service } from "typedi"; 
import { UserModel, User } from "../mongo/type/User";


@Service()
export class UserRepository { 

  async findAll() {
    // here, for example you can load categories using mongoose
    // you can also return a promise here
    // simulate async with creating an empty promise  
    const res = await UserModel.find().exec();
    const s = plainToClass(User, res)
    
    console.log('findALl','s',serialize(s))
    return res.map((t) => {
        // console.log(t)
        return t.toJSON() 
    })
     
  }

  async findOne(id: string) {
    // here, for example you can load category id using mongoose
    // you can also return a promise here
    return await UserModel.findById(id) 
  }

  async save(user: User) {
    // here, for example you can save a category to mongodb using mongoose
    return await UserModel.create(user) 
  }

  async remove(id: number) {
    // here, for example you can save a category to mongodb using mongoose
    return await UserModel.remove({id: id})
  }
}
