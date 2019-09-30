import { Arg, Mutation, Resolver } from "type-graphql";
import v4 from 'uuid';
import { redis } from "../../../../db/redis";
import { UserModel } from "../../../models/User";

@Resolver()
export class RecoverPasswordResolver {

  @Mutation(() => Boolean || null)
  async recover(@Arg('email') email: string): Promise<Boolean | null> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return null;
    }

    if (!user.confirmed) {
      return null
    }

    const recUser = v4();
    redis.set(user._id, recUser, "ex", 60 * 10 * 1000);

    return true;
  }
}