/*
 * @Description:
 * @Version: 1.0
 * @Autor: Benjamin Chiu
 * @Date: 2021-08-16 11:02:36
 * @LastEditors: Benjamin Chiu
 * @LastEditTime: 2021-08-16 11:05:17
 */

export class User {
  name: string;
  email: string;
  gender: number;
  account: string;
  password: string;
  constructor(
    name: string,
    email: string,
    gender: number,
    account: string,
    password: string
  ) {
    this.name = name;
    this.email = email;
    this.gender = gender;
    this.account = account;
    this.password = password;
  }
}

