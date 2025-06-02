import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

function DashboardLayout({ activeMenu, children }) {
  const user = useSelector((state) => state.auth.userInfo);

  return (
    <div className="">
      <Navbar activeMenu={activeMenu} />
      {user && (
        <div className="flex">
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>
          <div className="mx-5 grow">{children} </div>
        </div>
      )}
    </div>
  );
}

export default DashboardLayout;
