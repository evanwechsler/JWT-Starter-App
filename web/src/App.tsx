import React, { ReactElement, useEffect, useState } from "react";
import { setAccessToken } from "./accessToken";
import Routes from "./Routes";

export default function App(): ReactElement {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const refreshToken = async () => {
      const response = await fetch("http://localhost:4000/refresh_token", {
        method: "POST",
        credentials: "include",
      });
      const { accessToken } = await response.json();
      setAccessToken(accessToken);
      setLoading(false);
    };
    refreshToken();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <Routes />;
}
