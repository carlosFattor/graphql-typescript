import { Arg, Query, Resolver } from "type-graphql";
import { User, UserModel } from "../../../models/User";

@Resolver()
export class ListUserResolver {

  @Query(() => [User]!)
  async listUser(@Arg('_id', { nullable: true }) _id?: string) {
    if (!!_id) {
      const user = await UserModel.findById({ _id });
      return [user];
    }
    const users = UserModel.find();
    return users;
  }
}