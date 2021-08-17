/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-17 10:39:25
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-17 10:56:14
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
}
