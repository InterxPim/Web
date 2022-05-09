import React, { useState } from "react";
import { useToast } from '@chakra-ui/react'
// Chakra imports
import {
  Box,
  Flex,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Switch,
  Text,
  InputGroup,

  FormErrorMessage,
  FormHelperText,
  InputRightElement,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import { useHistory } from "react-router-dom";
import Axios from "axios";

import signInImage from "assets/img/BgSignUp.png";
function SignIn() {
  // Chakra color mode
  const history = useHistory();
  const titleColor = useColorModeValue("teal.300", "teal.200");
  const textColor = useColorModeValue("gray.400", "white");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast()
  const toastIdRef = React.useRef()
  var md5 = require('md5');
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)


  function addToast() {
    toastIdRef.current = toast({ description: 'some text' })
  }
  const Signup = () => {
    history.push("/auth/signup");
  }
  const ForgetPassword = () => {
    history.push("/auth/forgetPasword");
  }
  const login = () => {
    console.log(isMail)
    Axios.post("https://interxpim.herokuapp.com/api/users/login", {

      email: email,

      password:password,
    }).then((response) => {

      if (!response.data.message) {
        // setLoginStatus( response.data.message);
        if (response.data.role == "Admin" && isMail) {
          sessionStorage.setItem("email", response.data.email)
          sessionStorage.setItem("password", response.data.password)
          sessionStorage.setItem("nomHospital", response.data.nomHospital)
          sessionStorage.setItem("addresseHospital", response.data.addresseHospital)
          sessionStorage.setItem("phoneHospital", response.data.phoneHospital)
          sessionStorage.setItem("faxHospital", response.data.faxHospital)
          sessionStorage.setItem("id", response.data._id)
          sessionStorage.setItem("role", response.data.role)
         // window.location.reload(false);
          console.log(response);
          history.push("/admin/reservations");
          window.location.reload(false);
        }else if (response.data.role=="user"){
          sessionStorage.setItem("email", response.data.email)
          sessionStorage.setItem("password", response.data.password)
          sessionStorage.setItem("firstname", response.data.firstname)
          sessionStorage.setItem("lastname", response.data.lastname)
          sessionStorage.setItem("phone", response.data.phone)
          sessionStorage.setItem("gender", response.data.gender)
          sessionStorage.setItem("id", response.data._id)
          sessionStorage.setItem("age", response.data.age)
          sessionStorage.setItem("situation", response.data.situationF)
          sessionStorage.setItem("role", response.data.role)
          sessionStorage.setItem("hospital",response.data.hospital)
          sessionStorage.setItem("sendsms",response.data.sendsms)
          sessionStorage.setItem("sendemail",response.data.sendemail)
          console.log(response);
          history.push("/admin/reservations");

          window.location.reload(false);
        }else if (response.data.role=="SupAdmin"){
          sessionStorage.setItem("email", response.data.email)
          sessionStorage.setItem("password", response.data.password)
          sessionStorage.setItem("role", response.data.role)
          console.log(response);
          history.push("/admin/reservations");
          window.location.reload(false);
        }
        
        else {
          sessionStorage.setItem("email", response.data.email)
          sessionStorage.setItem("password", response.data.password)
          sessionStorage.setItem("firstname", response.data.firstname)
          sessionStorage.setItem("lastname", response.data.lastname)
          sessionStorage.setItem("phone", response.data.phone)
          sessionStorage.setItem("adresse", response.data.adresse)
          sessionStorage.setItem("id", response.data._id)
          sessionStorage.setItem("birthday", response.data.birthday)
          sessionStorage.setItem("situation", response.data.situationF)
          sessionStorage.setItem("GroupeSanguine", response.data.GroupeSanguine)
          sessionStorage.setItem("sendsms",response.data.sendsms)
          sessionStorage.setItem("sendemail",response.data.sendemail)
         
          console.log(response);
          history.push("/admin/reservations");
          window.location.reload(false);
        }
        

      } else {
       
        console.log(isMail)
      }
    });
  };
  const isMail = () => {

    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email.match(regex)) {
      return true;
    } else {

      return false;
    }
  }

  console.log(isMail)
  return (
    <>
      <Flex position="relative" mb="40px">
        <Flex
          h={{ sm: "initial", md: "75vh", lg: "85vh" }}
          w="100%"
          maxW="1044px"
          mx="auto"
          justifyContent="space-between"
          mb="30px"
          pt={{ sm: "100px", md: "0px" }}
        >
          <Flex
            alignItems="center"
            justifyContent="start"
            style={{ userSelect: "none" }}
            w={{ base: "100%", md: "50%", lg: "42%" }}
          >
            <Flex
              direction="column"
              w="100%"
              background="transparent"

              p="48px"
              mt={{ md: "150px", lg: "80px" }}
            >
              <Heading color="#1daa3f" fontSize="32px" mb="10px">
                Welcome Back
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontWeight="bold"
                fontSize="14px"
              >
                Enter your email and password to sign in
              </Text>
              <FormControl >
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Email
                </FormLabel>
                <Input
                  borderRadius="15px"
                  mb="24px"
                  fontSize="sm"
                  type="text"
                  value={email}
                  borderColor="gray.400"
                  focusBorderColor="#1daa3f"
                 // _hover={"#1daa3f"}
                  //onClick={"#1daa3f"}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email adress"
                  size="lg"
                />
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                  Password
                </FormLabel>
                <InputGroup size='md'>
                  <Input
                    borderRadius="15px"
                    mb="36px"
                    fontSize="sm"
                    type={show ? 'text' : 'password'}
                    value={password}
                    borderColor="gray.400"
                    focusBorderColor="#1daa3f"
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                    size="lg"
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Text color={textColor} fontWeight="medium">
                 
                  <Link color={"#1daa3f"} as="span" ms="5px" fontWeight="bold"
                    onClick={ForgetPassword}>
                    Forget Password ?
                  </Link>
                </Text>
                <Button
                  onClick={login}
                  fontSize="10px"
                  type="submit"
                  bg="#1daa3f"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  _hover={{
                    bg: "#147a2c",
                  }}
                  _active={{
                    bg: "#1daa3f",
                  }}
                >
                  SIGN IN
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
                  Don't have an account?
                  <Link color={"#1daa3f"} as="span" ms="5px" fontWeight="bold"
                    onClick={Signup}>
                    Sign Up
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Box
            display={{ base: "none", md: "block" }}
           
            h="900px"
            w="600px"
            position="absolute"
            right="10px"
            top="200px"
          >
            <Box
              bgImage={signInImage}
              w="500px"
              h="490px"
              bgSize="cover"
              bgPosition="0px"
              borderBottomLeftRadius="20px"
            ></Box>
          </Box>
        </Flex>
      </Flex>

    </>
  );
}

export default SignIn;
