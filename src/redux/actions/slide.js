import { SLIDE_DISPLAY_FLEX, SLIDE_FADE_IN, SLIDE_FADE_OUT } from '../constants'
export const slideFadeInAction = name => ({
  type: SLIDE_FADE_IN,
  payload: { name }
})
export const slideFadeOutAction = name => ({
  type: SLIDE_FADE_OUT,
  payload: { name }
})
export const slideDisplayFlexAction = name => ({
  type: SLIDE_DISPLAY_FLEX,
  payload: { name }
})
