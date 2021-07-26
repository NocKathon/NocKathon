import SingleAlert from 'components/Alerts/SingleAlert'
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
function Alerts() {
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
        <Row>
          <Col md='12'>
            <Card className='strpied-tabled-with-hover'>
              <Card.Header>
                <Card.Title as='h4'>Alerts</Card.Title>
                <p className='card-category'>Current alerts</p>
              </Card.Header>
              <Card.Body className='table-full-width table-responsive px-0'>
                <Table className='table-hover table-striped'>
                  <thead>
                    <tr>
                      <th className='border-0'>Time</th>
                      <th className='border-0'>Alert Name</th>
                      <th className='border-0'>Alert description</th>
                      <th className='border-0'>Alert severity</th>
                      <th className='border-0'>Contact Name</th>
                      <th className='border-0'>Contact phone</th>
                      <th className='border-0'>Team Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alerts.map((alert) => {
                      return (
                        <SingleAlert
                          key={alerts.indexOf(alert)}
                          alertTime={alert.time}
                          alertName={alert.name}
                          alertDescription={alert.description}
                          alertSeverity={alert.severity}
                          contactName={alert.tc.fullName}
                          contactPhoneNum={alert.tc.phoneNumber}
                          teamName={alert.tc.teamName}
                        />
                      )
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Alerts
