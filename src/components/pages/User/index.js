import './index.scss'

import { Add, EditOutlined } from '@material-ui/icons'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Avatar,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { fetchUserAction } from '../../../redux/actions/api'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '../../../Routes'

const User = ({ t, user_name }) => {
  useEffect(() => {
    // NOTE: fetchAuthenticatedUserAction gets called for the authenticated user from Layout.js
    if (user_name !== 'me') {
      dispatch(fetchUserAction(user_name))
    }
  }, [])
  const dispatch = useDispatch()
  const authenticationState = useSelector((state) => state.authentication)
  const userState = useSelector((state) => state.user)
  const user = user_name === 'me' ? authenticationState.user : userState.user
  return (
    <Card className="user-card">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Avatar>{user?.name?.[0]?.toUpperCase()}</Avatar>
        <div style={{ margin: '1rem 1rem' }}>{user?.name}</div>
      </div>
    </Card>
  )
}

export default User
