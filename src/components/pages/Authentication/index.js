import './index.css'

import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core'
import {
  CODE_ERROR,
  REGISTRATION_ERROR,
  TOKEN_ERROR,
} from '../../../redux/constants/api'
import React, { useEffect } from 'react'
import {
  clearErrorsAction,
  setFieldAction,
} from '../../../redux/actions/general'
import {
  codeAction,
  registrationAction,
  tokenAction,
} from '../../../redux/actions/api'
import {
  slideDisplayFlexAction,
  slideFadeInAction,
  slideFadeOutAction,
} from '../../../redux/actions/slide'
import { useDispatch, useSelector } from 'react-redux'

import { KeyboardArrowLeft } from '@material-ui/icons'
import { setLoadingAction } from '../../../redux/actions/notification'

function slide_class(name, slideFadeIn, slideFadeOut, slideDisplayFlex) {
  return `slide ${slideFadeIn === name ? 'fade-in' : ''} ${
    slideFadeOut === name ? 'fade-out' : ''
  } ${slideDisplayFlex === name ? 'display-flex' : ''}`
}

function Authentication() {
  useEffect(() => {}, [])
  const dispatch = useDispatch()
  const authenticationState = useSelector((state) => state.authentication)
  const notificationState = useSelector((state) => state.notification)
  const generalState = useSelector((state) => state.general)

  return (
    <div id="center-card">
      <div
        id="start"
        className={slide_class(
          'start',
          authenticationState.slide_fade_in,
          authenticationState.slide_fade_out,
          authenticationState.slide_display_flex
        )}
      >
        <Typography variant="h2">Who are you?</Typography>
        <Button
          variant="outlined"
          onClick={() => {
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
          style={{ marginTop: '5rem' }}
        >
          login / register
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
        <form
          autoComplete="off"
          action="javascript:;"
          onSubmit={() => {
            dispatch(codeAction(generalState.auth__mobile))
            dispatch(setLoadingAction(true))
          }}
        >
          <TextField
            label="mobile"
            helperText={
              generalState[CODE_ERROR]?.mobile
                ? generalState[CODE_ERROR].mobile
                : 'example:00989389742591'
            }
            style={{ marginTop: '3rem' }}
            variant="outlined"
            fullWidth
            value={generalState.auth__mobile}
            onChange={(e) => {
              dispatch(setFieldAction('auth', 'mobile', e.target.value))
              dispatch(clearErrorsAction(CODE_ERROR))
            }}
            error={Boolean(generalState[CODE_ERROR]?.mobile)}
            type="tel"
          />
          <Button
            variant="contained"
            disabled={notificationState.loading}
            size="large"
            style={{ marginTop: '3rem' }}
            color="primary"
            type="submit"
          >
            Send me a sms
          </Button>
        </form>
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
        <form
          autoComplete="off"
          action="javascript:;"
          onSubmit={() => {
            dispatch(
              tokenAction(generalState.auth__mobile, generalState.auth__code)
            )
            dispatch(setLoadingAction(true))
          }}
        >
          <TextField
            label="code"
            style={{ marginTop: '5rem' }}
            helperText={
              generalState[TOKEN_ERROR]?.code
                ? generalState[TOKEN_ERROR].code
                : 'code you recieved'
            }
            variant="outlined"
            fullWidth
            value={generalState.auth__code}
            onChange={(e) => {
              dispatch(setFieldAction('auth', 'code', e.target.value))
              dispatch(clearErrorsAction(TOKEN_ERROR))
            }}
            error={Boolean(generalState[TOKEN_ERROR]?.code)}
            type="number"
          />
          <div style={{ width: '100%', marginTop: '3rem', display: 'flex' }}>
            <Button
              onClick={() => {
                dispatch(slideFadeOutAction('login'))
                dispatch(slideFadeInAction('nothing'))
                setTimeout(() => {
                  dispatch(slideDisplayFlexAction('code'))
                }, 1000)
                setTimeout(() => {
                  dispatch(slideFadeInAction('code'))
                }, 1300)
              }}
              size="large"
              color={'primary'}
              startIcon={<KeyboardArrowLeft />}
            >
              correct mobile
            </Button>
            <div style={{ flex: 1 }} />
            <Button
              variant="contained"
              disabled={notificationState.loading}
              size="large"
              color="primary"
              type="submit"
            >
              Login
            </Button>
          </div>
        </form>
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
        <form
          autoComplete="off"
          action="javascript:;"
          onSubmit={() => {
            dispatch(
              registrationAction(
                generalState.auth__mobile,
                generalState.auth__code,
                generalState.auth__name,
                generalState.auth__role,
                // generalState.auth__skills
                []
              )
            )
            dispatch(setLoadingAction(true))
          }}
        >
          <TextField
            label="code"
            style={{ marginTop: '5rem' }}
            helperText={
              generalState[REGISTRATION_ERROR]?.code
                ? generalState[REGISTRATION_ERROR].code
                : 'code you recieved'
            }
            variant="outlined"
            fullWidth
            value={generalState.auth__code}
            onChange={(e) => {
              dispatch(setFieldAction('auth', 'code', e.target.value))
              dispatch(clearErrorsAction(REGISTRATION_ERROR))
            }}
            error={Boolean(generalState[REGISTRATION_ERROR]?.code)}
            type="number"
          />
          <TextField
            label="name"
            style={{ marginTop: '3rem' }}
            helperText={
              generalState[REGISTRATION_ERROR]?.name
                ? generalState[REGISTRATION_ERROR].name[0]
                : 'valid: lowercase letters, numbers and _'
            }
            variant="outlined"
            fullWidth
            value={generalState.auth__name}
            onChange={(e) => {
              dispatch(setFieldAction('auth', 'name', e.target.value))
              dispatch(clearErrorsAction(REGISTRATION_ERROR))
            }}
            error={Boolean(generalState[REGISTRATION_ERROR]?.name)}
          />

          <FormControl
            component="fieldset"
            style={{
              alignSelf: 'flex-start',
              marginTop: '3rem',
              marginLeft: '1rem',
            }}
          >
            <FormLabel component="legend">I'm an</FormLabel>
            <RadioGroup
              aria-label="role"
              name="role"
              value={generalState.auth__role}
              onChange={(e) => {
                dispatch(setFieldAction('auth', 'role', e.target.value))
              }}
            >
              <FormControlLabel
                value="employee"
                control={<Radio />}
                label="Employee"
              />
              <FormControlLabel
                value="employer"
                control={<Radio />}
                label="Employer"
              />
            </RadioGroup>
          </FormControl>
          <div style={{ width: '100%', marginTop: '3rem', display: 'flex' }}>
            <Button
              onClick={() => {
                dispatch(slideFadeOutAction('register'))
                dispatch(slideFadeInAction('nothing'))
                setTimeout(() => {
                  dispatch(slideDisplayFlexAction('code'))
                }, 1000)
                setTimeout(() => {
                  dispatch(slideFadeInAction('code'))
                }, 1300)
              }}
              size="large"
              color={'primary'}
              startIcon={<KeyboardArrowLeft />}
            >
              correct mobile
            </Button>
            <div style={{ flex: 1 }} />
            <Button
              variant="contained"
              disabled={notificationState.loading}
              size="large"
              color="primary"
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authentication
