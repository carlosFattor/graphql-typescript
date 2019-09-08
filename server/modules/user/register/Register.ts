import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql/dist/decorators";
import { User, UserModel } from "../../../models/User";
import { RegisterInput } from "./validation/RegisterInput";
import { isAuth } from "../../../utils/IsAuth";

@Resolver()
export class RegisterResolver {
  // @Authorized()
  @UseMiddleware(isAuth)
  @Query(() => String)
  async helloWorld() {
    return "Hello World";
  }

  @Mutation(() => User)
  async register(
    @Arg('data') { email, password, firstName, lastName }: RegisterInput): Promise<User> {

    const resp = await UserModel.create({ email, password, firstName, lastName });
    return resp;
  }
}
