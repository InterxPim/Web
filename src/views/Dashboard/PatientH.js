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


class PatientsH extends React.Component {


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

    if (sessionStorage.getItem("role")=="SupAdmin")
    {
      this.state.resdataP.forEach(element => {
          this.state.l.push(element)
          this.state.la = Array.from(new Set(this.state.l))
        })
    }
    return (
      <>
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
          <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p="6px 0px 22px 0px">
              <Flex justify="space-between" align="center" mb="1rem" w="100%">
                <Text fontSize="xl" color={"gray.700"} fontWeight="bold">
                  Liste des patients
                </Text>
               
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
       
      </>
    );
  }
}

export default PatientsH;
