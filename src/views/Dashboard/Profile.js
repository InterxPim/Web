import React  , { useState}  from "react";
// Chakra imports
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Flex,
  Grid,
  FormControl,
  FormLabel,
  Input,
  Icon,
  Image,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom";
// Custom components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";

// Assets
import avatar2 from "assets/img/avatars/avatar2.png";
import avatar3 from "assets/img/avatars/avatar3.png";
import avatar4 from "assets/img/avatars/avatar4.png";
import avatar5 from "assets/img/avatars/avatar5.png";
import avatar6 from "assets/img/avatars/avatar6.png";
import ImageArchitect1 from "assets/img/ImageArchitect1.png";
import ImageArchitect2 from "assets/img/ImageArchitect2.png";
import ImageArchitect3 from "assets/img/ImageArchitect3.png";
import ProfileBgImage from "assets/img/ProfileBackground.png";
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,
  FaTwitter,
} from "react-icons/fa";
import { IoDocumentsSharp } from "react-icons/io5";
import { servicesVersion } from "typescript";
import { add } from "lodash";
import Axios from "axios";
function Profile() {
  // Chakra color mode
  const textColor = useColorModeValue("gray.700", "white");
  const bgProfile = useColorModeValue(
    "hsla(0,0%,100%,.8)",
    "linear-gradient(112.83deg, rgba(255, 255, 255, 0.21) 0%, rgba(255, 255, 255, 0) 110.84%)"
  );
  const borderProfileColor = useColorModeValue(
    "white",
    "rgba(255, 255, 255, 0.31)"
  );
  const emailColor = useColorModeValue("gray.400", "gray.300");
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [nomHospital, setNomHospital] = useState("");
  const [addresseHospital, setAddresseHospital] = useState("");
  const [phoneHospital, setPhoneHospital] = useState("");
  const [faxHospital, setFaxHospital] = useState("");
  
  const Name = sessionStorage.getItem("nomHospital")
  const emailH = sessionStorage.getItem("email")
  const Addresse = sessionStorage.getItem("addresseHospital")
  const Phone = sessionStorage.getItem("phoneHospital")
  const Fix = sessionStorage.getItem("faxHospital")
  const id = sessionStorage.getItem("id")
  const update = () => {
    Axios.post("https://interxpim.herokuapp.com/api/hospital/update", {
      _id:id,
      email: email,
      nomHospital:nomHospital,
      addresseHospital:addresseHospital,
      phoneHospital:phoneHospital,
      faxHospital:faxHospital,
    }).then((response) => {
      
       if (!response.data.message) {
        
         // setLoginStatus( response.data.message);
          if (response.data.role=="Admin")
          {
            sessionStorage.setItem("email",email)
            //sessionStorage.setItem("password",response.data.password)
            sessionStorage.setItem("nomHospital",nomHospital)
            sessionStorage.setItem("addresseHospital",addresseHospital)
            sessionStorage.setItem("phoneHospital",phoneHospital)
            sessionStorage.setItem("faxHospital",faxHospital)
            sessionStorage.setItem("id",response.data._id)
            sessionStorage.setItem("role",response.data.role)
            console.log(response);
        history.push("/admin/profile");
        window.location.reload(false);
          }
         
         // sessionStorage.setItem("email",response.data.email)
         // sessionStorage.setItem("firstname",response.data.firstname)

          
     
        
       } else {
          setLoginStatus (response.data[0].message);
          
       }
    });
    };
    function handleSubmit(event) {
      event.preventDefault();
     // event.login(email , password)
    }
  return (
    <Flex direction="column">
      <Box
        mb={{ sm: "205px", md: "75px", xl: "70px" }}
        borderRadius="15px"
        px="0px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        align="center"
      >
        <Box
          
          w="100%"
          h="300px"
          borderRadius="25px"
          bgPosition="50%"
          bgRepeat="no-repeat"
          position="relative"
          display="flex"
          justifyContent="center"
        >
          <Flex
            direction={{ sm: "column", md: "row" }}
            mx="1.5rem"
            maxH="330px"
            w={{ sm: "90%", xl: "95%" }}
            justifyContent={{ sm: "center", md: "space-between" }}
            align="center"
            backdropFilter="saturate(200%) blur(50px)"
            position="absolute"
            boxShadow="0px 2px 5.5px rgba(0, 0, 0, 0.02)"
            border="2px solid"
            borderColor={borderProfileColor}
            bg={bgProfile}
            p="24px"
            borderRadius="20px"
            transform={{
              sm: "translateY(45%)",
              md: "translateY(110%)",
              lg: "translateY(160%)",
            }}
          >
            <Flex
              align="center"
              mb={{ sm: "10px", md: "0px" }}
              direction={{ sm: "column", md: "row" }}
              w={{ sm: "100%" }}
              textAlign={{ sm: "center", md: "start" }}
            >
              <Avatar
                me={{ md: "22px" }}
               
                w="80px"
                h="80px"
                borderRadius="15px"
              />
              <Flex direction="column" maxWidth="100%" my={{ sm: "14px" }}>
                <Text
                  fontSize={{ sm: "lg", lg: "xl" }}
                  color={textColor}
                  fontWeight="bold"
                  ms={{ sm: "8px", md: "0px" }}
                >
                  {Name}
                </Text>
                <Text
                  fontSize={{ sm: "sm", md: "md" }}
                  color={emailColor}
                  fontWeight="semibold"
                >
                 {emailH}
                </Text>
              </Flex>
            </Flex>
            <Flex
              direction={{ sm: "column", lg: "row" }}
              w={{ sm: "100%", md: "50%", lg: "auto" }}
            >
              
            </Flex>
          </Flex>
        </Box>
      </Box>
      <Grid templateColumns={{ sm: "1fr", xl: "repeat(2, 1fr)" }} gap="30px">
        
        <Card p="20px" ml={{ sm: "50px", xl: "0px" }}>
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Profile Information
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column">
              
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Full Name:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  {Name}
                </Text>
              </Flex>
              
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Email:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  {emailH}
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Location:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  {Addresse}
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Mobile:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  {Phone}
                </Text>
              </Flex>
              <Flex align="center" mb="18px">
                <Text
                  fontSize="md"
                  color={textColor}
                  fontWeight="bold"
                  me="10px"
                >
                  Fix:{" "}
                </Text>
                <Text fontSize="md" color="gray.500" fontWeight="400">
                  {Fix}
                </Text>
              </Flex>
            </Flex>
          </CardBody>
        </Card>
        <Card p="16px">
          <CardHeader p="12px 5px" mb="12px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Modify
            </Text>
          </CardHeader>
          <CardBody px="5px">
            <Flex direction="column" w="100%">
            <FormControl>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="hospital name "
              
              value={nomHospital}
                onChange={(e) => setNomHospital(e.target.value)}
              mb="24px"
              size="lg"
            />
              <Input
                borderRadius="15px"
                mb="24px"
                fontSize="sm"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email adress"
                size="lg"
               
              />
              <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="hospital adresse "
              value={addresseHospital}
                onChange={(e) => setAddresseHospital(e.target.value)}
              mb="24px"
              size="lg"
            />
             <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="hospital phone "
              value={phoneHospital}
                onChange={(e) => setPhoneHospital(e.target.value)}
              mb="24px"
              size="lg"
            />
             <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="hospital fax "
              value={faxHospital}
                onChange={(e) => setFaxHospital(e.target.value)}
              mb="24px"
              size="lg"
            />
             
              </FormControl>

              <Button p="0px" bg="transparent" onClick={update} >
                <Flex

                  align="center"
                  w={{ lg: "135px" }}
                  borderRadius="15px"
                  justifyContent="center"
                  py="10px"
                  cursor="pointer"
                >
                  <Icon as={FaPenFancy} me="6px" />
                  <Text fontSize="xs" color={textColor} fontWeight="bold">
                    Modify
                  </Text>
                </Flex>
              </Button>             
            </Flex>
          </CardBody>
        </Card>
      </Grid>
    </Flex>
  );
}

export default Profile;
