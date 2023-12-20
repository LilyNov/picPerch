import { useNavigate, useLocation } from "react-router-dom";
import { bottomBarLinks } from "@/constants/constants";
import { MenuLinks } from "./MenuLinks";

export const BottomBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      <ul className="flex gap-3 flex-center justify-center  w-full">
        <MenuLinks
          links={bottomBarLinks}
          pathname={pathname}
          itemClassName="bottom-bar-link"
          linkClassName="flex gap-1 flex-col items-center p-2 transition"
          imgWidth="w-5"
        />
      </ul>
    </section>
  );
};
