import { sidebarLinks } from "@/constants/constants";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { INavLink } from "@/types/types";
import { useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

export const LeftSidebar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

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
            <li key={link.label} className="left-sidebar-link">
              <NavLink to={link.route} className="flex gap-4 items-center p-4">
                <img src={link.imgURL} alt={link.label} className="w-6" />
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};
