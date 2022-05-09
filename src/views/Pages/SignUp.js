// Chakra imports
import { Center, Square, Circle } from '@chakra-ui/react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import icon from "./constants";

import {
  Box,
  Button,
  Flex,
  FormControl,
  InputGroup,
  HStack,
  InputRightElement,
  Input,
  Link,
  Switch,
  Text
} from "@chakra-ui/react";
import { PinInput, PinInputField } from '@chakra-ui/react'
// Assets
import BgSignUp from "assets/img/BgSignUpd.png";
import React, { Component } from "react";
//import { useHistory } from "react-router-dom";
import Axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import L from 'leaflet';
import { geolocated } from 'react-geolocated';
import { map } from 'lodash';
class SignUp extends Component {

  constructor(props) {
 
    super(props);
    this.state = {
      value: '',
      size: '',
      modalIsOpen:false,
      modalIsOpen1:false,
      email:"",
      password:"",
      nomHospital:"",
      addresseHospital:"",
      phoneHospital:"",
      faxHospital:"",
      latitude:0.0,
      longitude:0.0

    }
  }
 
  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  }

  closeModal(latitude,longitude) {
    console.log(latitude)
    this.setState({
      modalIsOpen: false,
    });
  }

  openModal1() {
    this.setState({
      modalIsOpen1: true,
    });
  }
  closeModal1() {
    this.setState({
      modalIsOpen1: false,
    });
  }
   Signin() {
     
    this.props.history.push("/auth/signin");
  }
  Dashboard (){
    const conf=sessionStorage.getItem("conf")
    if (this.state.value == conf )
    {
      //history.push("/admin/reservations");
      window.location.reload(false);
    }else 
    {
      // alert("please try again")
    }
  }  
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });

  }
   register = async (event) => {
    //event.preventDefault();
    Axios.post("https://interxpim.herokuapp.com/api/hospital/register", {
      latitude:this.state.latitude,
      longitude:this.state.longitude,
      email: this.state.email,
      password: this.state.password,
      nomHospital: this.state.nomHospital,
      addresseHospital: this.state.addresseHospital,
      phoneHospital: this.state.phoneHospital,
      faxHospital: this.state.faxHospital,
    }).then((response) => {

      if (!response.data.message) {
        this.openModal1()
        // setLoginStatus( response.data.message);
        if (response.data.role == "Admin") {
          sessionStorage.setItem("email", response.data.email)
          sessionStorage.setItem("password", response.data.password)
          sessionStorage.setItem("nomHospital", response.data.nomHospital)
          sessionStorage.setItem("addresseHospital", response.data.addresseHospital)
          sessionStorage.setItem("phoneHospital", response.data.phoneHospital)
          sessionStorage.setItem("faxHospital", response.data.faxHospital)
          sessionStorage.setItem("id", response.data._id)
          sessionStorage.setItem("role", response.data.role)
          sessionStorage.setItem("conf", response.data.conf)
         
          console.log(response);
          //
          this.props.history.push("/admin/reservations");
         
        }

      } else {
        // setLoginStatus(response.data[0].message);

      }
    });
  }
  state = { map: null };

  componentDidUpdate(prevProps, prevState) {
    const { map } = this.state;
    if (prevState.map !== map && map) {
      
      map.on("click", function (e) {
      
        console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
        this.setState({latitude:e.latlng.lat,
          longitude:e.latlng.lng
        })
      
      }.bind(this));
    }
  }
  render() {
    
    const DEFAULT_LATITUDE = 36.89857107033524;
    const DEFAULT_LONGITUDE = 10.189760711095621;
    const latitude = this.props.coords ? this.props.coords.latitude : DEFAULT_LATITUDE;
    const longitude = this.props.coords ? this.props.coords.longitude : DEFAULT_LONGITUDE;


  return (
    <>
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
       
        </Flex>
        <Flex alignItems="center" justifyContent="center" mb="60px" mt="20px">
          <Flex
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            bg="white"
            boxShadow="0 20px 27px 0 rgb(0 0 0 / 5%)"
          >
            <Text
              fontSize="xl"
              color="gray.700"
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
               value={this.state.nomHospital}
                borderColor="gray.400"
                focusBorderColor="#1daa3f"
                onChange={(event) => this.handleChange(event, "nomHospital")}
                mb="24px"
                size="lg"
              />

              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="email"
                value={this.state.email}
                borderColor="gray.400"
                focusBorderColor="#1daa3f"
                onChange={(event) => this.handleChange(event, "email")}
                placeholder="Your email address"
                mb="24px"
                size="lg"
              />
             <InputGroup size='md'>
              <Input
              disabled
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                value={
                  this.state.latitude ? 'Ajouté' : 'Non Ajouté'
                }
                borderColor="gray.400"
                focusBorderColor="#1daa3f"
  
                placeholder="Addresse Hospital"
                mb="24px"
                size="lg"
              />
              <InputRightElement width='4.5rem'>
                    <Button h='1.75rem' size='sm'    onClick={() => {this.openModal()}}>
                    Choisissez
                    </Button>
                  </InputRightElement>
              </InputGroup>
              <Input
              
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="text"
                value={this.state.addresseHospital}
                borderColor="gray.400"
                focusBorderColor="#1daa3f"
                onChange={(event) => this.handleChange(event, "addresseHospital")}
                placeholder="Addresse Hospital"
                mb="24px"
                size="lg"
              />
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="number"
                value={this.state.phoneHospital}
                borderColor="gray.400"
                focusBorderColor="#1daa3f"
                onChange={(event) => this.handleChange(event, "phoneHospital")}
                placeholder="Hospital Phone "
                mb="24px"
                size="lg"
              />
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="number"
                value={this.state.faxHospital}
                borderColor="gray.400"
                focusBorderColor="#1daa3f"
                onChange={(event) => this.handleChange(event, "faxHospital")}
                placeholder="Fax Number Hospital"
                mb="24px"
                size="lg"
              />
              <Input
                fontSize="sm"
                ms="4px"
                borderRadius="15px"
                type="password"
                value={this.state.password}
                borderColor="gray.400"
                focusBorderColor="#1daa3f"
                onChange={(event) => this.handleChange(event, "password")}
                placeholder="Your password"
                mb="24px"
                size="lg"
              />
              
              <Button
               onClick={() => {this.register()}}
                type="submit"
                bg="#1daa3f"
                fontSize="10px"
                color="white"
                fontWeight="bold"
                w="100%"
                h="45"
                mb="24px"
                _hover={{
                  bg: "#147a2c",
                }}
                _active={{
                  bg: "#1daa3f",
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
              <Text color="gray.700" fontWeight="medium">
                Already have an account?
                <Link
                  
                  as="span"
                  ms="5px"
                  href="#"
                  fontWeight="bold"
                  onClick={() => {this.Signin()}}
                  color={"#1daa3f"}
                >
                  Sign In
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Modal
     
        isOpen={this.state.modalIsOpen}
        onClose={() => { this.closeModal() }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Choisissez votre addresse</ModalHeader>
          <ModalCloseButton />
          <ModalBody  >
            <Center
            
            >
                     <MapContainer
                     
                     className="leaflet-map"
        center={[latitude, longitude]}
        zoom={15}
        scrollWheelZoom={true}
        style={{ height: "60vh" ,width:"100vh"}}
        whenReady={(map) =>  this.setState({map:map.target})}
        //  whenCreated={(map) => console.log(map)}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker   position={[this.state.latitude, this.state.longitude]} icon={icon}>

        </Marker>
      </MapContainer>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {this.closeModal(latitude,longitude)}}>
              Confirmer
            </Button>
            <Button  onClick={() => {this.closeModal()}}>Annuler</Button>
          </ModalFooter>
        
        </ModalContent>
        
      </Modal>

      <Modal
            isOpen={this.state.modalIsOpen1}
            onClose={() => { this.closeModal1() }}
      
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Center
            >
              <HStack >
                <PinInput  mask onChange={(event) => this.handleChange(event, "value")}
>
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                  <PinInputField />
                </PinInput>
              </HStack>
            </Center>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {this.Dashboard()}}>
              Save
            </Button>
            <Button  onClick={() => {this.closeModal1()}}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
}  
export default SignUp;
