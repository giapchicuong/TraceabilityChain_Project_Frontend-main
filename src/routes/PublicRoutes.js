import React from "react";
import { Route } from "react-router-dom/cjs/react-router-dom.min";

const PublicRoutes = (props) => {
  return (
    <div>
      <Route
        path={props.path}
        component={props.component}
        exact={props.exact}
      />
    </div>
  );
};

export default PublicRoutes;
