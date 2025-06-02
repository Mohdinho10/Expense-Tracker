import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import { validateEmail } from "../utils/helper";
import { useLoginMutation } from "../slices/userApiSlice";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setCredentials } from "../slices/authSlice";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    if (validateEmail(email) && password.length >= 8) {
      setError("");
    }
  }, [email, password]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!validateEmail(email) || password.length < 8) {
      setError("Please enter a valid email and password (min 8 characters)");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials(res));
      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Login failed.");
    }
  };

  return (
    <AuthLayout>
      <div className="flex h-3/4 flex-col justify-center md:h-full lg:w-[70%]">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="mt-[5px] mb-6 text-xs text-slate-700">Please login</p>

        <form onSubmit={submitHandler}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="example@gmail.com"
            type="email"
            hasError={!!error && !validateEmail(email)}
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 characters"
            type="password"
            hasError={!!error && password.length < 8}
          />

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
          <p className="mt-3 text-[13px] text-slate-800">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary font-medium underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;
