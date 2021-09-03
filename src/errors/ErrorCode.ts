export enum AuthErrorCode {
    Account_Not_Exist = 10001,
    Password_Not_Exist = 10002,
    Refresh_Token_Invalid = 10003,
    Access_Token_Invalid = 10004,
}

export enum CategoryErrorCode {
    Category_Name_Already_Exist = 20001, 
}

export enum RequestCode {
    Account_Already_Exist = 20001,
    Email_Already_Exist = 20002,
    Category_Name_Already_Exist = 30001, 
}