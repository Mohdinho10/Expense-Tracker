import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

function Input({
  value,
  onChange,
  label,
  placeholder,
  type = "text",
  hasError = false,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="mb-4">
      <label htmlFor="" className="text-[13px] text-slate-800">
        {label}
      </label>
      <div
        className={`input-box flex items-center gap-2 rounded-md border px-3 py-2 ${
          hasError ? "border-red-500" : "border-slate-300"
        }`}
      >
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          className="w-full bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400"
          value={value}
          onChange={(e) => onChange(e)} // ✅ fix typo (was `onchange`)
          placeholder={placeholder}
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={20}
                className="text-primary cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={20}
                className="cursor-pointer text-slate-400"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Input;
