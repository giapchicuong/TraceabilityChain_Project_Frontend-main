import React from "react";
import { NavLink } from "react-router-dom";

const NavLinkCustom = (props) => {
  const { title, link, icon, child } = props;

  return (
    <NavLink exact to={link} activeClassName="active">
      {child ? (
        child
      ) : (
        <div className="item">
          <i className={icon} aria-hidden="true"></i>
          <span className="d-none d-sm-inline">{title}</span>
        </div>
      )}
    </NavLink>
  );
};

export default NavLinkCustom;
