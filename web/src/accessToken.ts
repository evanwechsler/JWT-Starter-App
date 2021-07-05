let accessToken = "";

export interface AccessToken {
  userId: number;
  iat: number;
  exp: number;
}

export const setAccessToken = (token: string) => {
  accessToken = token;
};
export const getAccessToken = () => {
  return accessToken;
};
