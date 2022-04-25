
import {
  Avatar,
  Badge,
  Button,
  Icon,
  Flex,
  Td,
  InputGroup,
  InputLeftElement,
  Text,
  Select,
  Tr,
} from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from '@chakra-ui/react'
import React from "react";
import {
  AiOutlineFontColors,
  AiFillPhone,
  AiOutlineEnvironment,
  AiOutlineMail,
  AiTwotoneCalendar
} from "react-icons/ai";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
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
class TablesTableRowHospital extends React.Component {



  componentDidMount() {
    const { nomHospital, addresseHospital, phoneHospital, faxHospital, email, id } = this.props;
    this.setState({ nomHospital });
    this.setState({ addresseHospital });
    this.setState({ phoneHospital });
    this.setState({ faxHospital });
    this.setState({ email });
    this.setState({ id });

  }

  constructor(props) {


    super(props);
    this.state = {
      nomHospital: '',
      addresseHospital: '',
      phoneHospital: '',
      faxHospital: '',
      email: '',
      id: '',
      modalIsOpen: false,
    }
  }
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });

  }

  delete = async () => {
    const hospital = {
      _id: this.props.id
    }
    axios.post(`http://localhost:9091/api/hospital/delete`, hospital)
      .then(res => {

        /*alert("user supprimé!")*/
        window.location.reload(false);
      }).catch(error => {
        alert("Erreur!");

      })
  }
  handleSubmit = async (event) => {

    event.preventDefault();
    const hospital = {
      _id: this.props.id,
      nomHospital: this.state.nomHospital,
      addresseHospital: this.state.addresseHospital,
      phoneHospital: this.state.phoneHospital,
      faxHospital: this.state.faxHospital,
      email: this.state.email,


    }
    axios.post(`http://localhost:9091/api/hospital/update`, hospital)
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
    const { nomHospital, addresseHospital, phoneHospital, faxHospital, email, id } = this.props;
    // console.log(sendemail)
    //console.log(sendsms)

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
                  {nomHospital}
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
                {phoneHospital}
              </Text>

            </Flex>
          </Td>
          <Td>
            <Flex direction="column">
              <Text fontSize="md" color={"gray.700"} fontWeight="bold">
                {faxHospital}
              </Text>

            </Flex>
          </Td>
          <Td>
            <Flex direction="column">
              <Text fontSize="md" color={"gray.700"} fontWeight="bold">
                {addresseHospital}
              </Text>

            </Flex>
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


        </Tr >
        <Modal
          isOpen={this.state.modalIsOpen}
          onClose={() => { this.closeModal() }}>
          <ModalOverlay />
          <ModalContent>
            <form onSubmit={this.handleSubmit}>

              <ModalHeader>Modifier Hospital</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={5}>
                <FormControl>
                  <FormLabel>Nom Hospital :</FormLabel>
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
                      <Input defaultValue={nomHospital} onChange={(event) => this.handleChange(event, "nomHospital")} placeholder="Nom Hospital" />
                    </InputGroup>
                  </Flex>
                  <FormLabel>Email Hospital :</FormLabel>
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
                        children={<AiFillPhone color='gray.300' />}
                      />
                      <Input defaultValue={email} onChange={(event) => this.handleChange(event, "email")} placeholder="Email Hospital" />
                    </InputGroup>


                  </Flex>
                  <FormLabel>Phone Hospital :</FormLabel>
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
                        children={<AiFillPhone color='gray.300' />}
                      />
                      <Input defaultValue={phoneHospital} onChange={(event) => this.handleChange(event, "phoneHospital")} placeholder="Phone Hospital" />
                    </InputGroup>


                  </Flex>
                  <FormLabel>Fax Hospital :</FormLabel>
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
                        children={<AiFillPhone color='gray.300' />}
                      />
                      <Input defaultValue={faxHospital} onChange={(event) => this.handleChange(event, "faxHospital")} placeholder="Fax Hospital" />
                    </InputGroup>


                  </Flex>
                  <FormLabel>Adresse Hospital :</FormLabel>
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
                        children={<AiFillPhone color='gray.300' />}
                      />
                      <Input defaultValue={addresseHospital} onChange={(event) => this.handleChange(event, "addresseHospital")} placeholder="Adresse Hospital" />
                    </InputGroup>


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

export default TablesTableRowHospital;
