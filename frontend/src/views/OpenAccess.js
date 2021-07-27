import React from 'react'

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
  InputGroup,
  FormControl,
} from 'react-bootstrap'

import play from 'assets/img/play.png'
import { InputGroupText } from 'reactstrap'
import SingleProject from 'components/OpenAccess/SingleProject'
import { useState } from 'react'
import axios from 'axios'
import { sys } from 'typescript'
const BACKEND_ADDRESS = '20.84.65.34'

class OpenAccessProject {
  constructor(systemID, systemName, teamName, contact) {
    this.systemID = systemID
    this.systemName = systemName
    this.teamName = teamName
    this.contact = contact
  }
}

var wereJobsLoaded = false
function OpenAccess() {
  const [rdJobs, setRDJobs] = useState([])
  if (!wereJobsLoaded) {
    console.log('Get all jobs from rundeck')
    axios
      .get(`http://${BACKEND_ADDRESS}:2424/rundeck/jobs`, {
        timeout: 0,
      })
      .then((res) => {
        console.log(res)
        setRDJobs(res.data)
      })
      .catch((error) => {
        console.log(error)
        setRDJobs([])
        console.error('There was an error!', error)
      })
    wereJobsLoaded = true
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col md='12'>
            <Card className='strpied-tabled-with-hover'>
              <Card.Header>
                <Card.Title as='h4'>Open Accesses</Card.Title>
                <p className='card-category'>
                  Cloud systems & last access tests
                </p>
              </Card.Header>
              <Card.Body className='table-full-width table-responsive px-0'>
                <Container>
                  <Button
                    className='mr-2'
                    onClick={() => {
                      console.log('Get all jobs from rundeck')
                      axios
                        .get(`http://${BACKEND_ADDRESS}:2424/rundeck/jobs`, {
                          timeout: 0,
                        })
                        .then((res) => {
                          console.log(res)
                          setRDJobs(res.data)
                        })
                        .catch((error) => {
                          console.log(error)
                          setRDJobs('UNKNOWN')
                          console.error('There was an error!', error)
                        })

                      console.log('AFTER SEND')
                    }}
                  >
                    <img src={require('assets/img/refresh.svg').default} />
                  </Button>

                  <Button
                    onClick={() => {
                      console.log('Run all Open-Access')
                      for (let index = 0; index < rdJobs.length; index++) {
                        const element = document.getElementById('job_' + index)
                        element.click()
                      }
                      console.log('AFTER SEND')
                    }}
                  >
                    Run all
                    <img
                      className='pl-2'
                      src={require('assets/img/play.png').default}
                    />
                  </Button>

                  <InputGroup className='mb-3 pt-4'>
                    <FormControl placeholder='System Name' />
                    <InputGroup.Text>
                      <img src={require('assets/img/search.png').default} />
                    </InputGroup.Text>
                  </InputGroup>

                  <Table className='table-hover table-striped'>
                    <thead>
                      <tr>
                        <th className='border-0'>System Name</th>
                        <th className='border-0'>Last Status</th>
                        <th className='border-0'>Team Name</th>
                        <th className='border-0'>Contact</th>
                        <th className='border-0'>Check Now</th>
                        <th className='border-0'>View History</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rdJobs.map((job) => {
                        return (
                          <SingleProject
                            key={rdJobs.indexOf(job)}
                            systemID={rdJobs.indexOf(job)}
                            systemName={job.systemName}
                            teamName={job.teamName}
                            contact='Zief'
                          />
                        )
                      })}
                    </tbody>
                  </Table>
                </Container>{' '}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default OpenAccess
