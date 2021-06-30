import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import jwtConfig from "./config/jwt.config";
import { MyContext } from "./MyContext";

// Bearer token
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    throw new Error("Not authenticated");
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, jwtConfig.accessSecret);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Not authenticated");
  }

  return next();
};
