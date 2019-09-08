import { InputType, Field } from "type-graphql";
import { Length, IsEmail } from "class-validator";
import { IsEmailAlreadyExist } from "./IsEmailAlreadyExist";

@InputType()
export class RegisterInput {
    @Field()
    @IsEmail()
    @IsEmailAlreadyExist({ message: 'Email already in use' })
    email: string;

    @Field()
    password: string;

    @Field()
    @Length(3, 30)
    firstName: string;

    @Field()
    @Length(3, 255)
    lastName: string;
}