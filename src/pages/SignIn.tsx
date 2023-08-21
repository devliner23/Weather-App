import React from "react";
import { WeatherAuth } from "../auth/WeatherAuth";
import NavbarFunc from "../components/Navbar";
import background from "../assets/background.jpg"

function SignIn() {
  const { user, register, login, logout, setRegisterEmail, setRegisterPassword, setLoginEmail, setLoginPassword } = WeatherAuth();

  return (
    <div className="bg-cover bg-center min-h-screen" style={{ backgroundImage: `url(${background})` }}>
      <NavbarFunc />
      <div className="flex justify-center items-center min-h-screen bg-black bg-opacity-80">
        <div className="max-w-md p-6 bg-white rounded shadow-md">
          {user ? (
            <div className="text-black flex flex-col items-center justify-center h-full">
                <p className="text-xl mb-4">Welcome, {user.email}!</p>
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={logout}>
                    Logout
                </button>
            </div>
          ) : (
            <div className="text-black">
              <h2 className="text-2xl font-semibold mb-4">Register</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 mb-2 rounded border"
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 mb-4 rounded border"
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mb-4" onClick={register}>
                Register
              </button>

              <h2 className="text-2xl font-semibold mb-4">Login</h2>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-3 py-2 mb-2 rounded border"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 mb-4 rounded border"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
              <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full" onClick={login}>
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
