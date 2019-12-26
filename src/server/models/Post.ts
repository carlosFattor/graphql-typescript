import { prop } from "@typegoose/typegoose";
import { ObjectId } from "bson";
import { Field, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Post {

  constructor(content: string, userId: string) {
    this.content = content;
    this.userId = userId;
  }

  @Field(() => ID)
  readonly _id: ObjectId;

  @Field()
  @prop({ required: true })
  content: string;

  @Field()
  @prop({ required: true })
  userId: string;

  @Field()
  @prop({ required: true })
  date: string = new Date().toISOString();

  @prop({ default: true })
  showing: boolean = true;
}
