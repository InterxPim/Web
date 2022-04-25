// import

import Tables from "views/Dashboard/Tables.js";
import Profile from "views/Dashboard/Profile.js";
import ProfileE from "views/Dashboard/ProfileEmploye.js"
import ProfileP from "views/Dashboard/ProfilePatient.js"

import Resevation from "views/Dashboard/Reservation";
import ResevationP from "views/Dashboard/ReservationP";
import Hospital from "views/Dashboard/Hospitals";
import Users from "views/Dashboard/Users.js";
import PatientsH from "views/Dashboard/PatientH.js";
import UsersSA from "views/Dashboard/UsersSA.js";

import { CalendarIcon } from '@chakra-ui/icons'
import { FaSlideshare ,FaRestroom} from "react-icons/fa";
import{ImStatsDots} from "react-icons/im";
import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";
import Dashboard from "views/Dashboard/Dashboard";
if (sessionStorage.getItem("role")=="Admin")
{var dashRoutes = [
  {
    path: "/dashboard",
    name: "Statistique",
    rtlName: "المريض",
    icon: <ImStatsDots color="#1daa3f" />,
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/reservations",
    name: "Réservations",
    rtlName: "المريض",
    icon: <CalendarIcon color="#1daa3f" />,
    component: Resevation,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Patient",
    rtlName: "المريض",
    icon: <FaRestroom color="#1daa3f" />,
    component: PatientsH,
    layout: "/admin",
  },
  
  {
    path: "/user",
    name: "User",
    rtlName: "المريض",
    icon: <FaSlideshare color="#1daa3f" />,
    component: Users,
    layout: "/admin",
  },
  {
        path: "/profile",
        name: "Profile",
        rtlName: "لوحة القيادة",
        icon: <PersonIcon color="#1daa3f" />,
        component: Profile,
        layout: "/admin",
      },
    
     
];}
else if (sessionStorage.getItem("role")=="user"){
  var dashRoutes = [
    {
      path: "/reservations",
      name: "Réservations",
      rtlName: "المريض",
      icon: <CalendarIcon color="#1daa3f" />,
      component: Resevation,
      layout: "/admin",
    },
    {
      path: "/tables",
      name: "Patient",
      rtlName: "المريض",
      icon: <FaRestroom color="#1daa3f" />,
      component: Tables,
      layout: "/admin",
    },
    {
          path: "/profile",
          name: "Profile",
          rtlName: "لوحة القيادة",
          icon: <PersonIcon color="#1daa3f" />,
          component: ProfileE,
          layout: "/admin",
        },
      
       
  ];
}else if (sessionStorage.getItem("role")=="SupAdmin")
{
  var dashRoutes = [
    {
      path: "/reservations",
      name: "Réservations",
      rtlName: "المريض",
      icon: <CalendarIcon color="#1daa3f" />,
      component: Resevation,
      layout: "/admin",
    },
    {
      path: "/hospital",
      name: "Hospitals",
      rtlName: "المريض",
      icon: <CalendarIcon color="#1daa3f" />,
      component: Hospital,
      layout: "/admin",
    },
    {
      path: "/tables",
      name: "Patient",
      rtlName: "المريض",
      icon: <FaRestroom color="#1daa3f" />,
      component: Tables,
      layout: "/admin",
    },
    
    {
      path: "/user",
      name: "User",
      rtlName: "المريض",
      icon: <FaSlideshare color="#1daa3f" />,
      component: UsersSA,
      layout: "/admin",
    },
    
      
       
  ];
}

else 
{
  var dashRoutes = [
    {
      path: "/reservations",
      name: "Réservations",
      rtlName: "المريض",
      icon: <CalendarIcon color="#1daa3f" />,
      component: ResevationP,
      layout: "/admin",
    },
    {
          path: "/profile",
          name: "Profile",
          rtlName: "لوحة القيادة",
          icon: <PersonIcon color="#1daa3f" />,
          component: ProfileP,
          layout: "/admin",
        },
      
       
  ];
}

export default dashRoutes;
