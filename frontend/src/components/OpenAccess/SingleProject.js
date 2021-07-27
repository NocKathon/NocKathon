import React, { Component, useState } from 'react'

import { useLocation, NavLink } from 'react-router-dom'

import { Container, Nav } from 'react-bootstrap'

import logo from 'assets/img/reactlogo.png'
import { Button, Style } from 'react-bootstrap'

import axios from 'axios'
import ViewHistory from './ViewHistory'

const BACKEND_ADDRESS = '20.84.65.34'
var wasLatestStatusLoaded = false
function SingleProject(props) {
  const [status, setStatus] = useState('UNKNOWN')
  const [time, setTime] = useState('UNKNOWN')
  const [history, setHistory] = useState([])
  const statusBgs = {
    UNKNOWN: 'black',
    SUCCEEDED: 'green',
    FAILED: 'red',
    'Loading...': 'grey',
  }
  if (!wasLatestStatusLoaded) {
    axios
      .get(
        `http://${BACKEND_ADDRESS}:2424/rundeck/latest/${props.systemName}`,
        { timeout: 0 }
      )
      .then((res) => {
        setStatus(res.data.status)
        setTime(res.data.time)
      })
      .catch((error) => {
        setStatus('UNKNOWN')
        setTime('UNKNOWN')
      })
  }

  return (
    <tr>
      <td>
        {props.systemName}
        {history.map((historyItem) => {
          ;<ViewHistory
            key={history.indexOf(historyItem)}
            historyItem={historyItem}
          />
        })}
      </td>
      <td style={{ color: statusBgs[status], fontWeight: 'bold' }}>
        <div>{status}</div>
        <div style={{ fontSize: 10 }}>{time}</div>
      </td>
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
                setStatus(res.data.status)
                setTime(res.data.time)
              })
              .catch((error) => {
                console.log(error)
                setStatus('UNKNOWN')
                setTime('UNKNOWN')
                console.error('There was an error!', error)
              })

            console.log('AFTER SEND')
          }}
        >
          <img src={require('assets/img/play.png').default} alt='...' />
        </Button>
      </td>
      <td>
        <Button>
          <img src={require('assets/img/eye.svg').default} alt='...' />
        </Button>
      </td>
    </tr>
  )
}

export default SingleProject
