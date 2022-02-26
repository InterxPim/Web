// Chakra imports
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Input,
  Link,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "assets/img/BgSignUp.png";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";

function SignUp() {

  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.700", "white");
  const bgColor = useColorModeValue("white", "gray.700");
  const bgIcons = useColorModeValue("teal.200", "rgba(255, 255, 255, 0.5)");

  const history = useHistory();

  const [emailHospital, setEmailHospital] = useState("");
  const [passwordHospital, setPasswordHospital] = useState("");
  const [nomHospital, setNomHospital] = useState("");
  const [addresseHospital, setAddresseHospital] = useState("");
  const [phoneHospital, setPhoneHospital] = useState("");
  const [faxHospital, setFaxHospital] = useState("");
  const register = () => {
    Axios.post("http://localhost:9091/api/hospital/register", {

      emailHospital: emailHospital,
      passwordHospital: passwordHospital,
      nomHospital: nomHospital,
      addresseHospital: addresseHospital,
      phoneHospital: phoneHospital,
      faxHospital: faxHospital,
    }).then((response) => {

      if (!response.data.message) {

        // setLoginStatus( response.data.message);
        if (response.data.role == "Admin") {
          sessionStorage.setItem("emailHospital", response.data.emailHospital)
          sessionStorage.setItem("passwordHospital", response.data.passwordHospital)
          sessionStorage.setItem("nomHospital", response.data.nomHospital)
          sessionStorage.setItem("addresseHospital", response.data.addresseHospital)
          sessionStorage.setItem("phoneHospital", response.data.phoneHospital)
          sessionStorage.setItem("faxHospital", response.data.faxHospital)
          sessionStorage.setItem("id", response.data._id)
          sessionStorage.setItem("role", response.data.role)
          console.log(response);
          history.push("/dashboard");
        }

      } else {
        setLoginStatus(response.data[0].message);

      }
    });
  };






  return (
    <Flex
      direction="column"
      alignSelf="center"
      justifySelf="center"
      overflow="hidden"
    >
      <Box
        position="absolute"
        minH={{ base: "70vh", md: "50vh" }}
        w={{ md: "calc(100vw - 50px)" }}
        borderRadius={{ md: "15px" }}
        left="0"
        right="0"
        bgRepeat="no-repeat"
        overflow="hidden"
        zIndex="-1"
        top="0"
        bgImage={BgSignUp}
        bgSize="cover"
        mx={{ md: "auto" }}
        mt={{ md: "14px" }}
      ></Box>
      <Flex
        direction="column"
        textAlign="center"
        justifyContent="center"
        align="center"
        mt="6.5rem"
        mb="30px"
      >
        <Text fontSize="4xl" color="white" fontWeight="bold">
          Welcome!
        </Text>
        <Text
          fontSize="md"
          color="white"
          fontWeight="normal"
          mt="10px"
          mb="26px"
          w={{ base: "90%", sm: "60%", lg: "40%", xl: "30%" }}
        >
          Use these awesome forms to login or create new account in your project
          for free.
        </Text>
      </Flex>
      <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
        <Flex
          direction="column"
          w="445px"
          background="transparent"
          borderRadius="15px"
          p="40px"
          mx={{ base: "100px" }}
          bg={bgColor}
          boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
        >
          <Text
            fontSize="xl"
            color={textColor}
            fontWeight="bold"
            textAlign="center"
            mb="22px"
          >
            Register
          </Text>

          <FormControl>
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              placeholder="Name Hospital"
              value={nomHospital}
              onChange={(e) => setNomHospital(e.target.value)}
              mb="24px"
              size="lg"
            />
           
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="email"
              value={emailHospital}
              onChange={(e) => setEmailHospital(e.target.value)}
              placeholder="Your email address"
              mb="24px"
              size="lg"
            />
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="text"
              value={addresseHospital}
              onChange={(e) => setAddresseHospital(e.target.value)}
              placeholder="Addresse Hospital"
              mb="24px"
              size="lg"
            />
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="number"
              value={phoneHospital}
              onChange={(e) => setPhoneHospital(e.target.value)}
              placeholder="Hospital Phone "
              mb="24px"
              size="lg"
            />
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="number"
              value={faxHospital}
              onChange={(e) => setFaxHospital(e.target.value)}
              placeholder="Fax Number Hospital"
              mb="24px"
              size="lg"
            />
            <Input
              fontSize="sm"
              ms="4px"
              borderRadius="15px"
              type="password"
              value={passwordHospital}
              onChange={(e) => setPasswordHospital(e.target.value)}
              placeholder="Your password"
              mb="24px"
              size="lg"
            />
            <FormControl display="flex" alignItems="center" mb="24px">
              <Switch id="remember-login" colorScheme="teal" me="10px" />
              <FormLabel htmlFor="remember-login" mb="0" fontWeight="normal">
                Remember me
              </FormLabel>
            </FormControl>
            <Button
              onClick={register}
              type="submit"
              bg="teal.300"
              fontSize="10px"
              color="white"
              fontWeight="bold"
              w="100%"
              h="45"
              mb="24px"
              _hover={{
                bg: "teal.200",
              }}
              _active={{
                bg: "teal.400",
              }}
            >
              SIGN UP
            </Button>
          </FormControl>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            mt="0px"
          >
            <Text color={textColor} fontWeight="medium">
              Already have an account?
              <Link
                color={titleColor}
                as="span"
                ms="5px"
                href="#"
                fontWeight="bold"
              >
                Sign In
              </Link>
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default SignUp;