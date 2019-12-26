import { MiddlewareFn } from "type-graphql";
import { CustomContext } from "../types/CustomContext";

export const isAuth: MiddlewareFn<CustomContext> = async ({ context }, next) => {
  if (!context.req.session!.userId) {
    throw new Error('not authenticated');
  }
  return next();
}