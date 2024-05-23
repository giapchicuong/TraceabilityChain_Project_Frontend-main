import React from "react";
import "./sidebar.scss";
import { useSelector } from "react-redux";
import NavLinkCustom from "../NavLinkCustom/NavLinkCustom";
const Sidebar = () => {
  const account = useSelector((state) => state.account);
  const currentRole = useSelector(
    (state) => state.account?.userInfor?.groupWithRoles?.name
  );
  if (account && account.isAuthenticated === true) {
    return (
      <div className="sidebar-container">
        <div className="container">
          <div className="top ">
            <NavLinkCustom
              link="/"
              child={
                <div className="brand d-none d-lg-block">TraceabilityChain</div>
              }
            />
            <div className="user">
              <div className="icon">
                <i className="fa fa-user-circle-o" aria-hidden="true"></i>
              </div>
              <div className="name d-none d-lg-block">
                {account.userInfor.username.toUpperCase()}
              </div>
            </div>
          </div>
          <div className="center">
            <NavLinkCustom
              title="Dashboard"
              link="/"
              icon="fa fa-signal fs-6"
            />
            {currentRole === "Admin" && (
              <>
                <NavLinkCustom title="Users" link="/users" icon="fa fa-user" />
                <NavLinkCustom
                  title="Blogs"
                  link="/blogs"
                  icon="fa fa-newspaper-o"
                />

                <NavLinkCustom
                  title="Groups"
                  link="/groups"
                  icon="fa fa-users"
                />
                <NavLinkCustom title="Roles" link="/roles" icon="fa fa-cubes" />
                <NavLinkCustom
                  title="Roles of group"
                  link="/group-role"
                  icon="fa fa-sitemap"
                />
              </>
            )}
            {currentRole === "Manufacturer" && (
              <>
                <NavLinkCustom
                  title="Products"
                  link="/products"
                  icon="fa fa-cube"
                />{" "}
                <NavLinkCustom
                  title="Production Area"
                  link="/productionArea"
                  icon="fa fa-truck"
                />
                <NavLinkCustom
                  title="Farm Object"
                  link="/farmObject"
                  icon="fa fa-linode"
                />
                <NavLinkCustom
                  title="Farm Process"
                  link="/farmProcess"
                  icon="fa fa-tasks"
                />
                <NavLinkCustom
                  title="Journey Product"
                  link="/journeyProduct"
                  icon="fa fa-handshake-o"
                />
                <NavLinkCustom
                  title="Enterprise Product"
                  link="/enterpriseProduct"
                  icon="fa fa-building-o"
                />
              </>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    // return <Redirect to="/login"></Redirect>;
    return <></>;
  }
};

export default Sidebar;
