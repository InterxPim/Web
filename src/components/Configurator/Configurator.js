// Chakra Imports

import Axios from "axios";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  FormLabel,
  InputLeftElement,
  InputGroup,
  Input,
  Flex,
  Icon,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
} from "@chakra-ui/react";
import {
  AiOutlineFontColors,
  AiFillPhone,
  AiOutlineEnvironment,
  AiOutlineMail,
  AiTwotoneCalendar
} from "react-icons/ai";
import GitHubButton from "react-github-btn";
import { Separator } from "components/Separator/Separator";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { FaTwitter, FaFacebook } from "react-icons/fa";

export default function Configurator(props) {
  const { secondary, isOpen, onClose, fixed, ...rest } = props;
  const [switched, setSwitched] = useState(props.isChecked);

  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  let fixedDisplay = "flex";
  if (props.secondary) {
    fixedDisplay = "none";
  }

  let bgButton = useColorModeValue(
    "linear-gradient(81.62deg, #313860 2.25%, #151928 79.87%)",
    "white"
  );
  let colorButton = useColorModeValue("white", "gray.700");
  const secondaryButtonBg = useColorModeValue("white", "transparent");
  const secondaryButtonBorder = useColorModeValue("gray.700", "white");
  const secondaryButtonColor = useColorModeValue("gray.700", "white");
  const settingsRef = React.useRef();
  const password = (sessionStorage.getItem("password"));
  const [OldPassword, setOldPassword] = useState("");
  const [NewPassword, setNewPassword] = useState("");


  const handleSubmit = () => {
    if (sessionStorage.getItem("role")=="Admin"){
      if (password==OldPassword&&NewPassword!=0){
        Axios.post("http://172.17.1.223:9091/api/hospital/changePwd", {
          email: sessionStorage.getItem("email"),
          oldPwd:OldPassword,
          newpassword: NewPassword,

        }).then((response) => {
          sessionStorage.setItem("password",NewPassword)
          window.location.reload(false);
        })
        console.log("yes")
      }else {
        console.log("no")
      }
    }else if(sessionStorage.getItem("GroupeSanguine")!=""){
      
      if (password==OldPassword&&NewPassword!=0){
      Axios.post("http://172.17.1.223:9091/api/patient/changePwd", {
        email: sessionStorage.getItem("email"),
        oldPwd:OldPassword,
        newpassword: NewPassword,
      }).then((response) => {
        sessionStorage.setItem("password",NewPassword)
        window.location.reload(false);
      })
      console.log("yes")
    }else {
      console.log("no")
    }}else if(sessionStorage.getItem("role")=="SupAdmin"){
      if (password==OldPassword&&NewPassword!=0){
        Axios.post("http://172.17.1.223:9091/api/admin/changePwd", {
          email: sessionStorage.getItem("email"),
          oldPwd:OldPassword,
          newpassword: NewPassword,

        }).then((response) => {
          sessionStorage.setItem("password",NewPassword)
          window.location.reload(false);
        })
        console.log("yes")
      }else {
        console.log("no")
      }
    }
    



  }
  return (
    <>
      <Drawer
        isOpen={props.isOpen}
        onClose={props.onClose}
        placement={document.documentElement.dir === "rtl" ? "left" : "right"}
        finalFocusRef={settingsRef}
        blockScrollOnMount={false}
      >
        <DrawerContent>
          <DrawerHeader pt="24px" px="24px">
            <DrawerCloseButton />
            <Text fontSize="xl" fontWeight="bold" mt="16px">
            Configuration
            </Text>
            <Text fontSize="md" mb="16px">
              See your dashboard options.
            </Text>
            <Separator />
          </DrawerHeader>
          <DrawerBody w="340px" ps="24px" pe="40px">
            <Flex flexDirection="column">
             
              <Flex
                justifyContent="space-between"
                alignItems="center"
                mb="24px"
              >
                <Text fontSize="md" fontWeight="600" mb="4px">
                  Dark/Light
                </Text>
                <Button onClick={toggleColorMode}>
                   {colorMode === "light" ? "Dark" : "Light"} Mode
                </Button>
              </Flex>

              <Separator />
              <Box mt="24px">
                <Text fontSize="md" fontWeight="600">
                    Change password
                </Text>
                <Text fontSize="sm" mb="16px">
                </Text>
                <Box>
                <form id="form" onSubmit={handleSubmit}>
                <ModalBody pb={2}>
                <FormLabel>Old Password </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineMail color='gray.300' />}
                    />
                    <Input
                      type="password"
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder="Old Password"
                      borderColor="gray.400"
                      focusBorderColor="#1daa3f" />
                  </InputGroup>
                  
                  <FormLabel>New Password </FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineMail color='gray.300' />}
                    />
                    <Input
                      type="Password "
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New Password "
                      borderColor="gray.400"
                      focusBorderColor="#1daa3f" />
                  </InputGroup>
                  </ModalBody>
                  <Button type="submit" bg="#1daa3f"
                  
                  color="white" mr={3}
                  _hover={{
                    bg: "#147a2c",
                  }}
                  _active={{
                    bg: "#1daa3f",
                  }}
                >
                  Valider
                </Button>
                </form>
                </Box>
                <Flex
                  justifyContent="center"
                  alignItems="center"
                  w="100%"
                  mb="16px"
                >
                </Flex>
              </Box>
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
Configurator.propTypes = {
  secondary: PropTypes.bool,
  isOpen: PropTypes.func,
  onClose: PropTypes.func,
  fixed: PropTypes.bool,
};
