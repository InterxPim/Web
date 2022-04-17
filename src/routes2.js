// import

import Tables from "views/Dashboard/Tables.js";
import Profile from "views/Dashboard/Profile.js";
import Resevation from "views/Dashboard/Reservation";
import Users from "views/Dashboard/Users.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
<<<<<<< HEAD
import ForgetPassword from "views/Pages/ForgetPassword.js";
=======

>>>>>>> 3b8063524ab39ec3bec6f9e78c67302de91aae85
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
<<<<<<< HEAD
        path: "/forgetPasword",
        name: "ForgetPassword",
        rtlName: "لوحة القيادة",
        icon: <DocumentIcon color="inherit" />,
        component: ForgetPassword,
        layout: "/auth",
      },
      {
=======
>>>>>>> 3b8063524ab39ec3bec6f9e78c67302de91aae85
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
