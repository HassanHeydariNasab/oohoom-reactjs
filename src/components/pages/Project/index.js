import './index.css'

import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  IconButton,
  Typography,
  useTheme,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import {
  clearErrorsAction,
  setFieldAction,
} from '../../../redux/actions/general'
import { fetchProjectAction, fetchUserAction } from '../../../redux/actions/api'
import { useDispatch, useSelector } from 'react-redux'

import { CREATE_PROJECT_ERROR } from '../../../redux/constants/api'
import { EditOutlined } from '@material-ui/icons'
import { navigate } from '../../../Routes'

// if project_id is provided, one project will be fetched. it's suitable for showing one project.
// if project is provided, no need to fetch project again. it's suitable for showing a list of projects.
const Project = ({ project_title = null, project = {} }) => {
  useEffect(() => {
    if (project_title) {
      dispatch(fetchProjectAction(project_title))
    } else {
    }
    if (window.localStorage.getItem('token') && project_title) {
      dispatch(fetchUserAction('me'))
    }
  }, [])
  const dispatch = useDispatch()
  const projectState = useSelector((state) => state.project)
  const authenticationState = useSelector((state) => state.authentication)
  const _project = project_title ? projectState : project
  const theme = useTheme()
  return (
    <Card className="project-card">
      <CardHeader
        title={
          <Typography variant="h5">
            <a
              href={`/projects/${_project.title}/`}
              onClick={(e) => {
                if (e.ctrlKey) {
                  return
                }
                e.preventDefault()
                e.stopPropagation()
                if (!project_title) {
                  navigate(`/projects/${_project.title}/`)
                }
              }}
              style={{
                textDecoration: 'none',
                color: theme.palette.text.primary,
              }}
            >
              {_project.title}
            </a>
          </Typography>
        }
        disableTypography
        action={
          _project?.employer?._id.$oid ===
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
                navigate(`/project-form/?back_url=${window.location.pathname}`)
              }}
            >
              <EditOutlined />
            </IconButton>
          ) : null
        }
      />
      <CardContent>{_project.description}</CardContent>
      <div className="tags-container">
        {_project.skills?.map((skill) => (
          <Chip key={skill} label={skill} onClick={() => {}} className="tag" />
        ))}
      </div>
    </Card>
  )
}

export default Project
