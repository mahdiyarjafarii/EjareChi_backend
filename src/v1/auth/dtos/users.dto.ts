import {IsEmail , IsString, MinLength } from 'class-validator';


export class UserCreateReq{
    @IsString()
    name: string;

    @IsString()
    lastName : string;

    @IsEmail()
    email :string

    @IsString()
    @MinLength(8)
    password:string

}