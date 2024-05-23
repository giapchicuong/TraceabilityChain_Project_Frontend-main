import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { fetchAccountRedux } from "../redux/slices/accountSlice";
import Loading from "../components/Loading/Loading";

const PrivateRoutes = (props) => {
  const { isAuthenticated, isLoading } = useSelector((state) => state.account);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/login") {
      dispatch(fetchAccountRedux());
    }
  }, [location, dispatch]);

  if (isLoading) {
    return <Loading />;
  } else {
    if (isAuthenticated) {
      return (
        <Route
          path={props.path}
          component={props.component}
          exact={props.exact}
        />
      );
    } else {
      return <Redirect to="/login" />;
    }
  }
};

export default PrivateRoutes;
