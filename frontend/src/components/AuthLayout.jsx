import StatsInfoCard from "./StatsInfoCard";
import { LuTrendingUpDown } from "react-icons/lu";
import sample from "/public/sample.png";

function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col-reverse bg-white md:flex-row">
      {/* Left - Auth Form Section */}
      <div className="flex w-full items-center justify-center px-6 py-12 sm:px-10 md:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="mb-8 text-2xl font-semibold text-gray-800">
            Expense Tracker
          </h1>
          {children}
        </div>
      </div>

      {/* Right - Stats & Illustration Section */}
      <div className="bg-primary/90 relative hidden h-full w-full items-center justify-center p-6 md:flex md:w-1/2">
        {/* Decorative shapes */}
        <div className="bg-primary-dark absolute -top-10 -left-10 h-40 w-40 rounded-[40px] opacity-60 blur-xl"></div>
        <div className="absolute top-1/3 -right-12 h-56 w-48 rounded-[40px] border-[16px] border-white opacity-50"></div>
        <div className="bg-primary absolute -bottom-10 -left-5 h-48 w-48 rounded-[40px] opacity-70 blur-xl"></div>

        {/* Content */}
        <div className="relative z-10 flex w-full max-w-sm flex-col gap-8">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-white text-primary"
          />
          <img
            src={sample}
            alt="Illustration"
            className="mx-auto w-60 shadow-lg shadow-black/10 sm:w-72 lg:w-80 xl:w-96"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
