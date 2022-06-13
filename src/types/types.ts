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
  documentNumber: string,
  document: any
}

export interface userForgotPassword {
  email: string;
}

export interface userResetPassword {
  oldPassword: string,
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

export interface  IPagination {
  url: string;
  label: object;
  active: boolean;
}
export interface PaginationProps {
  pages: IPagination[];
  service: string;
}

export interface IPaginationButton {
  service: string;
  page: number;
  rows: number;
}




