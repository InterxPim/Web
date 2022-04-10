import React, { useState } from "react";
import { BellIcon, SearchIcon, PhoneIcon, AtSignIcon, CalendarIcon } from "@chakra-ui/icons";
import axios from 'axios';
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Icon,
  Button,

  InputGroup,
  Select,
  IconButton,
  InputLeftElement,
} from "@chakra-ui/react";
import {
  FaCube,
  FaFacebook,
  FaInstagram,
  FaPenFancy,
  FaPlus,


  FaTwitter,
} from "react-icons/fa";
import {
  AiOutlineFontColors,
  AiFillPhone,
  AiOutlineEnvironment,
  AiOutlineMail,
  AiTwotoneCalendar
} from "react-icons/ai";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react"
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TablesTableRow from "components/Tables/TablePatient";


class Patients extends React.Component {


  componentDidMount() {
    axios.get(`http://localhost:9091/api/reservations/allReser`)
      .then(res => {
        const resdataR = res.data;
        this.setState({ resdataR });
      })
     
    axios.get(`http://localhost:9091/api/patient/all`)
      .then(res => {

        const resdataP = res.data;
        this.setState({ resdataP });
      })

  }
  constructor() {
    super()

    this.state = {
      firstname: '',
      lastname: '',
      phone: '',
      email: '',
      birthday: '',
      adresse: '',
      situationF: '',
      GroupeSanguine: '',
      password: '',
      search: '',
      hospital: '',
      sendsms: false,
      sendemail: false,
      modalIsOpen: false,
      resdataR: [],
      resdataP: [],
      liste: [],
      l: [],
      la: [],
    }
  }
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
    if (field == "sendemail") {
      this.state.sendemail = evt.target.checked
      this.setState({sendemail:evt.target.checked})
      console.log(this.state.email)
     // let isChecked = e.target.checked;
    }
    if (field == "sendsms")
    {
      this.state.sendsms = evt.target.checked
      this.setState({sendsms:evt.target.checked})
      console.log(this.state.sendsms)
    }

  }
  handleSubmit = async (event) => {

    event.preventDefault();
    const patient = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      email: this.state.email,
      birthday: this.state.birthday,
      adresse: this.state.adresse,
      password: this.state.password,
      situationF: this.state.situationF,
      GroupeSanguine: this.state.GroupeSanguine,
      sendemail :this.state.sendemail,
      sendsms : this.state.sendsms,
      //hospital: sessionStorage.getItem("id")
    }
    const reservation = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      date: this.state.date,
      heure: this.state.heure,
      hospital: this.state.hospital,
      user: this.state.user,
    }
    axios.post("http://localhost:9091/api/patient/registerWeb", patient)
      .then(res => {
        //alert(user.firstname)
        window.location.reload(false);
      }).catch(error => {
        alert("Remplissez tous les champs!");

      })
  }
  openModal() {
    this.setState({
      modalIsOpen: true,
    });
    //alert(this.state.search)

  }

  closeModal() {
    this.setState({
      modalIsOpen: false,

    });
  }
  render() {

  

    this.state.resdataR.forEach(elementr => {
      this.state.resdataP.forEach(element => {
        if (elementr.hospital == sessionStorage.getItem("id") && element._id == elementr.user) {
          this.state.l.push(element)
          this.state.la = Array.from(new Set(this.state.l))
          // console.log(Array.from(new Set(this.state.l)))


        }else if (sessionStorage.getItem("hospital")==elementr.hospital && element._id == elementr.user)
        {
          this.state.l.push(element)
          this.state.la = Array.from(new Set(this.state.l))
        }
      })

    })


    return (
      <>
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
          <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p="6px 0px 22px 0px">
              <Flex justify="space-between" align="center" mb="1rem" w="100%">
                <Text fontSize="xl" color={"gray.700"} fontWeight="bold">
                  Liste des patients
                </Text>
                <Button
                  colorScheme="#1daa3f"
                  borderColor="#1daa3f"
                  color="#1daa3f"
                  variant="outline"
                  fontSize="xs"
                  p="8px 32px"
                  onClick={() => { this.openModal() }}
                >
                  <Icon as={FaPlus} me="6px" />
                  Ajouter un patient
                </Button>
              </Flex>
            </CardHeader>

            <CardBody>
              <Table variant="simple" color={"gray.700"}>
                <Thead>
                  <Tr my=".8rem" pl="0px" color="gray.400">
                    <Th pl="0px" color="gray.400">
                      Patient
                    </Th>
                    <Th color="gray.400">Phone</Th>
                    <Th color="gray.400">Addresse</Th>

                    <Th color="gray.400">Groupe Sanguine</Th>
                    <Th color="gray.400">Situation Familialle</Th>
                    <Th color="gray.400f">Action</Th>

                  </Tr>
                </Thead>

                <Tbody>

                  {
                    this.state.la.map((roww) => {



                      return (
                        <TablesTableRow
                          id={roww._id}
                          firstname={roww.firstname}
                          lastname={roww.lastname}
                          email={roww.email}
                          birthday={roww.birthday}
                          phone={roww.phone}
                          adresse={roww.adresse}
                          GroupeSanguine={roww.GroupeSanguine}
                          situationF={roww.situationF}

                        />
                      )


                    }
                    )


                  }

                </Tbody>
              </Table>
            </CardBody>
          </Card>
          <Card
            my="22px"
            overflowX={{ sm: "scroll", xl: "hidden" }}
          >


          </Card>
        </Flex>
        <Modal
          isOpen={this.state.modalIsOpen}
          onClose={() => { this.closeModal() }}

        >
          <ModalOverlay />
          <ModalContent>

            <form id="form" onSubmit={this.handleSubmit}>
              <ModalHeader>Ajouter un patient</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={8}>
                <FormControl>
                  <FormLabel>Prénom & Nom</FormLabel>
                  <Flex
                    direction={{ sm: "column", md: "row" }}
                    align="center"
                    w="100%"
                    justify="center"
                    py="1rem"
                    padding="2px"

                  >


                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<AiOutlineFontColors color='gray.300' />}
                      />

                      <Input
                        onChange={(event) => this.handleChange(event, "firstname")}
                        placeholder="Prénom"
                        borderColor="gray.400"
                        focusBorderColor="#1daa3f"
                      />
                    </InputGroup>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<AiOutlineFontColors color='gray.300' />}
                      />
                      <Input
                        onChange={(event) => this.handleChange(event, "lastname")}
                        placeholder="Nom"
                        borderColor="gray.400"
                        focusBorderColor="#1daa3f"
                      />
                    </InputGroup>
                  </Flex>


                  <FormLabel>Téléphone</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiFillPhone color='gray.300' />}
                    />
                    <Input
                      onChange={(event) => this.handleChange(event, "phone")}
                      placeholder="Téléphone"
                      borderColor="gray.400"
                      focusBorderColor="#1daa3f"
                    />
                  </InputGroup>
                  <FormLabel>Email</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineMail color='gray.300' />}
                    />
                    <Input
                      type="email"
                      onChange={(event) => this.handleChange(event, "email")}
                      placeholder="email"
                      borderColor="gray.400"
                      focusBorderColor="#1daa3f"
                    />
                  </InputGroup>


                  <FormLabel>birthday</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiTwotoneCalendar color='gray.300' />}
                    />
                    <Input
                    type="date"
                      onChange={(event) => this.handleChange(event, "birthday")}
                      placeholder="birthday"
                      borderColor="gray.400"
                      focusBorderColor="#1daa3f" />
                  </InputGroup>
                  <FormLabel>Adresse</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineEnvironment color='gray.300' />}
                    />
                    <Input
                      onChange={(event) => this.handleChange(event, "adresse")}
                      placeholder="adresse"
                      borderColor="gray.400"
                      focusBorderColor="#1daa3f"
                    />
                  </InputGroup>
                  <Flex
                    direction={{ sm: "column", md: "row" }}
                    align="center"
                    w="100%"
                    justify="center"
                    py="1rem"
                    padding="2px"
                  >
                    <FormLabel></FormLabel>

                  </Flex>
                  <Flex
                    direction={{ sm: "column", md: "row" }}
                    align="center"
                    w="100%"
                    justify="center"
                    py="1rem"
                    padding="2px"
                  >
                    <Select fontSize="sm"
                      ms="4px"
                      borderRadius="15px"
                      mb="4px"
                      size="lg"
                      borderColor="gray.400"
                      focusBorderColor="#1daa3f"
                      onChange={(event) => this.handleChange(event, "situationF")}>
                      <option value="célibataire">Célibataire</option>
                      <option value="veuve">Veuve</option>
                      <option value="mariée">Mariée</option>
                      <option value="dévorcée">Dévorcée</option>
                    </Select>

                    <Select fontSize="sm"
                      ms="4px"
                      borderRadius="15px"
                      mb="4px"
                      borderColor="gray.400"
                      focusBorderColor="#1daa3f"
                      size="lg"
                      onChange={(event) => this.handleChange(event, "GroupeSanguine")}>
                      <option value="O-">O-</option>
                      <option value="O+">O+</option>
                      <option selected value="A-">A-</option>
                      <option value="A+">A+</option>
                      <option value="B-">B-</option>
                      <option value="B+">B+</option>
                      <option value="AB-">AB-</option>
                      <option value="AB+">AB+</option>
                    </Select>
                  </Flex>

                  <Checkbox 
                    onChange={(event) => {
                      this.handleChange(event, "sendemail")
                    }}
                    
                  />
                  send email
                  <Checkbox 
                    onChange={(event) => {
                      this.handleChange(event, "sendsms")
                    }}
                    
                  />
                  send sms

                </FormControl>
              </ModalBody>
              <ModalFooter>
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
                <Button onClick={() => { this.closeModal() }} bg="gray.400">Annuler</Button>

              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );
  }
}

export default Patients;
