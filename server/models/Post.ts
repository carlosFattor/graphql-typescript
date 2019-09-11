import { Typegoose, prop } from "typegoose";
import { ObjectType, Field, ID } from "type-graphql";
import { ObjectId } from "bson";

@ObjectType()
export class Post extends Typegoose {

  constructor(content: string, userId: string) {
    super();
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
