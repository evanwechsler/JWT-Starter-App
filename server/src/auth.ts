import { sign } from "jsonwebtoken";
import jwtConfig from "./config/jwt.config";
import { User } from "./entity/User";

export const createAccessToken = (user: User) => {
  return sign({ userId: user.id }, jwtConfig.accessSecret, {
    expiresIn: "15m",
  });
};

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    jwtConfig.refreshSecret,
    {
      expiresIn: "7d",
    }
  );
};
