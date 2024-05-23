import React from "react";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { ROLES } from "../utils/constants";

const AdminRoutes = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={[ROLES.ADMIN]}>{children}</ProtectedRoute>
  );
};

export default AdminRoutes;
