/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-17 10:39:25
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-09-02 18:05:41
 */
import { DocumentType } from "@typegoose/typegoose";
import { BeAnObject } from "@typegoose/typegoose/lib/types";

export class BaseRepository<T> {
  transformOne(res: DocumentType<T, BeAnObject>) {
    const a = res.toJSON({ flattenMaps: true, versionKey: false })
    a._id = a._id.toString();
    return a;
  }

  transformMany(res: DocumentType<T, BeAnObject>[]) {
    const a = res.map((t) => {
      const o = t.toJSON({ flattenMaps: true, versionKey: false });
      o._id = o._id + "";
      return o;
    });
    return a;
  }

  ObjectMapper<S>(c: { new(): S; },source: any) { 
    if(!source)return ''
    if(source instanceof  Array) {
      source.map((item, index) => {
        const t = new c()  
        Object.keys(t).map(i =>{
          (t as any)[i] = item[i]
        })
        return t
      }) 
    } else {
      const t = new c() 
    Object.keys(t).map(i =>{
      (t as any)[i] = source[i]
    })
    return t
    }
    
   
  }

  
  ObjectArrayMapper<S>(c: { new(): S; },source: any[]) {  
    return source.map((item, index) => {
      const t = new c()  
      Object.keys(t).map(i =>{
        (t as any)[i] = item[i]
      })
      return t
    }) 
  }
}
