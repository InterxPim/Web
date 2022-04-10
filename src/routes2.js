// import

import Tables from "views/Dashboard/Tables.js";
import Profile from "views/Dashboard/Profile.js";
import Resevation from "views/Dashboard/Reservation";
import Users from "views/Dashboard/Users.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";

var dashRoutes = [
      {
        path: "/signin",
        name: "Sign In",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        rtlName: "لوحة القيادة",
        icon: <RocketIcon color="inherit" />,
        secondaryNavbar: false,
        component: SignUp,
        layout: "/auth",
      },
     
];
export default dashRoutes;
