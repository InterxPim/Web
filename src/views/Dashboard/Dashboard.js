// Chakra imports
import {
  Flex,
  SimpleGrid,
  Spacer,
  Stat,

  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import axios from 'axios';

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import BarChart from "components/Charts/BarChart";
import LineChart from "components/Charts/LineChart";
import IconBox from "components/Icons/IconBox";
// Custom icons
import {
  CartIcon,
  DocumentIcon,
  GlobeIcon,
  RocketIcon,
  StatsIcon,
  WalletIcon,
} from "components/Icons/Icons.js";
import DashboardTableRow from "components/Tables/DashboardTableRow";
import TimelineRow from "components/Tables/TimelineRow";
import React, { useState } from "react";
class Dashboard extends React.Component {
  componentDidMount() {
    axios.get(`http://localhost:9091/api/reservations/allReser`)
    .then(res => {
      const resdata = res.data;
      this.setState({ resdata });
    })
    axios.get(`http://localhost:9091/api/hospital/all`)
    .then(res => {
      const hosdata = res.data;
      this.setState({ hosdata });
    })
    axios.get(`http://localhost:9091/api/patient/all`)
    .then(res => {
      const pasdata = res.data;
      this.setState({ pasdata });
    })
  }
  constructor() {
    super()
   
   this.state = {
     resdata:[],
     hosdata:[],
     pasdata:[]
     
   }
   }
  render(){

  return (
    <Flex flexDirection="column" pt={{ base: "120px", md: "75px" }}>
      <SimpleGrid columns={{ sm: 1, md: 2, xl: 4 }} spacing="24px">
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Nombre d'hopitaux
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color="gray.700">
                    {this.state.hosdata.length.toString()}
                  </StatNumber>
                 
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg="green">
                <WalletIcon h={"24px"} w={"24px"} color="white" />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat me="auto">
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Nombre de patients
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color="gray.700">
                  {this.state.pasdata.length.toString()}
                  </StatNumber>
                
                   
                </Flex>
              </Stat>
              <IconBox as="box" h={"45px"} w={"45px"} bg="green">
                <GlobeIcon h={"24px"} w={"24px"} color="white" />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
        <Card minH="83px">
          <CardBody>
            <Flex flexDirection="row" align="center" justify="center" w="100%">
              <Stat>
                <StatLabel
                  fontSize="sm"
                  color="gray.400"
                  fontWeight="bold"
                  pb=".1rem"
                >
                  Nombre de réservations
                </StatLabel>
                <Flex>
                  <StatNumber fontSize="lg" color="gray.700">
                  {this.state.resdata.length.toString()}
                  </StatNumber>
                
                </Flex>
              </Stat>
              <Spacer />
              <IconBox as="box" h={"45px"} w={"45px"} bg="green">
                <DocumentIcon h={"24px"} w={"24px"} color="white" />
              </IconBox>
            </Flex>
          </CardBody>
        </Card>
     
      </SimpleGrid>
     <br/>
     <br/>
  <BarChart/>
    </Flex>
     )
    }
    }
  export default Dashboard;
  