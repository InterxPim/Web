
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
import TablesTableRowHospital from "components/Tables/TablesTableRowHospital";

class Hospitals extends React.Component {


  componentDidMount() {
    axios.get(`http://172.17.1.223:9091/api/hospital/all`)
      .then(res => {
        const resdata = res.data;
        this.setState({ resdata });
      })
  }
  constructor() {
    super()

    this.state = {
      nomHospital: '',
      addresseHospital: '',
      phoneHospital: '',
      email: '',
      //password:'',
      faxHospital: '',
      sendsms: false,
      sendemail: false,
      modalIsOpen: false,
      resdata: []
    }
  }
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
  }
  handleSubmit = async (event) => {

    event.preventDefault();
    const hospital = {
      nomHospital: this.state.nomHospital,
      addresseHospital: this.state.addresseHospital,
      phoneHospital: this.state.phoneHospital,
      email: this.state.email,
      faxHospital: this.state.faxHospital,
      //password:this.state.password,


    }
    
    axios.post("http://172.17.1.223:9091/api/hospital/registerAdmin", hospital)
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


    return (
      <>
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
          <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p="6px 0px 22px 0px">
              <Flex justify="space-between" align="center" mb="1rem" w="100%">
                <Text fontSize="xl" color={"gray.700"} fontWeight="bold">
                  Liste des Hospital
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
                  Ajouter un hospital
                </Button>
              </Flex>

            </CardHeader>

            <CardBody>
              <Table variant="simple" color={"gray.700"}>
                <Thead>
                  <Tr my=".8rem" pl="0px" color="gray.400">

                    <Th color="#1daa3">Hospital </Th>
                    <Th color="#1daa3">Phone</Th>

                    <Th color="#1daa3">faxHospital</Th>
                    <Th color="#1daa3">addresseHospital</Th>
                    <Th color="#1daa3">Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {this.state.resdata.map((row) => {

                    return (
                      <TablesTableRowHospital
                        id={row._id}
                        email={row.email}
                        nomHospital={row.nomHospital}
                        addresseHospital={row.addresseHospital}
                        phoneHospital={row.phoneHospital}
                        faxHospital={row.faxHospital}
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
              <ModalHeader>Ajouter un hopitale</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={5}>
                <FormControl>
                  <FormLabel>Nom Hospital</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineFontColors color='gray.300' />}
                    />
                    <Input
                      onChange={(event) => this.handleChange(event, "nomHospital")}
                      placeholder="nom Hospital"
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
                  <FormLabel>Adresse</FormLabel>
                  <Input
                    onChange={(event) => this.handleChange(event, "addresseHospital")}
                    placeholder="addresse"
                    borderColor="gray.400"
                    focusBorderColor="#1daa3f" />
                    <FormLabel>Phone</FormLabel>
                    <Input
                      onChange={(event) => this.handleChange(event, "phoneHospital")}
                      placeholder="phone"
                      borderColor="gray.400"
                      focusBorderColor="#1daa3f" />
                    
                    <FormLabel>Fax</FormLabel>
                    <Input
                      onChange={(event) => this.handleChange(event, "faxHospital")}
                      placeholder="Fax"
                      borderColor="gray.400"
                      focusBorderColor="#1daa3f" />
                    <Flex
                      direction={{ sm: "column", md: "row" }}
                      align="center"
                      w="100%"
                      justify="center"
                      py="1rem"
                      padding="2px"
                    ></Flex>

            

                  

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

export default Hospitals;
