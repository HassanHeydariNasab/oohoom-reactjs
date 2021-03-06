import './index.scss'

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
import { makeStyles } from '@material-ui/core/styles'
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
import { logoutAction } from '../../../redux/actions/authentication'
import { setLoadingAction } from '../../../redux/actions/notification'

function slide_class(name, slideFadeIn, slideFadeOut, slideDisplayFlex) {
  return `slide ${slideFadeIn === name ? 'fade-in' : ''} ${
    slideFadeOut === name ? 'fade-out' : ''
  } ${slideDisplayFlex === name ? 'display-flex' : ''}`
}

const useStyles = makeStyles((theme) => ({
  ltr: {
    flip: false,
    direction: 'ltr',
  },
}))

function Authentication({ back_url = '/', t }) {
  useEffect(() => {
    dispatch(setFieldAction('auth', 'country_code', '0098'))
  }, [])
  const dispatch = useDispatch()
  const authenticationState = useSelector((state) => state.authentication)
  const notificationState = useSelector((state) => state.notification)
  const generalState = useSelector((state) => state.general)
  const classes = useStyles()

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
        <Typography variant="h2">{t('who_are_you')}</Typography>
        <Button
          variant="outlined"
          onClick={() => {
            dispatch(logoutAction(false))
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
          {t('login / register')}
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
          {t('mobile verification')}
        </Typography>
        <form
          autoComplete="off"
          action="javascript:;"
          onSubmit={() => {
            let mobile = `${generalState.auth__mobile}`
            if (mobile[0] === '0') {
              mobile = mobile.slice(1)
            }
            dispatch(setFieldAction('auth', 'mobile', mobile))
            dispatch(codeAction(generalState.auth__country_code + mobile))
            dispatch(setLoadingAction(true))
          }}
        >
          <div className={classes.ltr}>
            <TextField
              label={t('country_code')}
              helperText={t('country_code_example')}
              className={classes.unaffected}
              style={{ marginTop: '5rem' }}
              variant="standard"
              fullWidth
              value={generalState.auth__country_code}
              onChange={(e) => {
                dispatch(setFieldAction('auth', 'country_code', e.target.value))
                dispatch(clearErrorsAction(CODE_ERROR))
              }}
              type="tel"
            />
            <TextField
              label={t('mobile')}
              helperText={
                generalState[CODE_ERROR]?.mobile
                  ? generalState[CODE_ERROR].mobile
                  : t('mobile_example')
              }
              className={classes.unaffected}
              style={{ marginTop: '3rem' }}
              variant="standard"
              fullWidth
              value={generalState.auth__mobile}
              onChange={(e) => {
                dispatch(setFieldAction('auth', 'mobile', e.target.value))
                dispatch(clearErrorsAction(CODE_ERROR))
              }}
              error={Boolean(generalState[CODE_ERROR]?.mobile)}
              type="tel"
            />
          </div>
          <Button
            variant="contained"
            disabled={notificationState.loading}
            size="large"
            style={{ marginTop: '3rem' }}
            color="primary"
            type="submit"
          >
            {t('Send me a sms')}
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
        <Typography variant="h2">{t('Login')}</Typography>
        <form
          autoComplete="off"
          action="javascript:;"
          onSubmit={() => {
            dispatch(
              tokenAction(
                generalState.auth__country_code + generalState.auth__mobile,
                generalState.auth__code
              )
            )
            dispatch(setLoadingAction(true))
          }}
        >
          <TextField
            label={t('code')}
            style={{ marginTop: '5rem' }}
            helperText={
              generalState[TOKEN_ERROR]?.code
                ? generalState[TOKEN_ERROR].code
                : t('code you recieved')
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
              {t('correct mobile')}
            </Button>
            <div style={{ flex: 1 }} />
            <Button
              variant="contained"
              disabled={notificationState.loading}
              size="large"
              color="primary"
              type="submit"
            >
              {t('Login')}
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
        <Typography variant="h2">{t('Register')}</Typography>
        <form
          autoComplete="off"
          action="javascript:;"
          onSubmit={() => {
            dispatch(
              registrationAction(
                generalState.auth__country_code + generalState.auth__mobile,
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
            label={t('code')}
            style={{ marginTop: '5rem' }}
            helperText={
              generalState[REGISTRATION_ERROR]?.code
                ? generalState[REGISTRATION_ERROR].code
                : t('code you recieved')
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
            label={t('name')}
            style={{ marginTop: '3rem' }}
            helperText={
              generalState[REGISTRATION_ERROR]?.name
                ? generalState[REGISTRATION_ERROR].name[0]
                : t('valid_usernames')
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
            <FormLabel component="legend">{t("I'm an")}</FormLabel>
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
                label={t('Employee')}
              />
              <FormControlLabel
                value="employer"
                control={<Radio />}
                label={t('Employer')}
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
              {t('correct mobile')}
            </Button>
            <div style={{ flex: 1 }} />
            <Button
              variant="contained"
              disabled={notificationState.loading}
              size="large"
              color="primary"
              type="submit"
            >
              {t('Register')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Authentication
