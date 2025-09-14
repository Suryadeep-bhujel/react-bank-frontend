import React from "react";
import { useContactForm } from "../Login";
const Login: React.FC = () => {
  const { formData, handleChange, handleSubmit } = useContactForm();
  return (
    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
      <div className="flex justify-center-safe">
        <h1 className="max mx-auto max-w-2xl text-3xl ">Login</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label className="block text-lg font-large text-gray-900 pt-5">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-lg font-large text-gray-900 pt-5">
            Password
          </label>
          <input
            name="password"
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-sky-600 cursor-pointer text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors mt-4"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
