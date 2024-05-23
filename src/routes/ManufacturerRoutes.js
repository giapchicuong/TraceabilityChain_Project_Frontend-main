import React from "react";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import { ROLES } from "../utils/constants";

const ManufacturerRoutes = ({ children }) => {
  return (
    <ProtectedRoute allowedRoles={[ROLES.MANUFACTURER]}>
      {children}
    </ProtectedRoute>
  );
};

export default ManufacturerRoutes;
