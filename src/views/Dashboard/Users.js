
import React from "react";
import axios from "axios";

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
import TablesTableRow from "components/Tables/TablesTableRow";

class Users extends React.Component {

   
    componentDidMount() {
        axios.get(`http://localhost:9091/api/users/all`)
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
      email: '',
      birthday: '',
      gender: '',
      situationF: '',
      age: '',
      //password:'',
      hospital:'',
      modalIsOpen: false,
      resdata:[]
    }
    }
    handleChange(evt, field) {
      this.setState({ [field]: evt.target.value });
    
    }
    handleSubmit = async (event) => {
    
      event.preventDefault();
      const user = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        phone: this.state.phone,
        email: this.state.email,
        birthday: this.state.birthday,
        age: this.state.age,
        //password:this.state.password,
        situationF: this.state.situationF,
        gender: this.state.gender,
        hospital:sessionStorage.getItem("id"),

      }
      axios.post("http://localhost:9091/api/users/createUsers", user)
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
                                Employes for your Hospital
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
                                <Icon as={FaPlus} me="6px" />
                                Ajouter un user
                            </Button>
                        </Flex>

                    </CardHeader>

                    <CardBody>
                        <Table variant="simple" color={"gray.700"}>
                            <Thead>
                                <Tr my=".8rem" pl="0px" color="gray.400">
                                    <Th pl="0px" color="gray.400">
                                        Utilisateur
                                    </Th>
                                    <Th color="gray.400">Phone</Th>
                                    <Th color="gray.400">Birthday</Th>
                                    <Th color="gray.400">Gender</Th>
                                    <Th color="gray.400">Situation Familialle</Th>
                                    <Th color="gray.400">Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {this.state.resdata.map((row) => {
                                    return (
                                        <TablesTableRow
                                            id={row._id}
                                            firstname={row.firstname}
                                            lastname={row.lastname}
                                            phone={row.phone}
                                            age={row.age}
                                            email={row.email}
                                            password={row.password}
                                            birthday={row.birthday}
                                            gender={row.gender}
                                            situationF={row.situationF}
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
                 <ModalHeader>Ajouter un user</ModalHeader>
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
                     <Input onChange={(event) => this.handleChange(event, "firstname")} placeholder="Prénom" />
                          </InputGroup>     
                          <InputGroup>
                      <InputLeftElement
                        pointerEvents='none'
                        children={<AiOutlineFontColors color='gray.300' />}
                      />  
                     <Input onChange={(event) => this.handleChange(event, "lastname")} placeholder="Nom" />
                     </InputGroup>
                    </Flex>
                    
                    <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiFillPhone color='gray.300' />}
                    />
                     <Input onChange={(event) => this.handleChange(event, "phone")} placeholder="Téléphone" />
                     </InputGroup>
                     <FormLabel>Email</FormLabel>
                     <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiOutlineMail color='gray.300' />}
                    />
                     <Input type="email"  onChange={(event) => this.handleChange(event, "email")} placeholder="email" />
                     </InputGroup>
                     <FormLabel>age</FormLabel>
                     <Input onChange={(event) => this.handleChange(event, "age")} placeholder="age" />
                     <FormLabel>birthday</FormLabel>
                     <InputGroup>
                    <InputLeftElement
                      pointerEvents='none'
                      children={<AiTwotoneCalendar color='gray.300' />}
                    />
                     <Input onChange={(event) => this.handleChange(event, "birthday")} placeholder="birthday" />
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
                color="white" mr={3}>
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

export default Users;
