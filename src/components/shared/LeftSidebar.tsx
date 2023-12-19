import { useUserContext } from "@/context/AuthContext";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
          <div className="flex flex-col">
            <p className="body-bold">{user.name}</p>
            <p className="small-regular text-light-3">@{user.name}</p>
          </div>
        </Link>

        <ul className="flex flex-col gap-6"></ul>
      </div>
    </nav>
  );
};
