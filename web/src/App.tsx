import React, { ReactElement, useEffect, useState } from "react";
import { setAccessToken } from "./accessToken";
import Routes from "./components/Routes";

export default function App(): ReactElement {
  const [loading, setLoading] = useState(true);

  // Refresh tokens on entering app
  useEffect(() => {
    const abortController = new AbortController();
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
    return () => abortController.abort();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return <Routes />;
}
