import React, { Component, useState } from 'react'

import { useLocation, NavLink } from 'react-router-dom'

import { Nav } from 'react-bootstrap'

import logo from 'assets/img/reactlogo.png'
import { Button, Style } from 'react-bootstrap'

import axios from 'axios'

const BACKEND_ADDRESS = '20.84.65.34'

function SingleAlert(props) {
  const severityBGs = {
    MAJOR: '#CC0000',
    ERROR: '#D94C20',
    WARN: '#FFBB33',
    NORMAL: '#45AB07',
  }

  return (
    <tr>
      <td style={{ fontSize: '12px' }}>{props.alertTime}</td>
      <td>{props.alertName}</td>
      <td>{props.alertDescription}</td>
      <td
        style={{
          color: severityBGs[props.alertSeverity],
          fontWeight: 'bold',
        }}
      >
        {props.alertSeverity}
      </td>
      <td>{props.contactName}</td>
      <td>{props.contactPhoneNum}</td>
      <td>{props.teamName}</td>
    </tr>
  )
}

export default SingleAlert
