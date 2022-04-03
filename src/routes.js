// import
import Dashboard from "views/Dashboard/Dashboard.js";
import Tables from "views/Dashboard/Tables.js";
import Profile from "views/Dashboard/Profile.js";
import Resevation from "views/Dashboard/Reservation";
import Users from "views/Dashboard/Users.js";
import SignIn from "views/Pages/SignIn.js";
import SignUp from "views/Pages/SignUp.js";
import { CalendarIcon } from '@chakra-ui/icons'
import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";

var dashRoutes = [
  /*
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: <HomeIcon color="inherit" />,
    component: Dashboard,
    layout: "/admin",
  },
  */
  {
    path: "/reservations",
    name: "Réservations",
    rtlName: "المريض",
    icon: <CalendarIcon color="inherit" />,
    component: Resevation,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Patient",
    rtlName: "المريض",
    icon: <PersonIcon color="inherit" />,
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/user",
    name: "User",
    rtlName: "المريض",
    icon: <PersonIcon color="inherit" />,
    component: Users,
    layout: "/admin",
  },
  {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="inherit" />,
        component: Profile,
        layout: "/admin",
      },
    
     
];
export default dashRoutes;
