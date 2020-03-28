import React, { useState, useEffect } from 'react'
import './index.css'
import { Typography, Button, Card } from '@material-ui/core'

function slide_class(index, slideFadeIn, slideFadeOut, slideDisplayFlex) {
  return `slide ${slideFadeIn === index ? 'fade-in' : ''} ${
    slideFadeOut === index ? 'fade-out' : ''
  } ${slideDisplayFlex === index ? 'display-flex' : ''}`
}

function Authentication() {
  const [slideFadeOut, setSlideFadeOut] = useState(1)
  const [slideFadeIn, setSlideFadeIn] = useState(0)
  const [slideDisplayFlex, setSlideDisplayFlex] = useState(0)
  useEffect(() => {}, [])
  return (
    <Card id="center-card">
      <div
        id="slide_0"
        className={slide_class(0, slideFadeIn, slideFadeOut, slideDisplayFlex)}
      >
        <Typography variant="h1">oohoom</Typography>
        <Typography variant="h4" align="center">
          is a great group of translators
        </Typography>
        <Button
          variant="outlined"
          onClick={e => {
            setSlideFadeOut(0)
            setSlideFadeIn(-1)
            setTimeout(() => {
              setSlideDisplayFlex(1)
            }, 1000)
            setTimeout(() => {
              setSlideFadeIn(1)
            }, 1300)
          }}
          size="large"
          style={{ marginTop: '10rem' }}
        >
          Start
        </Button>
      </div>
      <div
        id="slide_1"
        className={slide_class(1, slideFadeIn, slideFadeOut, slideDisplayFlex)}
      >
        <Typography variant="h1">oohoom</Typography>
        <Typography variant="h4" align="center">
          Login
        </Typography>
        <Button
          variant="outlined"
          onClick={e => {
            setSlideFadeOut(1)
            setSlideFadeIn(-1)
            setTimeout(() => {
              setSlideDisplayFlex(2)
            }, 1000)
            setTimeout(() => {
              setSlideFadeIn(2)
            }, 1300)
          }}
          size="large"
          style={{ marginTop: '10rem' }}
        >
          Login
        </Button>
      </div>
      <div
        id="slide_2"
        className={slide_class(2, slideFadeIn, slideFadeOut, slideDisplayFlex)}
      >
        <Typography variant="h1">oohoom</Typography>
        <Typography variant="h4" align="center">
          Regsiter
        </Typography>
        <Button
          variant="outlined"
          onClick={e => {
            setSlideFadeOut(2)
            setSlideFadeIn(-1)
            setTimeout(() => {
              setSlideDisplayFlex(0)
            }, 1000)
            setTimeout(() => {
              setSlideFadeIn(0)
            }, 1300)
          }}
          size="large"
          style={{ marginTop: '10rem' }}
        >
          Regsiter
        </Button>
      </div>
    </Card>
  )
}

export default Authentication
