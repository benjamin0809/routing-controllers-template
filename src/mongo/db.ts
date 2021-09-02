/*
 * @Description: 
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 11:40:52
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-09-02 18:01:37
 */ 
import * as mongoose from "mongoose";  
class DB {
    static init() {
        mongoose.set('useCreateIndex', true) 
        mongoose.connect("mongodb://localhost:27017/admin", { useNewUrlParser: true ,useUnifiedTopology: true} );
        const db = mongoose.connection;
        db.on("error", console.error);
        db.once("open", () => {
          console.log("Connected to 'admin' database");
        });
        db.on("connection", console.error)
        db.on("connected", console.error)
    }
} 
export default DB