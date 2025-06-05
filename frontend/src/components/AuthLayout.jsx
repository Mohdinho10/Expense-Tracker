import StatsInfoCard from "./StatsInfoCard";
import { LuTrendingUpDown } from "react-icons/lu";
import sample from "/public/sample.png";

function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col-reverse overflow-hidden bg-white md:flex-row">
      {/* Left - Auth Form Section */}
      <div className="flex w-full items-center justify-center px-6 py-10 sm:px-10 md:w-1/2">
        <div className="w-full max-w-md">
          <h1 className="mb-8 text-3xl font-semibold text-gray-900">
            Expense Tracker
          </h1>
          {children}
        </div>
      </div>

      {/* Right - Stats & Illustration Section */}
      <div className="bg-primary relative hidden h-full w-full items-center justify-center p-6 md:flex md:w-1/2">
        {/* Decorative Shapes */}
        <div className="bg-primary-dark absolute -top-16 -left-16 h-40 w-40 rounded-[40px] opacity-40 blur-2xl"></div>
        <div className="absolute top-1/3 -right-10 h-52 w-48 rounded-[40px] border-8 border-white opacity-40"></div>
        <div className="bg-primary-dark absolute -bottom-16 -left-10 h-44 w-44 rounded-[40px] opacity-30 blur-2xl"></div>

        {/* Content */}
        <div className="relative z-10 flex w-full max-w-sm flex-col items-center gap-10">
          <StatsInfoCard
            icon={<LuTrendingUpDown />}
            label="Track Your Income & Expenses"
            value="430,000"
            color="bg-white text-primary"
          />

          {/* Illustration with animated float */}
          <div className="animate-float relative w-full max-w-xs rounded-2xl bg-white/30 p-4 shadow-lg backdrop-blur-md">
            <img
              src={sample}
              alt="Illustration"
              className="mx-auto w-full object-contain drop-shadow-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
