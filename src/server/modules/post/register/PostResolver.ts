import { Arg, Mutation, Resolver } from "type-graphql";
import { Post } from "../../../models/Post";
import { UserModel } from "../../../models/User";

@Resolver()
export class PostResolver {

  @Mutation(() => Boolean)
  async save(@Arg('userId') userId: string, @Arg('post') content: string): Promise<boolean> {

    const post = new Post(content, userId);
    const saved: Post = await UserModel.updateOne({ _id: userId }, { '$push': { 'posts': post } });

    return !!saved;
  }
}