import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const currentRole = useSelector(
    (state) => state.account?.userInfor?.groupWithRoles?.name
  );

  if (allowedRoles.includes(currentRole)) {
    return <>{children}</>;
  } else {
    return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
