
import React from "react";
import axios from "axios";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Input,
  InputGroup,
  Select,
  InputLeftElement,
  Icon,
  Button,
} from "@chakra-ui/react";
import {
  FaPlus,
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
} from "@chakra-ui/react"
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TablesTableRow from "components/Tables/TablesTableRow";

class UsersSA extends React.Component {


  componentDidMount() {
    axios.get(`https://interxpim.herokuapp.com/api/users/all`)
      .then(res => {
        const resdata = res.data;
        this.setState({ resdata });
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
      gender: '',
      situationF: '',
      age: '',
      //password:'',
      hospital: '',
      sendsms: false,
      sendemail: false,
      modalIsOpen: false,
      resdata: [],

      l: [],
      la: [],
    }
  }
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });

    if (field == "sendemail") {
      this.state.sendemail = evt.target.checked
      this.setState({ sendemail: evt.target.checked })
      console.log(this.state.email)
      // let isChecked = e.target.checked;
    }
    if (field == "sendsms") {
      this.state.sendsms = evt.target.checked
      this.setState({ sendsms: evt.target.checked })
      console.log(this.state.sendsms)
    }

    // this.state.sendemail  = evt.target.value 


  }
  handleSubmit = async (event) => {

    event.preventDefault();
    const user = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      email: this.state.email,
      age: this.state.age,
      //password:this.state.password,
      situationF: this.state.situationF,
      gender: this.state.gender,
      hospital: sessionStorage.getItem("id"),
      sendemail: this.state.sendemail,
      sendsms: this.state.sendsms

    }
    console.log(this.state.sendemail)
    axios.post("https://interxpim.herokuapp.com/api/users/createUsers", user)
      .then(res => {
        //alert(user.firstname)
        window.location.reload(false);
      }).catch(error => {
        console.log(user)
        alert("Remplissez tous les champs!");

      })
  }
  openModal() {
    this.setState({
      modalIsOpen: true,
    });

  }

  closeModal() {
    this.setState({
      modalIsOpen: false,

    });
  }

  render() {
    if (sessionStorage.getItem("role") == "SupAdmin") {
      this.state.resdata.forEach(elementr => {
        this.state.l.push(elementr)
        this.state.la = Array.from(new Set(this.state.l))


      })

    } else if (sessionStorage.getItem("role") == "Admin") {
      this.state.resdata.forEach(elementr => {
        if (elementr.hospital == sessionStorage.getItem("id")) {
          this.state.l.push(elementr)
          this.state.la = Array.from(new Set(this.state.l))
  
        }


      })

    }

    return (
      <>
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
          <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p="6px 0px 22px 0px">
              <Flex justify="space-between" align="center" mb="1rem" w="100%">
                <Text fontSize="xl" color={"gray.700"} fontWeight="bold">
                  Liste des employés
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
                  Ajouter un user
                </Button>
              </Flex>

            </CardHeader>

            <CardBody>
              <Table variant="simple" color={"gray.700"}>
                <Thead>
                  <Tr my=".8rem" pl="0px" color="gray.400">
                    <Th pl="0px" color="#1daa3">
                      Utilisateur
                    </Th>
                    <Th color="#1daa3">Phone</Th>
                    <Th color="#1daa3">Birthday</Th>
                    <Th color="#1daa3">Gender</Th>
                    <Th color="#1daa3">Situation Familialle</Th>
                    <Th color="#1daa3">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {this.state.la.map((row) => {
                    //  if (row.hospital == sessionStorage.getItem("id")) {
                    return (
                      <TablesTableRow
                        id={row._id}
                        firstname={row.firstname}
                        lastname={row.lastname}
                        phone={row.phone}
                        age={row.age}
                        email={row.email}
                        password={row.password}
                        birthday={row.birthday}
                        gender={row.gender}
                        situationF={row.situationF}
                        sendemail={row.sendemail}
                        sendsms={row.sendsms}
                      />
                    );


                  })}
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
              <ModalHeader>Ajouter un user</ModalHeader>
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
                        focusBorderColor="#1daa3f" />
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
                        focusBorderColor="#1daa3f" />
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
                      focusBorderColor="#1daa3f" />
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
                      focusBorderColor="#1daa3f" />
                  </InputGroup>
                  <FormLabel>age</FormLabel>
                  <Input
                    onChange={(event) => this.handleChange(event, "age")}
                    placeholder="age"
                    borderColor="gray.400"
                    focusBorderColor="#1daa3f" />

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
                      onChange={(event) => this.handleChange(event, "gender")}>
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>

                    </Select>

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

export default UsersSA;
