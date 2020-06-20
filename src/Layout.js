import './Layout.css'

import { create } from 'jss'
import rtl from 'jss-rtl'
import { StylesProvider, jssPreset } from '@material-ui/core/styles'

import { AccountCircle, ExitToAppOutlined } from '@material-ui/icons'
import {
  AppBar,
  Button,
  LinearProgress,
  Toolbar,
  ButtonGroup,
  Divider,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import Routes, { navigate } from './Routes'
import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from '@material-ui/core/styles'
import { faIR, enUS } from '@material-ui/core/locale'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Home } from '@material-ui/icons'
import { LOGOUT } from './redux/constants/authentication'
import { fetchUserAction } from './redux/actions/api'
import { logoutAction } from './redux/actions/authentication'

var jss
function make_jss(is_rtl = true) {
  if (is_rtl) {
    jss = create({ plugins: [...jssPreset().plugins, rtl()] })
  } else {
    jss = create({ plugins: [...jssPreset().plugins] })
  }
}
var theme
function make_theme(is_rtl = true, locale = faIR) {
  theme = createMuiTheme(
    {
      direction: is_rtl ? 'rtl' : 'ltr',
      typography: {
        fontFamily: 'vazir, Roboto',
      },
    },
    locale
  )
}
make_jss(true)
make_theme(true, faIR)

const switch_language_to_en = (e, i18n) => {
  i18n.changeLanguage('en')
  document.getElementsByTagName('html')[0].dir = 'ltr'
  document.getElementsByTagName('html')[0].lang = 'en'
  make_jss(false)
  make_theme(false, enUS)
  window.localStorage.setItem('language', 'en')
}
const switch_language_to_fa = (e, i18n) => {
  i18n.changeLanguage('fa')
  document.getElementsByTagName('html')[0].dir = 'rtl'
  document.getElementsByTagName('html')[0].lang = 'fa'
  make_jss(true)
  make_theme(true, faIR)
  window.localStorage.setItem('language', 'fa')
}

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
  const { t, i18n } = useTranslation()
  useEffect(() => {
    let language = window.localStorage.getItem('language')
    if (language === 'en') {
      switch_language_to_en(null, i18n)
    } else {
      switch_language_to_fa(null, i18n)
    }
  }, [])

  return (
    <StylesProvider jss={jss}>
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
              {t('Home')}
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
                  {t('Logout')}
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
                {t('Login')}
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
          <Routes t={t} />
        </div>
        <Divider />
        <div style={{ padding: '4rem' }}>
          <ButtonGroup variant="text">
            <Button
              onClick={(e) => {
                switch_language_to_en(e, i18n)
              }}
            >
              English
            </Button>
            <Button
              onClick={(e) => {
                switch_language_to_fa(e, i18n)
              }}
            >
              فارسی
            </Button>
          </ButtonGroup>
        </div>
      </ThemeProvider>
    </StylesProvider>
  )
}
