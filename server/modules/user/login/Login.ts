import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { User, UserModel } from "../../../models/User";
import { CustomContext } from "../../../types/CustomContext";

@Resolver()
export class LoginResolver {
  @Mutation(() => User, { nullable: true })
  async login(@Arg('email') email: string, @Arg('password') password: string, @Ctx() ctx: CustomContext): Promise<User | null> {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return null;
    }

    const passOk = await user.comparePassword(password);

    if (!passOk) {
      return null;
    }
    console.log({ user: user._id });
    ctx.req.session!.userId = user._id;
    return user;
  }
}