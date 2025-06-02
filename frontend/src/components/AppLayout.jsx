import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

function AppLayout({ activeMenu }) {
  const user = useSelector((state) => state.auth.userInfo);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="mx-5 grow">
            <Outlet />{" "}
          </div>
        </div>
      )}
    </div>
  );
}

export default AppLayout;
