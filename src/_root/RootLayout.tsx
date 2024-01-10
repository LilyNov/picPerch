import {
  BottomBar,
  LeftSidebar,
  TopBar,
} from "@/components/modules/navigation";
import { Outlet } from "react-router-dom";

export const RootLayout = () => {
  return (
    <div className=" w-full md:flex">
      {/* The TopBar and the BottomBar for a mobile view*/}
      <TopBar />
      <LeftSidebar />

      <section className="flex flex-1 h-full">
        <Outlet />
      </section>

      <BottomBar />
    </div>
  );
};
