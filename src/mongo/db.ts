/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 11:40:52
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2021-08-26 20:28:15
 */ 
import * as mongoose from "mongoose";  
class DB {
    static init() {
        mongoose.connect("mongodb://localhost:27017/admin", { useNewUrlParser: true ,useUnifiedTopology: true} );
        const db = mongoose.connection;
        db.on("error", console.error);
        db.once("open", () => {
          console.log("Connected to 'winedb' database");
        });
    }
} 
export default DB