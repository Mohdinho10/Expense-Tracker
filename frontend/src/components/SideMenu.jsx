import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";
import { SIDE_MENU_DATA } from "../utils/data";
import CharAvatar from "./CharAvatar";
import { useLogoutMutation } from "../slices/userApiSlice";
import { logout as logoutAction } from "../slices/authSlice";
import { toast } from "react-hot-toast";

function SideMenu({ activeMenu }) {
  const user = useSelector((state) => state.auth.userInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const handleClick = async (path, label) => {
    if (label === "Logout") {
      try {
        await logoutApiCall().unwrap();
        dispatch(logoutAction());
        toast.success("Logged out successfully.");
        navigate("/login");
      } catch (err) {
        console.error(err);
        toast.error(err?.data?.message || "Logout failed.");
      }
    } else {
      navigate(path);
    }
  };

  return (
    <div className="sticky top-[61px] z-20 h-[calc(100vh-61px)] w-64 border-r border-gray-200/50 bg-white p-5">
      <div className="mt-3 mb-7 flex flex-col items-center justify-center gap-3">
        {user?.profileImageUrl ? (
          <img
            src={`${BASE_URL}${user?.profileImageUrl.replace("public", "")}`}
            alt="Profile Image"
            className="h-20 w-20 rounded-full bg-slate-400"
          />
        ) : (
          <CharAvatar
            username={user?.username}
            width="w-20"
            height="h-20"
            style="text-xl"
          />
        )}
        <h5 className="leading-6 font-medium text-gray-950">
          {user?.username}
        </h5>
      </div>

      {SIDE_MENU_DATA.map((item, index) => (
        <Link
          to={item.path}
          key={index}
          onClick={() => handleClick(item.path, item.label)}
          className={`flex w-full items-center gap-4 text-[15px] ${
            activeMenu === item.label ? "bg-primary text-white" : ""
          } mb-3 rounded-lg px-6 py-3`}
        >
          <item.icon className="text-xl" />
          {item.label}
        </Link>
      ))}
    </div>
  );
}

export default SideMenu;
