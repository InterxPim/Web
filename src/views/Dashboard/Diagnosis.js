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
import TablesTableRow from "components/Tables/Table2";
//const textColor = useColorModeValue("gray.700", "white");
class Tables extends React.Component {

render(){

  return (
    <>
    <Flex direction="column" pt={{ base: "120px", md: "75px" }}>
      <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
        <CardHeader p="6px 0px 22px 0px">
        <Flex justify="space-between" align="center" mb="1rem" w="100%">
          <Text fontSize="xl" color="gray.700" fontWeight="bold">
          Diagnostique
          </Text>
         
            </Flex>
        </CardHeader>
        <CardBody>
          <Table variant="simple" color="gray.700">
            <Thead>
              <Tr my=".8rem" pl="0px" color="gray.400">
                <Th  color="gray.400">
               Type de cellule
                </Th>
                <Th color="gray.400">Position de cellule</Th>
               
                <Th></Th>
                       
              </Tr>
            </Thead>
            <Tbody>
          
                  <TablesTableRow
                   id=""
                    firstname=""
                  
                  />
      
            </Tbody>
          </Table>
        </CardBody>
      </Card>
   
    </Flex>
  
    </>
    )
  }
  }
export default Tables;
