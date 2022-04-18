import {
  Avatar,
  Badge,
  Button,
  Icon,
  Flex,
  Td,
  Text,
  InputGroup,
  InputLeftElement,
  Select,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { FaPencilAlt} from "react-icons/fa";
import { BsClipboardPlus  } from "react-icons/bs";
import {
  
  AiOutlineFontColors,
  AiFillPhone,
  AiOutlineEnvironment,
  AiOutlineMail,
  AiTwotoneCalendar
} from "react-icons/ai";


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
class TablesTableRow extends React.Component {
  componentDidMount() {


    const { firstname, lastname, email, birthday, phone, adresse, GroupeSanguine, situationF, id } = this.props;
    this.setState({ firstname });
    this.setState({ lastname });
    this.setState({ email });
    this.setState({ birthday });
    this.setState({ phone });
    this.setState({ adresse });
    this.setState({ GroupeSanguine });
    this.setState({ situationF });
    this.setState({ id });
    const dHoraire = sessionStorage.getItem("debutHoraire")
  const fHoraire = sessionStorage.getItem("finHoraire")
  this.setState({ dHoraire });
    this.setState({ fHoraire });
 
  }

  constructor(props) {


    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      birthday: '',
      phone: '',
      adresse: '',
      GroupeSanguine: '',
      situationF: '',
      password: '',
      modalIsOpen: false,
      modalIsOpen1:false,
      dHoraire:1,
      fHoraire:30
    }
  }

  addReservation = async (event) => {

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

  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });

  }


  handleSubmit = async (event) => {

    event.preventDefault();
    const patient = {
      _id: this.props.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      birthday: this.state.birthday,
      phone: this.state.phone,
      adresse: this.state.adresse,
      GroupeSanguine: this.state.GroupeSanguine,
      situationF: this.state.situationF,
    }

    axios.put(`http://localhost:9091/api/patient/update`, patient)
      .then(res => {


        window.location.reload(false);

      }).catch(error => {
        alert("Remplissez tous les champs!");

      })
  }
  openModal(id1) {
    this.setState({
      modalIsOpen: true,
      id: id1
    });

  }
  closeModal() {
    this.setState({
      modalIsOpen: false,

    });
  }
  openModal1(id1) {
    this.setState({
      modalIsOpen1: true,
      id: id1
    });

  }
  closeModal1() {
    this.setState({
      modalIsOpen1: false,

    });
  }
  render() {
    const { firstname, lastname, email, birthday, phone, adresse, GroupeSanguine, situationF, id } = this.props;
    const runCallback = (cb) => {
      return cb();
    };
    console.log(this.state.fHoraire)
    return (
      <>
        <Tr>
          <Td minWidth={{ sm: "250px" }} pl="0px">
            <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">

              <Flex direction="column">
                <Text
                  fontSize="md"
                  color={"gray.700"}
                  fontWeight="bold"
                  minWidth="100%"
                >
                  {firstname} {lastname}
                </Text>
                <Text fontSize="sm" color="gray.400" fontWeight="normal">
                  {email}
                </Text>
              </Flex>
            </Flex>
          </Td>

          <Td>
            <Flex direction="column">
              <Text fontSize="md" color={"gray.700"} fontWeight="bold">
                {phone}
              </Text>

            </Flex>
          </Td>
          <Td>
            <Text fontSize="md" color={"gray.700"} fontWeight="bold" pb=".5rem">
              {birthday}
            </Text>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {adresse}
            </Text>
          </Td>

          <Td>
            <Text fontSize="md" color={"gray.700"} fontWeight="bold" pb=".5rem">
              {GroupeSanguine}
            </Text>
          </Td>
          <Td>
            <Text fontSize="md" color={"gray.700"} fontWeight="bold" pb=".5rem">
              {situationF}
            </Text>
          </Td>



          <Td>
            <Flex
              direction={{ sm: "column", md: "row" }}
              align="flex-start"
             
            >


<tr>
  <td>
              <Button onClick={() => { this.openModal(id) }} p="0px" bg="transparent">
               
                <Flex color="gray.700" cursor="pointer" align="center" p="12px">
                  <Icon as={FaPencilAlt} me="4px" />
                </Flex>
                Modifier patient
              </Button>
              </td>
              <br></br>
              <Button onClick={() => { this.openModal1(id) }} p="0px" bg="transparent">
             
                <Flex color="gray.700" cursor="pointer" align="center" p="12px">
                  <Icon as={BsClipboardPlus} me="4px" />
                </Flex>
                Ajouter une réservation
              </Button>
            </tr>
            </Flex>
          </Td>
        </Tr >
        <Modal
          isOpen={this.state.modalIsOpen1}
          onClose={() => { this.closeModal1() }}
        >
          <ModalOverlay />
          <ModalContent>

            <form id="form" onSubmit={this.addReservation}>
              <ModalHeader>Ajouter une réservation</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Date</FormLabel>
                  <Input type="date"  onChange={(event) => this.handleChange(event, "date")} placeholder="Date" />
                  <FormLabel>Heure</FormLabel>
                  <select value={this.state.value} onChange={(event) => this.handleChange(event, "heure")}>
                  {
        runCallback(() => {
          
          const row = [];
          for(var i=parseInt(this.state.dHoraire)*60; i<parseInt(this.state.fHoraire)*60; i+30){
            console.log(i)
            row.push(<option value={i}>{i}</option>);
          }
          
          return row;
        })
      }
               
          </select>
                  {/*<Input onChange={(event) => this.handleChange(event, "heure")} placeholder="Heure" />*/}
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Valider
                </Button>
                <Button onClick={() => { this.closeModal1() }} >Annuler</Button>

              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={this.state.modalIsOpen}
          onClose={() => { this.closeModal() }}>
          <ModalOverlay />
          <ModalContent>

            <form onSubmit={this.handleSubmit}>
              <ModalHeader>Modifier la réservation</ModalHeader>
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
                      <Input defaultValue={firstname} onChange={(event) => this.handleChange(event, "firstname")} placeholder="Prénom" />
                    </InputGroup>
                    <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<AiOutlineFontColors color='gray.300' />}
                      />
                      <Input defaultValue={lastname} onChange={(event) => this.handleChange(event, "lastname")} placeholder="Nom" />
                    </InputGroup>
                  </Flex>
                  <FormLabel>Phone</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiFillPhone color='gray.300' />}
                    />
                    <Input defaultValue={phone} onChange={(event) => this.handleChange(event, "phone")} placeholder="phone" />
                  </InputGroup>
                  <FormLabel>adresse</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineEnvironment color='gray.300' />}
                    />
                    <Input defaultValue={adresse} onChange={(event) => this.handleChange(event, "adresse")} placeholder="adresse" />
                  </InputGroup>
                  <FormLabel>email</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineMail color='gray.300' />}
                    />
                    <Input defaultValue={email} onChange={(event) => this.handleChange(event, "email")} placeholder="email" />
                  </InputGroup>
                  <FormLabel>birthday</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiTwotoneCalendar color='gray.300' />}
                    />
                    <Input defaultValue={birthday} onChange={(event) => this.handleChange(event, "birthday")} placeholder="birthday" />
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
                  </Flex>
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" bg="teal.300"
                color="white" mr={4}>
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

export default TablesTableRow;
