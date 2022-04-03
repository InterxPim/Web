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

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)


  function addToast() {
    toastIdRef.current = toast({ description: 'some text' })
  }
  const Signup = () => {
    history.push("/auth/signup");
  }
  const login = () => {
    console.log(isMail)
    Axios.post("http://localhost:9091/api/users/login", {

      email: email,

      password: password,
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
          console.log(response);
          history.push("/admin/reservations");
        }

        // sessionStorage.setItem("email",response.data.email)
        // sessionStorage.setItem("firstname",response.data.firstname)



      } else {
       // setLoginStatus(response.data[0].message);
        console.log(isMail)
      }
    });
  };
  const isMail = () => {
    
    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email.match(regex)){
      return true;
    }else{
      
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
              <Heading color={titleColor} fontSize="32px" mb="10px">
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
                
                <Button
                  onClick={login}
                  fontSize="10px"
                  type="submit"
                  bg="teal.300"
                  w="100%"
                  h="45"
                  mb="20px"
                  color="white"
                  mt="20px"
                  _hover={{
                    bg: "teal.200",
                  }}
                  _active={{
                    bg: "teal.400",
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
                  <Link color={titleColor} as="span" ms="5px" fontWeight="bold"
                    onClick={Signup}>
                    Sign Up
                  </Link>
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Box
            display={{ base: "none", md: "block" }}
            overflowX="hidden"
            h="100%"
            w="40vw"
            position="absolute"
            right="0px"
          >
            <Box
              bgImage={signInImage}
              w="100%"
              h="100%"
              bgSize="cover"
              bgPosition="50%"
              position="absolute"
              borderBottomLeftRadius="20px"
            ></Box>
          </Box>
        </Flex>
      </Flex>
     
    </>
  );
}

export default SignIn;
