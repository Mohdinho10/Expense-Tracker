import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

function Navbar() {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <div className="sticky top-0 z-50 flex gap-5 border border-b border-gray-200/50 bg-white px-7 py-4 backdrop-blur-[2px]">
      <button
        className="block text-black lg:hidden"
        onClick={() => setOpenSideMenu(!openSideMenu)}
      >
        {openSideMenu ? (
          <HiOutlineMenu className="text-2xl" />
        ) : (
          <HiOutlineX className="text-2xl" />
        )}
      </button>

      <h2 className="text-lg font-medium text-black">Expense Tracker</h2>

      {openSideMenu && (
        <div className="fixed top-[61px] -ml-4 bg-white">
          <SideMenu />
        </div>
      )}
    </div>
  );
}

export default Navbar;
