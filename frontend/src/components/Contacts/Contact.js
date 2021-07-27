import React, { Component, useState } from 'react'

import { useLocation, NavLink } from 'react-router-dom'
import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap'
import logo from 'assets/img/reactlogo.png'

import axios from 'axios'

const BACKEND_ADDRESS = '20.84.65.34'
function Contact(props) {
  let contact = props.location.props.contact
  return (
    <>
      <Container fluid>
        <Row>
          <Col md='8'>
            <Card>
              <Card.Header>
                <Card.Title as='h4'>Nithan Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className='pr-1' md='5'>
                      <Form.Group>
                        <label>Username</label>
                        <Form.Control
                          value={contact.name}
                          disabled
                          type='text'
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col className='px-1' md='5'>
                      <Form.Group>
                        <label>Phone Num</label>
                        <Form.Control
                          value={contact.phoneNumber}
                          disabled
                          type='text'
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md='10'>
                      <Form.Group>
                        <label>משפט שישמח לשמוע ב-3 בלילה</label>
                        <Form.Control
                          value={contact.mishpatPtiha}
                          disabled
                          type='text'
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className='pr-1' md='10'>
                      <Form.Group>
                        <label>Team Name</label>
                        <Form.Control
                          value={contact.teamName}
                          disabled
                          type='text'
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md='10'>
                      <Form.Group>
                        <label>תחביבים</label>
                        <Form.Control
                          value={contact.hobbies}
                          rows='2'
                          disabled
                          as='textarea'
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <div className='clearfix'></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
          <Col md='4'>
            <Card className='card-user'>
              <div className='card-image'>
                <img
                  alt='...'
                  src={
                    require('assets/img/photo-1431578500526-4d9613015464.jpeg')
                      .default
                  }
                ></img>
              </div>
              <Card.Body>
                <div className='author'>
                  <a href='#pablo' onClick={(e) => e.preventDefault()}>
                    <img
                      alt='...'
                      className='avatar border-gray'
                      src={contact.profilePhotoLink}
                    ></img>
                    <h5 className='title'>{contact.name}</h5>
                  </a>
                  <p className='description text-center'>
                    {contact.phoneNumber}
                  </p>
                  <p className='description'>{`"${contact.mishpatPtiha}"`}</p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Contact
