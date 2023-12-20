import React from "react";
import { NavLink } from "react-router-dom";

import { INavLink } from "@/types/types";
import { MenuLinksProps } from "./menuLinks.types";
import { checkIsActive } from "@/helpers/helpers";

export const MenuLinks: React.FC<MenuLinksProps> = (props) => {
  const { links, pathname, itemClassName, linkClassName, imgWidth } = props;

  return (
    <>
      {links.map((link: INavLink) => (
        <li
          key={link.label}
          className={`${itemClassName} group ${
            checkIsActive(link.route, pathname) && "bg-primary-500"
          }`}>
          <NavLink to={link.route} className={linkClassName}>
            <img
              src={link.imgURL}
              alt={link.label}
              className={`group-hover:invert-white ${
                checkIsActive(link.route, pathname) && "invert-white"
              } ${imgWidth}`}
            />
            {link.label}
          </NavLink>
        </li>
      ))}
    </>
  );
};
