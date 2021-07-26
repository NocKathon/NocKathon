import React, { Component, useState } from 'react'

import { useLocation, NavLink } from 'react-router-dom'

import { Nav } from 'react-bootstrap'

import logo from 'assets/img/reactlogo.png'
import { Button, Style } from 'react-bootstrap'

import axios from 'axios'

const BACKEND_ADDRESS = '20.84.65.34'
function SingleProject(props) {
  const [status, setStatus] = useState('UNKNOWN')
  const statusBgs = {
    UNKNOWN: 'black',
    SUCCEEDED: 'green',
    FAILED: 'red',
    'Loading...': 'grey',
  }

  return (
    <tr>
      <td>{props.systemName}</td>
      <td style={{ color: statusBgs[status], fontWeight: 'bold' }}>{status}</td>
      <td>{props.teamName}</td>
      <td>{props.contact}</td>
      <td>
        <Button
          id={'job_' + props.systemID}
          onClick={() => {
            setStatus('Loading...')

            console.log('SEND NOW to rundeck')
            axios
              .get(
                `http://${BACKEND_ADDRESS}:2424/rundeck/team/${props.systemName}`,
                { timeout: 0 }
              )
              .then((res) => {
                console.log(res)
                setStatus(res.data)
              })
              .catch((error) => {
                console.log(error)
                setStatus('UNKNOWN')
                console.error('There was an error!', error)
              })

            console.log('AFTER SEND')
          }}
        >
          <img src={require('assets/img/play.png').default} alt='...' />
        </Button>
      </td>
    </tr>
  )
}

export default SingleProject
