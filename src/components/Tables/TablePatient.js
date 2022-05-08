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
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import {
  AiOutlineFontColors,
  AiFillPhone,
  AiOutlineEnvironment,
  AiOutlineMail,
  AiTwotoneCalendar
} from "react-icons/ai";
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
    }
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

    axios.put(`https://interxpim.herokuapp.com/api/patient/update`, patient)
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
  render() {
    const { firstname, lastname, email, birthday, phone, adresse, GroupeSanguine, situationF, id } = this.props;
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
              p={{ md: "24px" }}
            >



              <Button onClick={() => { this.openModal(id) }} p="0px" bg="transparent">
                <Flex color="gray.700" cursor="pointer" align="center" p="12px">
                  <Icon as={FaPencilAlt} me="4px" />
                </Flex>
              </Button>
            </Flex>
          </Td>
        </Tr >
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
                  
                   <FormLabel>Situation Familialle</FormLabel>


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
