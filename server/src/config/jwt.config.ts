export default {
  accessSecret: process.env.ACCESS_TOKEN_SECRET ?? "secret",
  refreshSecret: process.env.REFRESH_TOKEN_SECRET ?? "cookie",
};
