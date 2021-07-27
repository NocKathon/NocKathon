import React, { Component, useState } from 'react'

import { useLocation, NavLink } from 'react-router-dom'

import { Container, Nav } from 'react-bootstrap'

import logo from 'assets/img/reactlogo.png'
import { Button, Style } from 'react-bootstrap'

import axios from 'axios'

const BACKEND_ADDRESS = '20.84.65.34'

function ViewHistory(props) {
  return (
    <Container>
      <div>
        {props.historyItem['date-started']}: {props.historyItem.status}
      </div>
    </Container>
  )
}

export default ViewHistory
