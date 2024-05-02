import { ObjectId } from "mongodb";

export interface User {
      username: string,
      password: string,
      profileImage?:string 
      //role: "ADMIN" | "USER"
}