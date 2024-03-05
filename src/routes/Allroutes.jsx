import axios from "axios";
import CarDetails from "../Pages/CarDetails";
import CarView from "../Pages/CarView";
import Dashboard from "../Pages/Dashboard";
import Forget from "../Pages/Forget";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
// import Profile from "../Pages/Profile";
import Register from "../Pages/Register";
import Reset from "../Pages/RessetPassword";
import SingleUserDetails from "../Pages/SingleUserDetails";
import UserDetails from "../Pages/UserDetails";
import UpdateCars from "../Pages/UpdateCars";


const AllRoutes = [
  {
    name: "Login",
    path: "/",
    private: false,
    element: Login,
  },
  {
    name: "Forgt_email",
    path: "/forget-email",
    private: false,
    element: Forget,
  },
  {
    name: "Reset_password",
    path: "/reset-password/:user_id",
    private: false,
    element: Reset,
  },
  {
    name: "Register",
    path: "/register",
    private: false,
    element: Register,
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    private: true,
    element: Dashboard,
  },
  {
    name: "CarDetails",
    path: "/car-details",
    private: true,
    element: CarDetails,
  },
  {
    name: "CarView",
    path: "/car-views/:_id",
    private: true,
    element: CarView,
  },
  {
    name: "SingleuserView",
    path: `/car/qr-code/:_id`,
    private: true,
    element: SingleUserDetails,
  },
  {
    name: "userDetails",
    path: "/user-details",
    private: true,
    element: UserDetails,
  },
  {
    name: "Profile",
    path: "/profile",
    private: true,
    element: Profile ,
  },
  {
    name: "UpdateCar",
    path: "/update-car/:_id",
    private: true,
    element: UpdateCars ,
  },
];
export default AllRoutes;
