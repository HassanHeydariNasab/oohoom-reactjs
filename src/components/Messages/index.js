import './index.scss'

import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Typography,
  useTheme,
  Button,
  CircularProgress,
  TextField,
  Fab,
  Paper,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { clearErrorsAction, setFieldAction } from '../../redux/actions/general'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '../../Routes'
import { setLoadingAction } from '../../redux/actions/notification'
import { createMessageAction } from '../../redux/actions/api'
import UserAvatar from '../UserAvatar'
import { Send, Close } from '@material-ui/icons'

const Messages = ({ t }) => {
  useEffect(() => {}, [])
  const dispatch = useDispatch()
  const projectState = useSelector((state) => state.project)
  const generalState = useSelector((state) => state.general)
  const authenticationState = useSelector((state) => state.authentication)
  const theme = useTheme()
  return (
    <div style={{ position: 'relative', backgroundColor: '#e0e0e0' }}>
      <Fab
        onClick={(e) => {
          dispatch(setFieldAction('messages', 'is_messages_modal_open', false))
        }}
        style={{
          position: 'sticky',
          top: '1rem',
          left: '1rem',
          right: '1rem',
          zIndex: 1000,
        }}
      >
        <Close />
      </Fab>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '5rem',
        }}
      >
        {projectState.messages.map((message) => (
          <div
            key={`${message._id.$oid}`}
            variant="outlined"
            className={
              message.sender._id.$oid === authenticationState.user._id.$oid
                ? 'my-message'
                : 'other-message'
            }
            id={message._id.$oid}
          >
            <UserAvatar name={message.sender.name} />
            <Typography>{message.body}</Typography>
          </div>
        ))}
        <div id="recent-message" />
      </div>
      <form
        autoComplete="off"
        action="javascript:;"
        onSubmit={(e) => {
          if (generalState.messages__body) {
            dispatch(
              createMessageAction({
                project_id: projectState._id,
                body: `${generalState.messages__body}`,
              })
            )
            dispatch(setFieldAction('messages', 'body', ''))
          }
          dispatch(setLoadingAction(true))
        }}
        style={{
          display: 'flex',
          width: '100%',
          position: 'fixed',
          bottom: '0px',
          backgroundColor: theme.palette.background.paper,
          boxShadow: '#bdbdbd 0px -4px 10px 0px',
        }}
      >
        <TextField
          value={generalState.messages__body}
          onChange={(e) => {
            dispatch(setFieldAction('messages', 'body', e.target.value))
          }}
          fullWidth
          variant="outlined"
          multiline
        />
        <IconButton type="submit">
          <Send />
        </IconButton>
      </form>
    </div>
  )
}

export default Messages
