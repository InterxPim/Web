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
   
    render() {
  
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
                 
                  </Text>
                </Flex>
              </Flex>
            </Td>
     
            <Td >
              <Flex align="center" >
                <Flex direction="column">
                  <Text
                    fontSize="md"
                    color="gray.700"
                    fontWeight="bold"
  
                  >
               
                  </Text>
                </Flex>
              </Flex>
            </Td>
      
  
          </Tr>
         
        
        </>
      );
    }
  }
  export default TablesTableRow;
  