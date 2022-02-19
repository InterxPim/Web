import React from 'react'
import styled from 'styled-components'
import Nav from './Nav'
import NewDepositBtn from './NewDepositBtn'
import Deposits from './Deposits/Deposits'
import axios from 'axios';
import depositData from '../../DepositData.json'

const Container = styled.div`
    width: auto;
    margin-left: 16rem;
    position: relative;
    padding: 0 4rem;
`
class Main extends React.Component  {
    componentDidMount() {
        axios.get(`http://localhost:9091/api/reservations/allReser`)
        .then(res => {
          const resdata = res.data;
          this.setState({ resdata });
 }) }
 constructor() {
     super()
    this.state = {
        resdata:[]
    }
}

         render(){
    return (
        <Container>
            <Nav />
            <NewDepositBtn />
            <Deposits title="Reservations non traités" count={2} data={this.state.resdata} />
            <Deposits title="Reservations traités" count={0} data={[]} />
        </Container>
    )
}
}
export default Main
