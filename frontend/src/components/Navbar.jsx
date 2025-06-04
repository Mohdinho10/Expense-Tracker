import { useState } from "react";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import SideMenu from "./SideMenu";

function Navbar() {
  const [openSideMenu, setOpenSideMenu] = useState(false);

  return (
    <>
      <nav className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 shadow-sm backdrop-blur-md">
        {/* Logo / Brand */}
        <h2 className="text-xl font-semibold text-slate-700">
          Expense Tracker
        </h2>

        {/* Toggle Menu Button (Mobile) */}
        {!openSideMenu ? (
          <button
            className="cursor-pointer text-gray-800 lg:hidden"
            onClick={() => setOpenSideMenu(true)}
          >
            <HiOutlineMenu className="text-3xl" />
          </button>
        ) : (
          <button
            className="cursor-pointer text-gray-600 lg:hidden"
            onClick={() => setOpenSideMenu(false)}
          >
            <HiOutlineX className="text-2xl" />
          </button>
        )}
      </nav>

      {/* Drawer Menu */}
      {openSideMenu && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpenSideMenu(false)}
          />

          {/* Slide-in SideMenu */}
          <div className="fixed top-0 left-0 z-50 h-full w-72 bg-white shadow-lg transition-transform duration-300 ease-in-out">
            {/* Close Button */}
            {/* <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-lg font-semibold text-purple-700">Menu</h2>
              <button
                className="text-gray-600"
                onClick={() => setOpenSideMenu(false)}
              >
                <HiOutlineX className="text-2xl" />
              </button>
            </div> */}

            {/* SideMenu Content */}
            <SideMenu />
          </div>
        </>
      )}
    </>
  );
}

export default Navbar;
