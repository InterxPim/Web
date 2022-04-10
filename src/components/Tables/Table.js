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
  import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
  class TablesTableRow extends React.Component {
    componentDidMount() {
      const { firstname, lastname, date, heure, phone, result, id } = this.props;
      this.setState({ firstname });
      this.setState({ lastname });
      this.setState({ date });
      this.setState({ heure });
      this.setState({ phone });
      this.setState({ result });
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
        modalIsOpen: false,
      }
    }
    handleChange(evt, field) {
      this.setState({ [field]: evt.target.value });
  
    }
    delete= async()=>{
      const reservation = {
        _id: this.props.id
      }
      axios.put(`http://localhost:9091/api/reservations/deleteReser`, reservation)
        .then(res => {
  
          alert("Réservation supprimé!")
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
  
      }
      axios.put(`http://localhost:9091/api/reservations/updateReser`, reservation)
        .then(res => {
  
          alert("Réservation modifié!")
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
    render() {
  
      const { firstname, lastname, date, heure, phone, result, id } = this.props;
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
                  {moment(date).format('DD/MM/YYYY').toString()}
                </Text>
              </Flex>
            </Td>
  
            <Td>
              <Text fontSize="md" color="gray.700" fontWeight="bold" pb=".5rem">
                {heure}:00
              </Text>
            </Td>
            <Td>
              <Text fontSize="md" color="gray.700" fontWeight="bold" pb=".5rem">
                {phone}
              </Text>
            </Td>
            <Td>
              <Badge
                bg={result === "Traité" ? "green.400" : "gray.400"}
                color={result === "Non traité" ? "white" : "gray.700"}
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
            Êtes-vous sûr de vouloir continuer votre action ?
            </PopoverBody>
            <PopoverFooter d='flex' justifyContent='flex-end'>
              <ButtonGroup size='sm'>
                <Button onClick={()=>{this.delete()}} colorScheme='red'>Valider</Button>
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
                <ModalHeader>Modifier la réservation</ModalHeader>
                <ModalCloseButton />
                <ModalBody pb={6}>
                  <FormControl>
                    <FormLabel>Prénom</FormLabel>
                    <Input defaultValue={firstname} onChange={(event) => this.handleChange(event, "firstname")} placeholder="Prénom" />
                    <FormLabel>Nom</FormLabel>
                    <Input defaultValue={lastname} onChange={(event) => this.handleChange(event, "lastname")} placeholder="Nom" />
                    <FormLabel>Téléphone</FormLabel>
                    <Input defaultValue={phone} onChange={(event) => this.handleChange(event, "phone")} placeholder="Téléphone" />
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
        
        </>
      );
    }
  }
  export default TablesTableRow;
  