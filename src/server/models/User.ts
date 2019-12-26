import { getModelForClass, pre, prop as Property } from "@typegoose/typegoose";
import bcrypt from "bcryptjs";
import { ObjectId } from "bson";
import jwt from "jsonwebtoken";
import mongoose from 'mongoose';
import { ID } from 'type-graphql';
import { Field, ObjectType } from "type-graphql/dist/decorators";
import { Post } from './Post';

mongoose.set('useCreateIndex', true);

@pre<User>("save", function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (error: Error, hash: string) => {
      if (error) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
})

@ObjectType()
export class User {

  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  @Property({ unique: true, required: true })
  email: string;

  @Property({ required: true, trim: true })
  password: string;

  @Field()
  @Property({ lowercase: true, trim: true, default: '' })
  firstName?: string

  @Field()
  @Property({ lowercase: true, trim: true, default: '' })
  lastName?: string;

  @Field(() => [Post], { nullable: true })
  @Property({ required: false })
  posts?: Post[];

  @Property({ default: false })
  confirmed: boolean;

  comparePassword(candidatePassword: string): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
  };

  generateJWT(secret: string, expiresIn: number): string {
    return jwt.sign(
      {
        _id: this._id,
        email: this.email
      },
      secret,
      {
        expiresIn
      }
    );
  };
}

export const UserModel = getModelForClass(User);
