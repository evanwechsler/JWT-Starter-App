import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  let expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  res.cookie("jid", token, {
    httpOnly: true,
    path: "/refresh_token",
    expires: expirationDate,
  });
};
