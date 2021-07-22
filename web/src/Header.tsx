import React from "react";

interface Props {}

export const Header = (props: Props) => {
  return <div></div>;
};

// import React, { ReactElement } from "react";
// import { Link } from "react-router-dom";
// import { setAccessToken } from "./accessToken";
// import { useLogoutMutation } from "./generated/graphql";

// export default function Header(): ReactElement {
//   // const { data, loading } = useMeQuery();
//   // const [logout, { client }] = useLogoutMutation();
//   // let body: any = null;
//   // if (loading) {
//   //   body = null;
//   // } else if (data?.me) {
//   //   body = <div>You are logged in as: {data.me.email}</div>;
//   // } else {
//   //   body = <div>You are not logged in</div>;
//   // }
//   // const handleLogout = async () => {
//   //   await logout();
//   //   setAccessToken("");
//   //   await client!.cache.reset();
//   // };

//   return (
//     <header>
//       <div>
//         <Link to="/">Home</Link>
//       </div>
//       <div>
//         <Link to="/register">Register</Link>
//       </div>
//       <div>
//         <Link to="/login">login</Link>
//       </div>
//       <div>
//         <Link to="/bye">bye</Link>
//       </div>
//       <div>
//         {!loading && data?.me && <button onClick={handleLogout}>Logout</button>}
//       </div>
//       {body && body}
//     </header>
//   );
// }
