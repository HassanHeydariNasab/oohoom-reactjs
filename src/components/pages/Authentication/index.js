import './index.css'

import {
  Button,
  Card,
  LinearProgress,
  TextField,
  Typography,
  makeStyles
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {
  setLoadingAction,
  setMobileAction
} from '../../../redux/actions/authentication'
import {
  slideDisplayFlexAction,
  slideFadeInAction,
  slideFadeOutAction
} from '../../../redux/actions/slide'
import { useDispatch, useSelector } from 'react-redux'

import { codeAction } from '../../../redux/actions/api'

function slide_class(name, slideFadeIn, slideFadeOut, slideDisplayFlex) {
  return `slide ${slideFadeIn === name ? 'fade-in' : ''} ${
    slideFadeOut === name ? 'fade-out' : ''
  } ${slideDisplayFlex === name ? 'display-flex' : ''}`
}

function Authentication() {
  useEffect(() => {}, [])
  const dispatch = useDispatch()
  const authenticationState = useSelector(state => state.authentication)

  return (
    <Card id="center-card">
      <LinearProgress
        variant="indeterminate"
        style={{ width: '100%', position: 'fixed', top: '1rem' }}
        color="primary"
        hidden={!authenticationState.loading}
      />
      <div
        id="start"
        className={slide_class(
          'start',
          authenticationState.slide_fade_in,
          authenticationState.slide_fade_out,
          authenticationState.slide_display_flex
        )}
      >
        <Typography variant="h1">oohoom</Typography>
        <Typography variant="h4" align="center">
          is a great group of translators
        </Typography>
        <Button
          variant="outlined"
          onClick={e => {
            dispatch(slideFadeOutAction('start'))
            dispatch(slideFadeInAction('nothing'))
            setTimeout(() => {
              dispatch(slideDisplayFlexAction('code'))
            }, 1000)
            setTimeout(() => {
              dispatch(slideFadeInAction('code'))
            }, 1300)
          }}
          size="large"
          style={{ marginTop: '10rem' }}
        >
          Start
        </Button>
      </div>
      <div
        id="code"
        className={slide_class(
          'code',
          authenticationState.slide_fade_in,
          authenticationState.slide_fade_out,
          authenticationState.slide_display_flex
        )}
      >
        <Typography variant="h2" align="center">
          mobile verification
        </Typography>
        <TextField
          label="mobile"
          helperText="ex: 00989389742591"
          style={{ marginTop: '5rem' }}
          value={authenticationState.mobile}
          onChange={e => {
            dispatch(setMobileAction(e.target.value))
          }}
        />
        <Button
          variant="contained"
          onClick={e => {
            dispatch(codeAction(authenticationState.mobile))
            dispatch(setLoadingAction(true))
          }}
          disabled={authenticationState.loading}
          size="large"
          style={{ marginTop: '10rem' }}
          color='primary'
        >
          Send me a sms
        </Button>
      </div>
      <div
        id="login"
        className={slide_class(
          'login',
          authenticationState.slide_fade_in,
          authenticationState.slide_fade_out,
          authenticationState.slide_display_flex
        )}
      >
        <Typography variant="h2">Login</Typography>
        <TextField
          label="code"
          helperText="code you recieved"
          style={{ marginTop: '5rem' }}
        />
        <Button
          variant="contained"
          onClick={e => {}}
          size="large"
          style={{ marginTop: '10rem' }}
        >
          Login
        </Button>
      </div>
      <div
        id="register"
        className={slide_class(
          'register',
          authenticationState.slide_fade_in,
          authenticationState.slide_fade_out,
          authenticationState.slide_display_flex
        )}
      >
        <Typography variant="h2">Register</Typography>
        <TextField
          label="code"
          helperText="code you recieved"
          style={{ marginTop: '5rem' }}
        />
        <TextField
          label="name"
          helperText="a unique name"
          style={{ marginTop: '2rem' }}
        />
        <Button
          variant="contained"
          onClick={e => {}}
          size="large"
          style={{ marginTop: '10rem' }}
        >
          Register
        </Button>
      </div>
    </Card>
  )
}

export default Authentication
