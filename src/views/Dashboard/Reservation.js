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
  Input
} from "@chakra-ui/react"
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
}) }
constructor() {
 super()

this.state = {
  firstname: '',
  lastname: '',
  phone: '',
  date: '',
  heure: '',
  hospital: '',
  modalIsOpen: false,
  resdata:[]
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
render(){

  return (
    <>
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
        <Flex justify="space-between" align="center" mb="1rem" w="100%">
          <Text fontSize="xl" color="gray.700" fontWeight="bold">
            Réservations
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
                Ajouter une réservation
              </Button>
            </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color="gray.700">
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th  color="gray.400">
                Nom et prénom
                </Th>
                <Th color="gray.400">Date</Th>
                <Th color="gray.400">Heure</Th>
                <Th color="gray.400">Téléphone</Th>
                <Th color="gray.400">Statue</Th>   
                <Th color="gray.400">Actions</Th>  
                <Th></Th>
                       
              </Tr>
            </Thead>
            <Tbody>
              {this.state.resdata.map((row) => {
                return (
                  <TablesTableRow
                   id={row._id}
                    firstname={row.firstname}
                    lastname={row.lastname}
                    date={row.date}
                    heure={row.heure}
                    phone={row.phone}
                    result={row.result}
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
                  <Input type="date"  onChange={(event) => this.handleChange(event, "date")} placeholder="Date" />
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
