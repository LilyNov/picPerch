import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { Button } from "../ui/button";
import { MenuLinks } from "./MenuLinks";
import { Logo } from "./Logo";
import { sidebarLinks } from "@/constants/constants";

export const LeftSidebar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();
  const { pathname } = useLocation();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <nav className="left-sidebar">
      <div className="flex flex-col gap-11">
        <Link to="/" className="flex gap-3 items-center">
          <Logo imgStyles="w-8" textSize="text-2xl" />
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
            <p className="small-regular text-off-white">@{user.name}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6">
          <MenuLinks
            pathname={pathname}
            links={sidebarLinks}
            itemClassName="left-sidebar-link"
            linkClassName="flex gap-4 items-center p-4"
            imgWidth="w-6"
          />
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
