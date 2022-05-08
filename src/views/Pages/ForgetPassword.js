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

  const toast = useToast()
  const toastIdRef = React.useRef()

  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  const Signup = () => {
    history.push("/auth/signup");
  }
  const   Signin = () => {
    history.push("/auth/signin ");
  }
 
  const isMail = () => {

    let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (email.match(regex)) {
      return true;
    } else {

      return false;
    }
  }
  
  const [email, setEmail] = useState("");
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");
  const handleSubmit = () => {
    if (OldPassword!=0&&NewPassword!=0){
      Axios.post("http://172.17.1.223:9091/api/patient/changePwd", {
        email: email,
        oldPwd:OldPassword,
        newpassword: NewPassword,
      }).then((response) => {
        window.location.reload(false);
      })
      console.log("yes")
    }else {
      console.log("no")
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
              Forget Password ?
              </Heading>
              <Text
                mb="36px"
                ms="4px"
                color={textColor}
                fontWeight="bold"
                fontSize="14px"
              >
                
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
                   Old Password
                </FormLabel>
                <InputGroup size='md'>
                  <Input
                    borderRadius="15px"
                    mb="36px"
                    fontSize="sm"
                    type={show ? 'text' : 'password'}
                    value={OldPassword}
                    borderColor="gray.400"
                    focusBorderColor="#1daa3f"
                    onChange={(e) => setOldPassword(e.target.value)}
                    placeholder="Your Old password"
                    size="lg"
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormLabel ms="4px" fontSize="sm" fontWeight="normal">
                 New Password
                </FormLabel>
                <InputGroup size='md'>
                  <Input
                    borderRadius="15px"
                    mb="36px"
                    fontSize="sm"
                    type={show ? 'text' : 'password'}
                    value={NewPassword}
                    borderColor="gray.400"
                    focusBorderColor="#1daa3f"
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Your New password"
                    size="lg"
                  />
                  <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm' onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <Button
                  onClick={handleSubmit}
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
                  CHANGE
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
                  <Flex
                justifyContent="center"
                alignItems="center"
                maxW="100%"
                mt="0px"
              >
                  Or 
                  <Link color={"#1daa3f"} as="span" ms="5px" fontWeight="bold"
                    onClick={Signin}>
                    Sign In
                  </Link>
                  </Flex>
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
