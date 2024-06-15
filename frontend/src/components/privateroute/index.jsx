// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute = ({ element, roles }) => {
//   const user = JSON.parse(localStorage.getItem("user"));

//   if (!user) {
//     // Redirect to login if user is not logged in
//     return <Navigate to="/login" replace />;
//   }

//   if (roles && !roles.includes(user.role)) {
//     // Redirect to unauthorized page if user role is not in allowed roles
//     return <Navigate to="*" replace />;
//   }

//   // Render the route if user is authenticated and has the correct role
//   return <Route element={element} />;
// };

// export default PrivateRoute;
