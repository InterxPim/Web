import {
  Icon,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from 'axios';
import moment from "moment";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
} from '@chakra-ui/react'
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
import React from "react";
import { GiLoveInjection } from "react-icons/gi";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { date } from "yup";
class TablesTableRow extends React.Component {

  componentDidMount() {

    const { firstname, lastname, date, heure, phone, result, id, idp, etat } = this.props;
    this.setState({ firstname });
    this.setState({ lastname });
    this.setState({ date });
    this.setState({ heure });
    this.setState({ phone });
    this.setState({ result });
    this.setState({ idp });
    this.setState({ etat });
    axios.get(`https://interxpim.herokuapp.com/api/prelevements/all`)
      .then(res => {
        const resdataP = res.data;
        this.setState({ resdataP });
        //console.log(resdataP)
        this.state.etat = res.data.etat

      })
    axios.post("https://interxpim.herokuapp.com/api/prelevements/show", {
      _id: this.props.idp,
    }).then((response) => {

      if (!response.data.message) {
        // console.log(response.data.note)
        this.state.note = response.data.note
        this.state.numeroD = response.data.numeroD
      }
    })
    // console.log("prelevement nest pas efectue")
  }
  constructor(props) {


    super(props);
    this.state = {
      result: '',
      firstname: '',
      lastname: '',
      phone: '',
      date: '',
      heure: '',
      hospital: '',
      etat: '',
      note: '',
      date: Date.now(),
      numeroD: '',
      modalIsOpen: false,
      modalIsOpenP: false,
      resdataP: [],
      pref: [],
      list: []
    }
  }
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });

  }
  delete = async () => {
    const reservation = {
      _id: this.props.id
    }
    axios.put(`https://interxpim.herokuapp.com/api/reservations/deleteReser`, reservation)
      .then(res => {

        alert("R??servation supprim??!")
        window.location.reload(false);
      }).catch(error => {
        alert("Erreur!");

      })
  }
  handleSubmit = async (event) => {

    event.preventDefault();
    const reservation = {
      _id: this.props.id,
      result: this.state.result,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      date: this.state.date,
      heure: this.state.heure,
      hospital: this.state.hospital,
      etat: this.state.etat

    }
    axios.put(`https://interxpim.herokuapp.com/api/reservations/updateReser`, reservation)
      .then(res => {

        alert("R??servation modifi??!")
        window.location.reload(false);
      }).catch(error => {
        alert("Remplissez tous les champs!");

      })
  }
  handleSubmit1 = async (event) => {

    event.preventDefault();
    const prelevement = {
      _id: this.props.idp,
      etat: this.state.etat,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      date: this.state.date,
      numeroD: this.state.numeroD,
      note: this.state.note,
      reservation: this.state.id1

    }
    const reservation = {
      _id: this.props.id,
      etat: this.state.etat

    }
    // console.log(this.pref._id)
    axios.put(`https://interxpim.herokuapp.com/api/prelevements/updatePrev`, prelevement)
      .then(res => {

       // alert("prelevement modifi??!")
        window.location.reload(false);
      }).catch(error => {
        alert("Remplissez tous les champs!");

      })
    reservation.etat = true
    axios.put(`https://interxpim.herokuapp.com/api/reservations/updateEtat`, reservation).then(
      res => {
        //  alert("prelevement modifi??!")
        window.location.reload(false);
      }).catch(error => {
        alert("Remplissez tous les champs!");
      }
      )
  }

  openModal(id1) {
    this.setState({
      modalIsOpen: true,
      id: id1
    });

    /*axios.post("https://interxpim.herokuapp.com/api/prelevement/show", {

      id: id1,

      password: password,
    }).then((response) => {

      if (!response.data.message) {
        // setLoginStatus( response.data.message);
        if (response.data.role == "Admin" && isMail) {
        }}})*/
  }
  openModal2(id2) {
    this.setState({
      modalIsOpenP: true,
      id: id2
    });
    axios.post("https://interxpim.herokuapp.com/api/prelevements/show", {

      _id: this.props.idp,
    }).then((response) => {

      if (!response.data.message) {
        console.log(response.data.note)
        this.state.note = response.data.note
        this.state.numeroD = response.data.numeroD

      }
    })
    //console.log(id2)
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,

    });
  }
  closeModalP() {
    this.setState({
      modalIsOpenP: false,

    });
  }

  render() {

    // console.log(this.state.list.etat)
    /* console.log(elementr.etat)
    // this.state.etat=elementr.etat
     //console.log(this.state.etat)
   })*/


    const { firstname, lastname, date, heure, phone, result, id, idp, etat } = this.props;
    //console.log(this.props.etatyes)
    return (
      <>

        <Tr>
          <Td >
            <Flex align="center" >
              <Flex direction="column">
                <Text
                  fontSize="md"
                  color="gray.700"
                  fontWeight="bold"
                >
                  {lastname} {firstname}
                </Text>
              </Flex>
            </Flex>
          </Td>

          <Td>
            <Flex direction="column">
              <Text fontSize="md" color="gray.700" fontWeight="bold">
                {moment(date).utc().format('DD/MM/YYYY').toString()}
              </Text>
            </Flex>
          </Td>

          <Td>
            <Text fontSize="md" color="gray.700" fontWeight="bold" pb=".5rem">
              {heure}
            </Text>
          </Td>
          <Td>
            <Text fontSize="md" color="gray.700" fontWeight="bold" pb=".5rem">
              {phone}
            </Text>
          </Td>
          <Td>
            <Badge
              bg={result === "Trait??" ? "green.400" : "gray.400"}
              color={result === "Non trait??" ? "white" : "gray.700"}
              fontSize="16px"
              p="3px 10px"
              borderRadius="8px"
            >
              {result.toString()}
            </Badge>
          </Td>
          <Td>
            <Flex
              direction={{ sm: "column", md: "row" }}
              align="flex-start"
              p={{ md: "24px" }}
            >
              <Popover
                initialFocusRef={this.state.modalIsOpen}
                onClose={() => { this.closeModal() }}
                placement='right'
                closeOnBlur={true}
              >
                <PopoverTrigger>
                  <Button
                    p="0px"
                    bg="transparent"
                    mb={{ sm: "10px", md: "0px" }}
                    me={{ md: "12px" }}
                  >
                    <Flex color="red.500" cursor="pointer" align="center" p="12px">
                      <Icon as={FaTrashAlt} me="4px" />
                    </Flex>
                  </Button>
                </PopoverTrigger>

                <PopoverContent>
                  <PopoverHeader fontWeight='semibold'>Confirmation</PopoverHeader>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>
                    ??tes-vous s??r de vouloir continuer votre action ?
                  </PopoverBody>
                  <PopoverFooter d='flex' justifyContent='flex-end'>
                    <ButtonGroup size='sm'>
                      <Button onClick={() => { this.delete() }} colorScheme='red'>Valider</Button>
                    </ButtonGroup>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>


              <Button onClick={() => { this.openModal(id) }} p="0px" bg="transparent">

                <Flex color="gray.700" cursor="pointer" align="center" p="12px">
                  <Icon as={FaPencilAlt} me="4px" />
                </Flex>
              </Button>
            </Flex>
          </Td>
         
        </Tr>
        <Modal
          isOpen={this.state.modalIsOpen}
          onClose={() => { this.closeModal() }}
        >
          <ModalOverlay />
          <ModalContent>

            <form id="form" onSubmit={this.handleSubmit}>
              <ModalHeader>Modifier la r??servation</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>Pr??nom</FormLabel>
                  <Input defaultValue={firstname} onChange={(event) => this.handleChange(event, "firstname")} placeholder="Pr??nom" />
                  <FormLabel>Nom</FormLabel>
                  <Input defaultValue={lastname} onChange={(event) => this.handleChange(event, "lastname")} placeholder="Nom" />
                  <FormLabel>T??l??phone</FormLabel>
                  <Input defaultValue={phone} onChange={(event) => this.handleChange(event, "phone")} placeholder="T??l??phone" />
                  <FormLabel>Date</FormLabel>
                  <Input type="date" defaultValue={date} onChange={(event) => this.handleChange(event, "date")} placeholder="Date" />
                  <FormLabel>Heure</FormLabel>
                  <Input defaultValue={heure} onChange={(event) => this.handleChange(event, "heure")} placeholder="Heure" />
                  <FormLabel>Statue</FormLabel>
                  <Input defaultValue={result} onChange={(event) => this.handleChange(event, "result")} placeholder="Statue" />
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
        <Modal
          isOpen={this.state.modalIsOpenP}
          onClose={() => { this.closeModalP() }}
        >
          <ModalOverlay />
          <ModalContent>

            <form id="form" onSubmit={this.handleSubmit1}>
              <ModalHeader>pr??l??vement </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={5}>
                <FormControl>
                  <FormLabel>Pr??nom</FormLabel>
                  <Input defaultValue={firstname} onChange={(event) => this.handleChange(event, "firstname")} placeholder="Pr??nom" />
                  <FormLabel>Nom</FormLabel>
                  <Input defaultValue={lastname} onChange={(event) => this.handleChange(event, "lastname")} placeholder="Nom" />
                  <FormLabel>Note</FormLabel>
                  <Input defaultValue={this.state.note} onChange={(event) => this.handleChange(event, "note")} placeholder="note" />
                  <FormLabel>num??ro Dignostique</FormLabel>
               
                  <Input defaultValue={this.state.numeroD} onChange={(event) => this.handleChange(event, "numeroD")} placeholder="numeroD" />
                  
             
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button type="submit" colorScheme="blue" mr={3}>
                  Valider
                </Button>
                <Button onClick={() => { this.closeModalP() }} >Annuler</Button>

              </ModalFooter>
            </form>
          </ModalContent>
        </Modal>
      </>
    );
  }
}
export default TablesTableRow;
