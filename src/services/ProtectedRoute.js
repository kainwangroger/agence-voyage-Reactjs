// // components/PrivateRoute.jsx
// import React from "react";
// import { Navigate } from "react-router-dom";

// const PrivateRoute = ({ children, roles }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     return <Navigate to="/login" />;
//   }

//   if (!roles.includes(user.role)) {
//     return <Navigate to="/unauthorized" />;
//   }

//   return children;
// };

// export default PrivateRoute;






// import { Navigate } from "react-router-dom";
// import { isAuthenticated } from "../utils/auth";

// const ProtectedRoute = ({ children }) => {
//   if (!isAuthenticated()) {
//     return <Navigate to="/login" />;
//   }
//   return children;
// };

// export default ProtectedRoute;
