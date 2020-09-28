import {
  Typography,
  useTheme,
  Button,
  CircularProgress,
  Avatar,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { navigate } from '../../Routes'

const UserAvatar = ({ t, name = ' ', title }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        margin: '1rem 0px',
        cursor: 'pointer',
      }}
      onClick={() => {
        navigate(`/users/${name}/`)
      }}
    >
      {title ? (
        <Typography
          style={{
            margin: '0px 1rem',
            fontWeight: 'bold',
          }}
          color="textSecondary"
        >
          {t(title)}
        </Typography>
      ) : null}
      <Avatar>{name?.[0]?.toUpperCase()}</Avatar>
      <div style={{ margin: '0px 1rem' }}>{name}</div>
    </div>
  )
}
export default UserAvatar
