import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import { WeatherAuth } from '../auth/WeatherAuth';
import SignIn from '../pages/SignIn';

interface RouteType {
    path: string,
    component: () => JSX.Element | null ,
    name: string,
}

const routes: RouteType[] = [
    {
      path: "/",
      component: Home,
      name: "Home",
    },
    {
      path: "/dashboard",
      component: Dashboard,
      name: "Dashboard",
    },
    {
      path: "/signin",
      component: SignIn,
      name: "Sign-In",
    }
];

export default routes