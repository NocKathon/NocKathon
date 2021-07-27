import React, { Component, useState } from 'react'

import { useLocation, NavLink, Link } from 'react-router-dom'

import { Nav } from 'react-bootstrap'

import logo from 'assets/img/reactlogo.png'
import { Button, Style } from 'react-bootstrap'

import axios from 'axios'
import Contact from 'components/Contacts/Contact'

const BACKEND_ADDRESS = '20.84.65.34'

function SingleAlert(props) {
  var wasContactLoaded = false
  const [contact, setContact] = useState({})
  if (!wasContactLoaded) {
    axios
      .get(
        `http://${BACKEND_ADDRESS}:2424/users/${props.contactName
          .toLowerCase()
          .replace(' ', '_')}`,
        {
          timeout: 0,
        }
      )
      .then((res) => {
        console.log(res.data)
        setContact(res.data)
      })
      .catch((error) => {
        console.log(error)
        console.error('There was an error!', error)
      })
    wasContactLoaded = true
    console.log('AFTER SEND')
  }
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
      <td>
        {contact ? (
          <Link to={{ pathname: '/admin/toran', props: { contact } }}>
            {props.contactName}
          </Link>
        ) : (
          <div>{props.contactName}</div>
        )}
      </td>
      <td>{props.contactPhoneNum}</td>
      <td>{props.teamName}</td>
    </tr>
  )
}

export default SingleAlert
