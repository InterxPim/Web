// import

import Tables from "views/Dashboard/Tables.js";
import Profile from "views/Dashboard/Profile.js";
import ProfileE from "views/Dashboard/ProfileEmploye.js"
import ProfileP from "views/Dashboard/ProfilePatient.js"
<<<<<<< HEAD

import Resevation from "views/Dashboard/Reservation";
import ResevationP from "views/Dashboard/ReservationP";
import Hospital from "views/Dashboard/Hospitals";
import Users from "views/Dashboard/Users.js";
import PatientsH from "views/Dashboard/PatientH.js";
import UsersSA from "views/Dashboard/UsersSA.js";

=======

import Resevation from "views/Dashboard/Reservation";
import ResevationP from "views/Dashboard/ReservationP";
import Users from "views/Dashboard/Users.js";
>>>>>>> 3b8063524ab39ec3bec6f9e78c67302de91aae85
import { CalendarIcon } from '@chakra-ui/icons'
import { FaSlideshare ,FaRestroom} from "react-icons/fa";
import {
  HomeIcon,
  StatsIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
} from "components/Icons/Icons";
if (sessionStorage.getItem("role")=="Admin")
{var dashRoutes = [
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
<<<<<<< HEAD
    component: PatientsH,
=======
    component: Tables,
>>>>>>> 3b8063524ab39ec3bec6f9e78c67302de91aae85
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
<<<<<<< HEAD
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
=======
}else 
>>>>>>> 3b8063524ab39ec3bec6f9e78c67302de91aae85
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
