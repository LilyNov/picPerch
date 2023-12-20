import React from "react";
import { NavLink } from "react-router-dom";

import { INavLink } from "@/types/types";
import { sidebarLinks } from "@/constants/constants";
import { MenuLinksProps } from "./menuLinks.types";
import { checkIsActive } from "@/helpers/helpers";

export const MenuLinks: React.FC<MenuLinksProps> = ({ pathname }) => {
  return (
    <>
      {sidebarLinks.map((link: INavLink) => (
        <li
          key={link.label}
          className={`left-sidebar-link group ${
            checkIsActive(link.route, pathname) && "bg-primary-500"
          }`}>
          <NavLink to={link.route} className="flex gap-4 items-center p-4">
            <img
              src={link.imgURL}
              alt={link.label}
              className={`group-hover:invert-white ${
                checkIsActive(link.route, pathname) && "invert-white"
              } w-6`}
            />
            {link.label}
          </NavLink>
        </li>
      ))}
    </>
  );
};
