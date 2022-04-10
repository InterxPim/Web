import React from "react";
import moment from "moment";
// Chakra imports
import {
  Flex,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import axios from 'axios';
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
  Input,
  Icon
} from "@chakra-ui/react"
import {
  FaPlus,
} from "react-icons/fa";
// Custom components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TablesTableRow from "components/Tables/Table";
//const textColor = useColorModeValue("gray.700", "white");
class Tables extends React.Component {

  componentDidMount() {
    axios.get(`http://localhost:9091/api/reservations/allReser`)
      .then(res => {
        const resdata = res.data;
        this.setState({ resdata });
      })
    //window.location.reload(false);
    axios.get(`http://localhost:9091/api/users/all`)
      .then(res => {
        const resdataU = res.data;
        this.setState({ resdataU });
      })
    axios.get(`http://localhost:9091/api/prelevements/all`)
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
      date: '',
      heure: '',
      hospital: '',
      etata: '',
      etat: '',
      prelevement: '',
      modalIsOpen: false,
      resdata: [],
      resdataR: [],
      resdataH: [],
      l: [],
      la: [],
      resdataU: [],
      resdataP: [],
      yes: '',
      no: '',
      etatt: []
    }
  }
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });

  }
  handleSubmit = async (event) => {

    event.preventDefault();
    const reservation = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      date: this.state.date,
      heure: this.state.heure,
      hospital: this.state.hospital,
      prelevement: this.state.prelevement,
    }
    axios.post(`http://localhost:9091/api/reservations/createReser`, reservation)
      .then(res => {
        alert("Réservation Ajouté!")
        window.location.reload(false);
      }).catch(error => {
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
   
    this.state.resdata.forEach(elementr => {
      if (sessionStorage.getItem("role") == "Admin") {
        if (elementr.hospital == sessionStorage.getItem("id")) {
          this.state.l.push(elementr)
          this.state.la = Array.from(new Set(this.state.l))

          // console.log(Array.from(new Set(this.state.l)))
        }
      }
      else if (sessionStorage.getItem("role") == "user") {
        if (elementr.hospital == sessionStorage.getItem("hospital")) {
          this.state.l.push(elementr)
          this.state.la = Array.from(new Set(this.state.l))
          // console.log(Array.from(new Set(this.state.l)))
        }
      }
      else {
        if (elementr.user == sessionStorage.getItem("id")) {
          this.state.l.push(elementr)
          this.state.la = Array.from(new Set(this.state.l))
          // console.log(Array.from(new Set(this.state.l)))
        }
      }
    })

    this.state.resdataP.forEach(elemtentp => {
      console.log(elemtentp)
      if (elemtentp.etat) {
        this.state.etat = "true"
      } else {
        this.state.etat = "false"
      }
    })

    return (
      <>
        <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
          <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
            <CardHeader p="6px 0px 22px 0px">
              <Flex justify="space-between" align="center" mb="1rem" w="100%">
                <Text fontSize="xl" color="gray.700" fontWeight="bold">
                  Liste des réservations
                </Text>
               {/*  <Button
                  colorScheme="#1daa3f"
                  borderColor="#1daa3f"
                  color="#1daa3f"
                  variant="outline"
                  fontSize="xs"
                  p="8px 32px"
                  onClick={() => { this.openModal() }}
                >
                  <Icon as={FaPlus} me="6px" />
                  Ajouter une réservation
                </Button>
                */}
              </Flex>
            </CardHeader>
            <CardBody>
              <Table variant="simple" color="gray.700">
                <Thead>
                  <Tr my=".8rem" pl="0px" color="gray.400">
                    <Th color="gray.400">
                      Nom et prénom
                    </Th>
                    <Th color="gray.400">Date</Th>
                    <Th color="gray.400">Heure</Th>
                    <Th color="gray.400">Téléphone</Th>
                    <Th color="gray.400">Statue</Th>
                    <Th color="gray.400">Actions</Th>
                    <Th color="gray.400">Prelevement</Th>

                  </Tr>
                </Thead>
                <Tbody>
                  {this.state.la.map((row) => {
                   


                      return (

                        <TablesTableRow
                          id={row._id}
                          firstname={row.firstname}
                          lastname={row.lastname}
                          date={row.date}
                          heure={row.heure}
                          phone={row.phone}
                          result={row.result}
                          etat={row.etat}
                          idp={row.prelevement}

                        />

                      );
                    



                  })}

                </Tbody>

              </Table>
            </CardBody>
          </Card>

        </Flex>
        <Modal
          isOpen={this.state.modalIsOpen}
          onClose={() => { this.closeModal() }}
        >
          <ModalOverlay />
          <ModalContent>

            <form id="form" onSubmit={this.handleSubmit}>
              <ModalHeader>Ajouter une réservation</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Prénom</FormLabel>
                  <Input onChange={(event) => this.handleChange(event, "firstname")} placeholder="Prénom" />
                  <FormLabel>Nom</FormLabel>
                  <Input onChange={(event) => this.handleChange(event, "lastname")} placeholder="Nom" />
                  <FormLabel>Téléphone</FormLabel>
                  <Input onChange={(event) => this.handleChange(event, "phone")} placeholder="Téléphone" />
                  <FormLabel>Date</FormLabel>
                  <Input type="date" onChange={(event) => this.handleChange(event, "date")} placeholder="Date" />
                  <FormLabel>Heure</FormLabel>
                  <Input onChange={(event) => this.handleChange(event, "heure")} placeholder="Heure" />
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
    )
  }
}
export default Tables;
