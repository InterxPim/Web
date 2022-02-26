import React, { useState } from "react";
import { BellIcon, SearchIcon } from "@chakra-ui/icons";
import axios from 'axios';
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
    axios.get(`http://localhost:9091/api/patient/all`)
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
      adresse: '',
      situationF: '',
      GroupeSanguine: '',
      password: '',
      search:'',
      modalIsOpen: false,
      resdata: []
    }
  }
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
    
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
    }
    axios.post("http://localhost:9091/api/patient/register", patient)
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
    return (
      <>
      <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
        <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
          <CardHeader p="6px 0px 22px 0px">
            <Flex justify="space-between" align="center" mb="1rem" w="100%">
              <Text fontSize="xl" color={"gray.700"} fontWeight="bold">
                Your patients
              </Text>
              <Button
                colorScheme="teal"
                borderColor="teal.300"
                color="teal.300"
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
                  <Th color="gray.400">Addresse</Th>
                  <Th color="gray.400">Phone</Th>
                  <Th color="gray.400">Groupe Sanguine</Th>
                  <Th color="gray.400">Situation Familialle</Th>
                  <Th color="gray.400">Action</Th>

                </Tr>
              </Thead>
              <InputGroup
        cursor="pointer"
        bg={"gray.800"}
        borderRadius="15px"
        w={{
          sm: "128px",
          md: "200px",
        }}
        me={{ sm: "auto", md: "20px" }}
        
      >
        <InputLeftElement
          children={
            <IconButton
              bg="inherit"
              borderRadius="inherit"
              _hover="none"
              _active={{
                bg: "inherit",
                transform: "none",
                borderColor: "transparent",
              }}
              _focus={{
                boxShadow: "none",
              }}
              icon={<SearchIcon color={"gray.700"} w="15px" h="15px" />}
            ></IconButton>
          }
        />
        <Input
          fontSize="xs"
          py="11px"
          color={"white"}
          value={this.state.search}
          onChange={(event) => this.handleChange(event, "search")}
          placeholder="Search..."
          borderRadius="inherit"
        />
        
      </InputGroup>
              <Tbody>
                {this.state.resdata.map((row) => {
                  return (
                    <TablesTableRow
                      id={row._id}
                      firstname={row.firstname}
                      lastname={row.lastname}
                      email={row.email}
                      birthday={row.birthday}
                      phone={row.phone}
                      adresse={row.adresse}
                      GroupeSanguine={row.GroupeSanguine}
                      situationF={row.situationF}

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
                    
                     <Input onChange={(event) => this.handleChange(event, "firstname")} placeholder="Prénom" />
                   
                     <Input onChange={(event) => this.handleChange(event, "lastname")} placeholder="Nom" />
                     
                     </Flex>
                     <FormLabel>Téléphone</FormLabel>
                     <Input onChange={(event) => this.handleChange(event, "phone")} placeholder="Téléphone" />
                     <FormLabel>Email</FormLabel>
                     <Input type="email"  onChange={(event) => this.handleChange(event, "email")} placeholder="email" />
                     <FormLabel>GroupeSanguine</FormLabel>
                     <Select fontSize="sm"
                            ms="4px"
                            borderRadius="15px"
                            mb="4px"
                            size="lg"
                            onChange={(event) => this.handleChange(event, "GroupeSanguine")}>
                            <option value="O-">O-</option>
                            <option value="O+">O+</option>
                            <option selected value="A-">A-</option>
                            <option value="A+">A+</option>
                            <option value="B-">B-</option>
                            <option value="B+">B+</option>
                            <option  value="AB-">AB-</option>
                            <option value="AB+">AB+</option>
                        </Select>
                    
                     <FormLabel>birthday</FormLabel>
                     <Input onChange={(event) => this.handleChange(event, "birthday")} placeholder="birthday" />
                     <FormLabel>Adresse</FormLabel>
                     <Input onChange={(event) => this.handleChange(event, "adresse")} placeholder="adresse" />
                     <FormLabel>situationF</FormLabel>
                     <Select fontSize="sm"
                            ms="4px"
                            borderRadius="15px"
                            mb="4px"
                            size="lg"
                            onChange={(event) => this.handleChange(event, "situationF")}>
                            <option value="célibataire">Célibataire</option>
                            <option value="veuve">Veuve</option>
                            <option value="mariée">Mariée</option>
                            <option value="dévorcée">Dévorcée</option>
                        </Select>
                      <FormLabel>password</FormLabel>
                     <Input onChange={(event) => this.handleChange(event, "password")} placeholder="password" />
                   
                   </FormControl>
                 </ModalBody>
                 <ModalFooter>
                   <Button type="submit" colorScheme="blue" mr={3}>
                     Valider
                   </Button>
                   <Button onClick={() => { this.closeModal() }} >Annuler</Button>
   
                 </ModalFooter>
               </form>
             </ModalContent>
           </Modal>
      </>
    );
  }
}

export default Patients;
