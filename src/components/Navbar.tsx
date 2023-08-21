import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Typography,
} from "@material-tailwind/react";
import routes from "../config/routes";
import Button from "./Button";
import { WeatherAuth } from "../auth/WeatherAuth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudSunRain } from "@fortawesome/free-solid-svg-icons";
import SignIn from "../pages/SignIn";

export default function NavbarFunc() {
  const [isVisible, setIsVisible] = useState(false);

  const weatherAuth = WeatherAuth();

  const signOutOnClick = () => {
    weatherAuth.logout();
  };

  const dropDown = () => {
    setIsVisible(!isVisible);
  };

  const isAuthenticated = !!weatherAuth.user;

  return (
    <Navbar className="lg:py-4 bg-black text-white z-10">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 text-2xl font-medium"
        >
          Weather App
        </Typography>
        <div className="relative ml-auto p-3">
          <button
            onClick={dropDown}
            className="flex items-center px-3 py-2 border rounded hover:text-white hover:border-blue-400"
          >
            <FontAwesomeIcon icon={faCloudSunRain} />
          </button>
          {isVisible && (
            <div className="absolute top-full left-0 bg-black bg-opacity-90 p-4 mt-2 w-50 rounded-lg">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  {routes.map((route) => (
                    <Link
                      key={route.path}
                      to={route.path}
                      className="hover:text-blue-400 hover:border-blue-400"
                    >
                      {route.name}
                    </Link>
                  ))}
                  <Link
                    to="/signin"
                    onClick={signOutOnClick}
                    className="hover:text-blue-400 hover:border-blue-400"
                  >
                    Sign Out
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    to="/"
                    className="hover:text-blue-400 hover:border-blue-400"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Navbar>
  );
}
