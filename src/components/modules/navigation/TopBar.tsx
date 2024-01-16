import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";
import { useUserContext } from "@/context/AuthContext";
import { Logo } from "../../shared/Logo";

export const TopBar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="top-bar">
      <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <Logo imgStyles="w-8" textSize="text-2xl" />
        </Link>
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}>
            <span className="material-symbols-outlined">logout</span>
          </Button>
          <Link to={`/profile/${user.id}`} className=" flex-center gap-3">
            {user?.imageUrl ? (
              <img
                src={user.imageUrl}
                alt="profile image"
                className="h-8 w-8 rounded-full"
              />
            ) : (
              <span className="material-symbols-outlined">account_circle</span>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};
