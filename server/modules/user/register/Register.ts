import { Resolver, Query, Mutation, Arg, UseMiddleware } from "type-graphql/dist/decorators";
import { User, UserModel } from "../../../models/User";
import { RegisterInput } from "./validation/RegisterInput";
import { isAuth } from "../../../utils/IsAuth";
import { sendEmail } from "../../../utils/SendEmail";
import { createConfirmationUrl } from "../../../utils/CreateConfirmationUrl";

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
    sendEmail(email, await createConfirmationUrl(resp._id));
    return resp;
  }
}
