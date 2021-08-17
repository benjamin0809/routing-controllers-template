/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 16:14:44
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-16 15:31:24
 */ 
import * as mongoose from "mongoose"; 
import { Service } from "typedi/decorators/Service";
import { UserModel } from "../src/mongo/type/User";
import { UserRepository } from "../src/repository/UserRepository";

mongoose.connect("mongodb://localhost:27017/admin");
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("Connected to 'winedb' database");
});
 

UserModel.find({name: 'Benjamin Chiu'}).exec().then(res =>{
  console.log(res)
})

UserModel.findById('6119d29b8db8d33e388f1e45').exec().then(res =>{
  console.log(res)
})

UserModel.updateOne({_id : '6119d29b8db8d33e388f1e45'}, {name: 'Benjamin CHIUu', password: 'mrz0809', extra: 'marvelous'}).exec()

UserModel.schema.add

UserModel.count().exec().then(nums => {
  console.log(nums)
})
