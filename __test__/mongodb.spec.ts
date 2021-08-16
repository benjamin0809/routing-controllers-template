/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 16:14:44
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-16 12:20:33
 */ 
import * as mongoose from "mongoose";
import { UserModel } from '../src/mongo/type/User'
import "should";
import should = require("should");

mongoose.connect("mongodb://localhost:27017/admin");
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("Connected to 'winedb' database");
});
 
// UserModel is a regular Mongoose Model with correct types
(async () => {
  // const u = await UserModel.create({ name: "Benjamin" , email: '894306909@qq.com', gender: '1', account: '15014491899', password: '123'});
  const user = await UserModel.findOne({ name: /benjamin/i});
  const res = await UserModel.updateMany({ name: /benjamin/i}, { name: 'Benjamin Chiu'});
  const res1 = await UserModel.findById('6119d230e48246380c2a4e89');
  const users = await UserModel.find();
  // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
  console.log(users);
  console.log(typeof users);
})();
