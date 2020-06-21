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
import {
  clearErrorsAction,
  setFieldAction,
} from '../../../redux/actions/general'
import {
  fetchProjectAction,
  fetchUserAction,
  assignProjectAction,
} from '../../../redux/actions/api'
import { useDispatch, useSelector } from 'react-redux'

import { CREATE_PROJECT_ERROR } from '../../../redux/constants/api'
import { EditOutlined } from '@material-ui/icons'
import { navigate } from '../../../Routes'
import { setLoadingAction } from '../../../redux/actions/notification'
import UserAvatar from '../../UserAvatar'
import Files from '../../Files'

// it's a standalone component as a page when project_id is provided
const Project = ({ project_id = null, project = {}, t }) => {
  useEffect(() => {
    if (project_id) {
      dispatch(fetchProjectAction(project_id))
    } else {
    }
    if (window.localStorage.getItem('token') && project_id) {
      dispatch(fetchUserAction('me'))
    }
  }, [])
  const dispatch = useDispatch()
  const projectState = useSelector((state) => state.project)
  const authenticationState = useSelector((state) => state.authentication)
  const _project = project_id ? projectState : project
  const theme = useTheme()
  return (
    <>
      <Card className="project-card">
        <CardHeader
          title={
            <Typography variant="h5" style={{ wordBreak: 'break-word' }}>
              <a
                href={`/projects/${_project?._id?.$oid}/`}
                onClick={(e) => {
                  if (e.ctrlKey) {
                    return
                  }
                  e.preventDefault()
                  e.stopPropagation()
                  if (!project_id) {
                    navigate(`/projects/${_project?._id.$oid}/`)
                  }
                }}
              >
                {_project.title}
              </a>
            </Typography>
          }
          disableTypography
          action={
            _project.employer?._id.$oid ===
            authenticationState.user?._id.$oid ? (
              <IconButton
                onClick={() => {
                  for (let field of [
                    '_id',
                    'title',
                    'description',
                    'skills',
                    'skill',
                  ]) {
                    dispatch(
                      setFieldAction('project_form', field, _project[field])
                    )
                  }
                  dispatch(clearErrorsAction(CREATE_PROJECT_ERROR))
                  navigate(
                    `/project-form/?back_url=${window.location.pathname}`
                  )
                }}
              >
                <EditOutlined />
              </IconButton>
            ) : authenticationState.user?.role === 'employee' ? (
              !_project.employee ? (
                <Button
                  variant="contained"
                  color="secondary"
                  disableElevation
                  onClick={(e) => {
                    dispatch(assignProjectAction(_project._id))
                    dispatch(setLoadingAction(true))
                  }}
                >
                  {t('Assign to me')}
                </Button>
              ) : _project.employee._id.$oid ===
                authenticationState.user?._id.$oid ? (
                <Button
                  disabled
                  variant="contained"
                  color="default"
                  disableElevation
                >
                  {t('Assigned to me')}
                </Button>
              ) : null
            ) : null
          }
        />
        <CardContent>
          <UserAvatar t={t} name={_project.employer?.name} />
          {_project.description}
        </CardContent>
        {_project?.employee ? (
          <UserAvatar t={t} name={_project.employee.name} title={'employee'} />
        ) : null}
        {project_id ? (
          <>
            <Files
              files={projectState.input_files}
              kind={'input'}
              project_id={_project._id ? _project._id.$oid : null}
              has_upload_permission={
                _project.employer?._id.$oid ===
                authenticationState.user?._id.$oid
              }
              t={t}
              key={`${project_id}_in`}
            />
            {authenticationState.user &&
              (_project.employer?._id.$oid ===
                authenticationState.user?._id.$oid ||
                _project.employee?._id.$oid ===
                  authenticationState.user?._id.$oid) && (
                <Files
                  files={projectState.output_files}
                  kind={'output'}
                  project_id={_project._id ? _project._id.$oid : null}
                  has_upload_permission={
                    _project.employee?._id.$oid ===
                    authenticationState.user?._id.$oid
                  }
                  t={t}
                  key={`${project_id}_out`}
                />
              )}
          </>
        ) : null}
        <div className="tags-container">
          {_project.skills?.map((skill) => (
            <Chip
              key={skill}
              label={skill}
              onClick={() => {}}
              className="tag"
            />
          ))}
        </div>
      </Card>
    </>
  )
}

export default Project
