import React, { useState } from 'react'

import axios from 'axios'

// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from 'react-bootstrap'

const BACKEND_ADDRESS = '20.84.65.34'

var wereAlertsLoaded = false
function Knowledges() {
  const [alerts, setAlerts] = useState([])
  if (!wereAlertsLoaded) {
    axios
      .get(`http://${BACKEND_ADDRESS}:2424/alerts/formatted`, {
        timeout: 0,
      })
      .then((res) => {
        console.log(res.data[0]['name'])
        setAlerts(res.data)
      })
      .catch((error) => {
        console.log(error)
        console.error('There was an error!', error)
      })
    wereAlertsLoaded = true
    console.log('AFTER SEND')
  }
  return (
    <>
      <Container fluid>
        <h2>NOC HAFIFA</h2>
        <h4>
          This is the NOC HAFIFA.
          <br />
          bla bla bla Kafka.
          <br />
          bla bla bla Openshift.
          <br /> bla bla bla Cluod...
        </h4>
      </Container>
    </>
  )
}

export default Knowledges
