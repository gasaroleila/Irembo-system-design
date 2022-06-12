import {Gender, MaritialStatus } from "./enums";
export interface UserAuth {
  email: string;
  password: string;
}

export interface userLogin {
  loginLink: string
}

export interface UserVerifyAccount {
  code: string;
}

export interface UserRegisterData {
  names: string,
  email: string,
  gender: Gender,
  age: number,
  dob: string,
  maritialStatus: MaritialStatus,
  nationality: string,
  profilePicture: any,
  accountType: string,
  password:string
}

export interface OtherUserInfo {
  documentNumber: number,
  document: any
}

export interface userForgotPassword {
  email: string;
}

export interface userResetPassword {
  resetLink: string;
  newPassword: string;
  confirmPassword: string;
}

export interface User {
  id?: string;
  names: string,
  email: string,
  gender: string,
  age: number,
  dob: string,
  maritialStatus: string,
  nationality: string,
  profilePicture: any,
  accountType: string,
  password: string
}




