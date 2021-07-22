import { verify } from "jsonwebtoken";
import { MiddlewareFn } from "type-graphql";
import jwtConfig from "./config/jwt.config";
import { MyContext } from "./MyContext";

// Bearer token
export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"];
  const error = new Error("You are not logged in");
  if (!authorization) {
    throw error;
  }
  try {
    const token = authorization.split(" ")[1];
    const payload = verify(token, jwtConfig.accessSecret);
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw error;
  }

  return next();
};
