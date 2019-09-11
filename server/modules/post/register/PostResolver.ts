import { Resolver, Mutation, Arg } from "type-graphql";
import { UserModel } from "../../../models/User";
import { Post } from "../../../models/Post";

@Resolver()
export class PostResolver {

  @Mutation(() => Boolean)
  async save(@Arg('userId') userId: string, @Arg('post') content: string): Promise<boolean> {

    const post = new Post(content, userId);
    const saved: Post = await UserModel.updateOne({ _id: userId }, { '$push': { 'posts': post } });

    return !!saved;
  }
}