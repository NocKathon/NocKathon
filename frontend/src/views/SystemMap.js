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

const sitesColors = {
  Marganit: '#66b2ff',
  Mamram: '#ffb266',
}
const systems = [
  {
    name: "Tirat Ha'Agam",
    site: 'Marganit',
  },
  {
    name: 'RH-SSO',
    site: 'Mamram',
  },
  {
    name: 'NiFi Registry',
    site: 'Marganit',
  },
]

function SiteMap() {
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
                <Card.Title as='h4'>System Site Mapping</Card.Title>
                <p className='card-category'>
                  Map system to current primary site
                </p>
              </Card.Header>
              <Card.Body className='table-full-width table-responsive px-0'>
                <Table className='table-hover table-striped'>
                  <thead>
                    <tr>
                      <th className='border-0'>System Name</th>
                      <th className='border-0'>Current Site</th>
                    </tr>
                  </thead>
                  <tbody>
                    {systems
                      .sort((a, b) => b.site - a.site)
                      .map((s) => (
                        <tr>
                          <td>{s.name}</td>
                          <td
                            style={{
                              backgroundColor: sitesColors[s.site],
                            }}
                          >
                            {s.site}
                          </td>
                        </tr>
                      ))}
                    {/* <tr>
                      <td>Tirat HaAgam</td>
                      <td style={{ backgroundColor: 'blue' }}>Marganit</td>
                    </tr>
                    <tr>
                      <td>RH-SSO</td>
                      <td style={{ backgroundColor: 'purple ' }}>Mamram</td>
                    </tr>
                    <tr>
                      <td>NiFi Registry</td>
                      <td style={{ backgroundColor: 'blue' }}>Marganit</td>
                    </tr> */}
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

export default SiteMap
