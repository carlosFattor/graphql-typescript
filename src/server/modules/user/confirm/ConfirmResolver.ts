import { Arg, Mutation, Resolver } from "type-graphql";
import { redis } from "../../../../db/redis";
import { UserModel } from "../../../models/User";

@Resolver()
export class ConfirmResolver {
  @Mutation(() => Boolean)
  async confirmUser(@Arg('token') token: string) {
    const userId = await redis.get(token);

    if (!userId) {
      return false;
    }

    await UserModel.updateOne({ _id: userId }, { confirmed: true }).exec();
    await redis.del(token);
    return true;
  }
}