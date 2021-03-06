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
class TablesTableRowUser extends React.Component {
  componentDidMount() {
    const { sendsms,sendemail,firstname, lastname, phone, age, email, birthday, gender, situationF, id ,hospital } = this.props;
    this.setState({ firstname });
    this.setState({ lastname });
    this.setState({ phone });
    this.setState({ age });
    this.setState({ email });
    this.setState({ birthday });
    this.setState({ gender });
    this.setState({ situationF });
    this.setState({ id });
    this.setState({sendemail});
    this.setState({sendsms});
    this.setState({hospital})
  }

  constructor(props) {


    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      phone: '',
      age: '',
      email: '',
      birthday: '',
      gender: '',
      situationF: '',
      hospital:'',
      sendemail:true,
      sendsms:true,
      modalIsOpen: false,
    }
  }
  handleChange(evt, field) {
    this.setState({ [field]: evt.target.value });
   
  }
  handleCheck(evt, field) {
    this.setState({ [field]: evt.target.checked });
   console.log(evt.target.checked)
  }
  delete = async () => {
    const user = {
      _id: this.props.id
    }
    axios.post(`https://interxpim.herokuapp.com/api/users/delete`, user)
      .then(res => {

        /*alert("user supprim??!")*/
        window.location.reload(false);
      }).catch(error => {
        alert("Erreur!");

      })
  }
  handleSubmit = async (event) => {

    event.preventDefault();
    const user = {
      _id: this.props.id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      phone: this.state.phone,
      age: this.state.age,
      email: this.state.email,
      birthday: this.state.birthday,
      gender: this.state.gender,
      situationF: this.state.situationF,
      hospital:this.state.hospital,
    }
    axios.put(`https://interxpim.herokuapp.com/api/users/update`, user)
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
    const { sendemail,sendsms,firstname, lastname, phone, age, email, birthday, gender, situationF, id ,hospital} = this.props;
  //console.log(sendemail)
   // console.log(sendsms)
    
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
              {age} ans
            </Text>
          </Td>

          <Td>
            <Text fontSize="md" color={"gray.700"} fontWeight="bold" pb=".5rem">
              {gender}
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
          
          
        </Tr >
        <Modal
          isOpen={this.state.modalIsOpen}
          onClose={() => { this.closeModal() }}>
          <ModalOverlay />
          <ModalContent>

            <form onSubmit={this.handleSubmit}>
              
              <ModalHeader>Modifier User</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={8}>
                <FormControl>
                  <FormLabel>Pr??nom & Nom</FormLabel>
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
                      <Input defaultValue={firstname} onChange={(event) => this.handleChange(event, "firstname")} placeholder="Pr??nom" />
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
                  <FormLabel>age</FormLabel>
                  <Input defaultValue={age} onChange={(event) => this.handleChange(event, "age")} placeholder="age" />
                  <FormLabel>email</FormLabel>
                  <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineMail color='gray.300' />}
                    />
                    <Input defaultValue={email} onChange={(event) => this.handleChange(event, "email")} placeholder="email" />
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
                      onChange={(event) => this.handleChange(event, "gender")}>
                        
                      <option value="homme">Homme</option>
                      <option value="femme">Femme</option>

                    </Select>


                    <Select fontSize="sm"
                      ms="4px"
                      borderRadius="15px"
                      mb="4px"
                      size="lg"
                      onChange={(event) => this.handleChange(event, "situationF")}>
                      <option value="c??libataire">C??libataire</option>
                      <option value="veuve">Veuve</option>
                      <option value="mari??e">Mari??e</option>
                      <option value="d??vorc??e">D??vorc??e</option>
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

export default TablesTableRowUser;
