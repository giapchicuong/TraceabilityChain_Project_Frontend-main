import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoutes from "./AdminRoutes";
import ManufacturerRoutes from "./ManufacturerRoutes";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Groups from "../pages/Groups/Groups";
import Products from "../pages/ManageProducts/Products";
import Users from "../pages/ManageUsers/Users";
import Home from "../pages/Home/Home";
import Roles from "../pages/Roles/Roles";
import GroupRole from "../pages/GroupRole/GroupRole";
import PublicRoutes from "./PublicRoutes";
import Product from "../pages/Product/Product";
import Blogs from "../pages/ManageBlogs/Blogs";
import BlogsListPublic from "../pages/BlogsListPublic/BlogsListPublic";
import BlogPublic from "../pages/BlogPublic/BlogPublic";
import ProductionArea from "../pages/ManageProductionArea/ProductionArea";
import Error from "../components/Error/Error";

const AppRoutes = () => {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <PrivateRoutes path="/" component={Home} exact={true} />
        <PrivateRoutes
          path="/users"
          component={() => <AdminRoutes>{<Users />}</AdminRoutes>}
        />
        <PrivateRoutes
          path="/blogs"
          component={() => <AdminRoutes>{<Blogs />}</AdminRoutes>}
        />
        <PrivateRoutes
          path="/roles"
          component={() => <AdminRoutes>{<Roles />}</AdminRoutes>}
        />
        <PrivateRoutes
          path="/group-role"
          component={() => <AdminRoutes>{<GroupRole />}</AdminRoutes>}
        />
        <PrivateRoutes
          path="/groups"
          component={() => <AdminRoutes>{<Groups />}</AdminRoutes>}
        />
        <PrivateRoutes
          path="/products"
          component={() => (
            <ManufacturerRoutes>{<Products />}</ManufacturerRoutes>
          )}
        />
        {/* <PrivateRoutes
          path="/productionArea"
          component={() => (
            <ManufacturerRoutes>{<ProductionArea />}</ManufacturerRoutes>
          )}
        /> */}
        <PublicRoutes path="/public/product/:id" component={Product} />
        <PublicRoutes path="/public/blogs" component={BlogsListPublic} />
        <PublicRoutes path="/public/blog/:id" component={BlogPublic} />
        <Route path="*" component={Error} />
      </Switch>
    </>
  );
};

export default AppRoutes;
