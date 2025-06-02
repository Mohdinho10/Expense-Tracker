import StatsInfoCard from "./StatsInfoCard";
import { LuTrendingUpDown } from "react-icons/lu";

function AuthLayout({ children }) {
  return (
    <div className="flex h-screen w-screen">
      {/* Left Side - Form Section */}
      <div className="flex flex-col justify-center px-10 md:w-1/2">
        <h2 className="mb-8 text-lg font-medium text-black">Expense Tracker</h2>
        {children}
      </div>

      {/* Right Side - Background / Stats Section */}
      <div className="bg-auth-bg-img relative hidden overflow-hidden bg-cover bg-center bg-no-repeat p-8 md:block md:w-1/2">
        <div className="absolute -top-7 -left-5 h-48 w-48 rounded-[40px] bg-purple-600"></div>
        <div className="absolute top-[30%] -right-10 h-56 w-48 rounded-[40px] border-[20px] border-fuchsia-600"></div>
        <div className="absolute -bottom-7 -left-5 w-48 rounded-[40px] bg-violet-500"></div>

        <div className="relative z-20 grid grid-cols-1">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-primary"
          />
        </div>
        <img
          src="https://cdn.dribbble.com/userupload/30499941/file/original-458b40004252383cccdeec62be7d55b9.png?resize=1024x768&vertical=center"
          alt=""
          className="absolute bottom-10 w-64 shadow-lg shadow-blue-400/15 lg:w-[90%]"
        />
      </div>
    </div>
  );
}

export default AuthLayout;
