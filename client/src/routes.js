// src/routes.js
import Admin from "./pages/Admin";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import Services from "./pages/Services";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import { ADMIN_ROUTE, LOGIN_ROUTE, HOME_ROUTE, REGISTRATION_ROUTE, PROFILE_ROUTE, BOOKINGS_ROUTE, SERVICES_ROUTE, ADMIN_BOOKINGS_ROUTE, ADMIN_SERVICES_ROUTE } from "./utils/consts";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: BOOKINGS_ROUTE,
        Component: Bookings
    },
    {
        path: SERVICES_ROUTE,
        Component: Services
    },
    {
        path: ADMIN_BOOKINGS_ROUTE,
        Component: Admin 
    },
    {
        path: ADMIN_SERVICES_ROUTE,
        Component: Admin
    }
];

export const publicRoutes = [
    {
        path: HOME_ROUTE,
        Component: Home
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
];
