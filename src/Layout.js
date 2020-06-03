import './Layout.css'

import { AccountCircle, ExitToAppOutlined } from '@material-ui/icons'
import { AppBar, Button, LinearProgress, Toolbar } from '@material-ui/core'
import React, { useEffect } from 'react'
import Routes, { navigate } from './Routes'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'

import { Home } from '@material-ui/icons'
import { LOGOUT } from './redux/constants/authentication'
import { fetchUserAction } from './redux/actions/api'
import { logoutAction } from './redux/actions/authentication'

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
  const dispatch = useDispatch()

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      dispatch(fetchUserAction('me'))
    }
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" classes={{ root: classes.root }}>
        <Toolbar variant="dense">
          <Button
            color="inherit"
            onClick={() => {
              navigate('/', 'home', {})
            }}
            startIcon={<Home />}
          >
            Home
          </Button>
          {authenticationState.user ? (
            <>
              <Button
                color="inherit"
                onClick={() => {
                  navigate('/users/me')
                }}
                startIcon={<AccountCircle />}
              >
                {authenticationState.user.name}
              </Button>
              <Button
                color="inherit"
                onClick={() => {
                  dispatch(logoutAction(true))
                }}
                startIcon={<ExitToAppOutlined />}
              >
                Logout
              </Button>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                let back_url = window.location.pathname
                if (back_url === '/auth/') {
                  back_url = '/'
                }
                navigate(`/auth/?back_url=${back_url}`)
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
