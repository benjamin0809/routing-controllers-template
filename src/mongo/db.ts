/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 11:40:52
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-16 11:45:04
 */ 
import * as mongoose from "mongoose";  
class DB {
    static init() {
        mongoose.connect("mongodb://localhost:27017/admin");
        const db = mongoose.connection;
        db.on("error", console.error);
        db.once("open", () => {
          console.log("Connected to 'winedb' database");
        });
    }
} 
export default DB