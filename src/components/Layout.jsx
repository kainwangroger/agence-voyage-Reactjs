// // src/components/Layout.jsx
// import { useLocation } from "react-router-dom";
// import Navigations from "./Navigations";

// const Layout = ({ children }) => {
//   const location = useLocation();
//   const hideNavbar =
//     location.pathname === "/login" || location.pathname === "/register";

//   return (
//     <>
//       {!hideNavbar && <Navigations />}
//       <div className="container">{children}</div>
//     </>
//   );
// };

// export default Layout;

// src/components/Layout.jsx
import { useLocation } from "react-router-dom";
import Navigations from "./Navigations";

const Layout = ({ children }) => {
  const location = useLocation();
  const hideNavbar =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {!hideNavbar && <Navigations />}
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
