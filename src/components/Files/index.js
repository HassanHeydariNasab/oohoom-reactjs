import './index.css'

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
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { clearErrorsAction, setFieldAction } from '../../redux/actions/general'
import { useDispatch, useSelector } from 'react-redux'

import { navigate } from '../../Routes'
import { setLoadingAction } from '../../redux/actions/notification'
import { createFileAction, downloadFileAction } from '../../redux/actions/api'
import { AddCircle, CloudUpload } from '@material-ui/icons'
import { BASE_URL } from '../../local_configs'

const Files = ({ files, kind, project_id, has_upload_permission, t }) => {
  useEffect(() => {}, [])
  const dispatch = useDispatch()
  const theme = useTheme()
  return (
    <div style={{ padding: '2rem' }}>
      <form style={{ display: 'flex', alignItems: 'center' }}>
        <Typography
          variant="h6"
          style={{ wordBreak: 'break-word' }}
          color="textSecondary"
        >
          {t(kind)}
        </Typography>
        {has_upload_permission && (
          <>
            <input
              accept="*/*"
              id={`button-file-${kind}`}
              multiple
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => {
                const data = new FormData()
                data.append('file', e.target.files[0])
                data.append('kind', kind)
                data.append('project_id', project_id)
                dispatch(createFileAction(data))
              }}
            />
            <label htmlFor={`button-file-${kind}`}>
              <IconButton component="span">
                <CloudUpload />
              </IconButton>
            </label>
          </>
        )}
      </form>
      {files.map((file) => (
        <div>
          <span
            className={'link'}
            onClick={(e) => {
              fetch(`${BASE_URL}/v1/files/${file._id.$oid}`, {
                method: 'GET',
                headers: new Headers({
                  Authorization: window.localStorage.getItem('token'),
                }),
              })
                .then((response) => response.blob())
                .then((blob) => {
                  var url = window.URL.createObjectURL(blob)
                  var a = document.createElement('a')
                  a.href = url
                  a.download = file.title
                  document.body.appendChild(a)
                  a.click()
                  a.remove()
                })
            }}
          >
            {file.title}
          </span>
        </div>
      ))}
    </div>
  )
}

export default Files
