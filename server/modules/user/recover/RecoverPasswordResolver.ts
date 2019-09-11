import { Resolver, Mutation, Arg } from "type-graphql";
import { UserModel } from "../../../models/User";
import v4 from 'uuid';
import { redis } from "../../../../db/redis";

@Resolver()
export class RecoverPasswordResolver {

  @Mutation(() => null)
  async recover(@Arg('email') email: string) {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return null;
    }

    if (!user.confirmed) {
      return null
    }

    const recUser = v4();
    redis.set(user._id, recUser, "ex", 60 * 10 * 1000);


  }
}