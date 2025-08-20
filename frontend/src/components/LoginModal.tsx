import axios from "axios";
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginModal = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>("");

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "https://auth-backend-1-sk1n.onrender.com/",
        {
          email,
          password,
        }
      );

      if (data.status === "success") {
        localStorage.setItem("name", data.name);
        navigate("/home");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 401) {
          setLoginError("Incorrect password. Please try again.");
        } else if (err.response.status === 403) {
          setLoginError("Your account is locked. Try again later.");
        } else if (err.response.status === 404) {
          setLoginError("Email not found. Please check and try again.");
        } else {
          setLoginError(
            "An unexpected error occurred. Please try again later."
          );
        }
      } else {
        console.error("Error logging in:", err);
        setLoginError("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-blue-100 min-h-screen">
      <div className="bg-yellow-200 p-6 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {loginError && (
          <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded">
            {loginError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              E-mail
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>
            <div className="flex items-center">
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder="Enter Password"
                autoComplete="off"
                name="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                className="ml-2 px-3 py-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              >
                {isPasswordVisible ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md font-medium transition-colors"
          >
            Login
          </button>

          <p className="text-center text-sm mt-2">Don't have an account?</p>
          <Link
            to="/register"
            className="block w-full text-center bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-md transition-colors"
          >
            Register
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
