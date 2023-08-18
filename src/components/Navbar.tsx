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


 
export default function NavbarFunc() {
    const [isVisible, setIsVisible] = useState(false)

    const weatherAuth = WeatherAuth();

    const signOutOnClick = () => {
        weatherAuth.logout();
    }

    const dropDown = () => {
        setIsVisible(!isVisible)
    }
 
  useEffect(() => {
    window.addEventListener("resize", () => window.innerWidth >= 960 && setIsVisible(false));
  }, []);
 
  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      {routes.map((route) => (
        <Typography
          key={route.path}
          as="li"
          variant="small"

          >
          <Link to={route.path} className="flex items-center hover:text-blue-400 hover:border-blue-400">
            {route.name}
          </Link>
        </Typography>
      ))}
    </ul>
  );

  const isAuthenticated = !!weatherAuth.user;


 
  return (
    <Navbar className="lg:py-4 bg-black text-white" >
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="#"
          className="mr-4 cursor-pointer py-1.5 text-2xl font-medium"
        >
          Weather App
        </Typography>
        <div className='relative ml-auto p-3'>
            <button onClick={dropDown} className='flex items-center px-3 py-2 border rounded hover:text-white hover:border-blue-400'>
            <FontAwesomeIcon icon={faCloudSunRain} />
            </button>
        </div>
        { isVisible ? ( 
            <div className="hidden lg:block">
                {
                            !isAuthenticated ? 
                            <Button className='flex items-center hover:text-blue-400 hover:border-blue-400'>
                                <div>
                                    <Link to="/" className='flex place-items-center mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white'>
                                        Login
                                    </Link>
                                </div>
                            </Button>
                            :
                            <Button className='flex items-center hover:text-blue-400 hover:border-blue-400'>
                                <div className="flex place-items-center mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white">
                                  {navList}
                                    <Link to="/" onClick={signOutOnClick} className=''>
                                        Sign Out
                                    </Link>
                                </div>
                            </Button>
                        }    
            </div>
        ) : (
        <></>
        ) }
        </div>
    </Navbar>
  );
}