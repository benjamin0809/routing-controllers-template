/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-14 16:14:44
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-14 18:00:21
 */
import { prop, Typegoose, ModelType, InstanceType } from "typegoose";
import * as mongoose from "mongoose";
import "should";
import should = require("should");

mongoose.connect("mongodb://***:***@47.119.149.96:27017/admin");
const db = mongoose.connection;
db.on("error", console.error);
db.once("open", () => {
  console.log("Connected to 'winedb' database");
});

class User extends Typegoose {
  @prop()
  name?: string;
}
const UserModel = new User().getModelForClass(User);
// UserModel is a regular Mongoose Model with correct types
(async () => {
  const u = await UserModel.create({ name: "JohnDoe" });
  const user = await UserModel.findOne();

  // prints { _id: 59218f686409d670a97e53e0, name: 'JohnDoe', __v: 0 }
  console.log(user);
})();
