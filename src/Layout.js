import './Layout.css'

import { AppBar, Button, LinearProgress, Toolbar } from '@material-ui/core'
import Routes, { navigate } from './Routes'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'

import { AccountCircle } from '@material-ui/icons'
import { Home } from '@material-ui/icons'
import React from 'react'

const theme = createMuiTheme({})

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#000',
  },
}))

export default function MUI() {
  const notificationState = useSelector((state) => state.notification)
  const authenticationState = useSelector((state) => state.authentication)
  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" classes={{ root: classes.root }}>
        <Toolbar variant="dense">
          <Button
            color="inherit"
            onClick={() => {
              navigate('home')
            }}
            startIcon={<Home />}
          >
            Home
          </Button>
          {'name' in authenticationState.user ? (
            <Button
              color="inherit"
              onClick={() => {
                navigate('users_me')
              }}
              startIcon={<AccountCircle />}
            >
              {authenticationState.user.name}
            </Button>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                navigate('auth')
              }}
              variant="outlined"
              startIcon={<AccountCircle />}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <div
        style={{
          width: '100%',
          position: 'fixed',
          display: 'flex',
          alignItems: 'flex-end',
          height: theme.mixins.toolbar.minHeight + 16,
        }}
      >
        <LinearProgress
          variant="indeterminate"
          color="primary"
          style={{ flex: 1 }}
          hidden={!notificationState.loading}
        />
      </div>
      <div style={{ minHeight: theme.mixins.toolbar.minHeight }} />
      <div className="flex-container">
        <Routes />
      </div>
    </ThemeProvider>
  )
}
