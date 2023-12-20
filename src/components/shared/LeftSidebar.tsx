import { useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { sidebarLinks } from "@/constants/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { INavLink } from "@/types/types";
import { Button } from "../ui/button";

export const LeftSidebar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  const checkIsActive = (path: string) => {
    return path === pathname;
  };

  return (
    <nav className="left-sidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <img src="/assets/icons/logo.svg" alt="logo" width={30} />
          <span className="text-2xl">PicPerch</span>
        </Link>
        <Link to={`/profile/${user.id}`} className=" flex-center gap-3">
          {user?.imageUrl ? (
            <img
              src={user.imageUrl}
              alt="profile image"
              className="h-8 w-8 rounded-full"
            />
          ) : (
            "U"
          )}
          <div className="flex flex-col w-full">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.name}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((link: INavLink) => (
            <li
              key={link.label}
              className={`left-sidebar-link group ${
                checkIsActive(link.route) && "bg-primary-500"
              }`}>
              <NavLink to={link.route} className="flex gap-4 items-center p-4">
                <img
                  src={link.imgURL}
                  alt={link.label}
                  className={`group-hover:invert-white ${
                    checkIsActive(link.route) && "invert-white"
                  } w-6`}
                />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <Button
        variant="ghost"
        className="shad-button_ghost"
        onClick={() => signOut()}>
        <span className="material-symbols-outlined">logout</span>
        <p className="small-medium lg:base-medium">Logout</p>
      </Button>
    </nav>
  );
};
