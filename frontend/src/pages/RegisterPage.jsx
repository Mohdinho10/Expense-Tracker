import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import Input from "../components/Input";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector";
import { validateEmail } from "../utils/helper";
import {
  useRegisterMutation,
  useGetProfileQuery,
} from "../slices/userApiSlice";
import { toast } from "react-hot-toast";
import { setCredentials } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";

function RegisterPage() {
  const [profilePic, setProfilePic] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: user, isLoading: loadingUser } = useGetProfileQuery();
  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
    if (!loadingUser && user?._id) {
      navigate("/"); // Redirect if already logged in
    }
  }, [user, loadingUser, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!username) return setError("Username is required.");
    if (!validateEmail(email)) return setError("Invalid email.");
    if (password.length < 8)
      return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword)
      return setError("Passwords do not match.");

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      if (profilePic) formData.append("profileImage", profilePic);

      // await register(formData).unwrap();
      const res = await register(formData).unwrap();
      dispatch(setCredentials({ ...res }));

      toast.success("Registered successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      toast.error(err?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout>
      <div className="mt-10 flex h-auto flex-col justify-center md:mt-0 md:h-full lg:w-[100%]">
        <h3 className="text-xl font-semibold text-black">Create an account</h3>
        <p className="mt-[5px] mb-6 text-xs text-slate-700">
          Join us today by entering your details below
        </p>

        <form onSubmit={submitHandler}>
          <ProfilePhotoSelector
            profilePic={profilePic}
            setProfilePic={setProfilePic}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Input
              label="Username"
              placeholder="Enter your username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              hasError={!!error && !username}
            />
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
            <Input
              value={confirmPassword}
              onChange={({ target }) => setConfirmPassword(target.value)}
              label="Confirm Password"
              placeholder="Confirm your password"
              type="password"
              hasError={!!error && password !== confirmPassword}
            />
          </div>

          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
          <button
            type="submit"
            className="btn-primary mt-4"
            disabled={isLoading}
          >
            {isLoading ? <ClipLoader color="white" size={20} /> : "Register"}
          </button>

          <p className="mt-3 text-[13px] text-slate-800">
            Already have an account?{" "}
            <Link to={"/login"} className="text-primary font-medium underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;
