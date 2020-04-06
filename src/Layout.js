import './Layout.css'

import { AppBar, Button, LinearProgress, Toolbar } from '@material-ui/core'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles
} from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'

import React from 'react'
import Routes from './Routes'

const theme = createMuiTheme({})

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: '#000'
  }
}))

export default function MUI() {
  const notificationState = useSelector(state => state.notification)
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" classes={{ root: classes.root }}>
        <Toolbar>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <div
        style={{
          width: '100%',
          position: 'fixed',
          display: 'flex',
          alignItems: 'flex-end',
          height: theme.mixins.toolbar.minHeight + 16
        }}
      >
        <LinearProgress
          variant="indeterminate"
          color="primary"
          style={{ flex: 1 }}
          hidden={!notificationState.loading}
        />
      </div>
      <div className={classes.height} />
      <div className="flex-container">
        <Routes />
      </div>
    </ThemeProvider>
  )
}
