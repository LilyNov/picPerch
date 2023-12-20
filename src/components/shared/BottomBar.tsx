import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { MenuLinks } from "./MenuLinks/MenuLinks";

export const BottomBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <section className="bottom-bar">
      <ul className="flex flex-col gap-6">
        <MenuLinks pathname={pathname} />
      </ul>
    </section>
  );
};
