import './index.css'

import { Add, EditOutlined } from '@material-ui/icons'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import {
  clearErrorsAction,
  clearFormAction,
  setFieldAction,
} from '../../../redux/actions/general'
import { fetchProjectAction, fetchUserAction } from '../../../redux/actions/api'
import { useDispatch, useSelector } from 'react-redux'

import { CREATE_PROJECT_ERROR } from '../../../redux/constants/api'
import { navigate } from '../../../Routes'

// if project_id is provided, one project will be fetched. it's suitable for showing one project.
// if project is provided, no need to fetch project again. it's suitable for showing a list of projects.
const Project = ({ project_title = null, project = {} }) => {
  useEffect(() => {
    if (project_title) {
      console.log('we have project_title', project_title)
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
  return (
    <Card className="project-card">
      <CardHeader
        title={_project.title}
        titleTypographyProps={{
          onClick: (e) => {
            if (!project_title) {
              navigate(`/projects/${project.title}/`)
            }
          },
          style: { cursor: project_title ? 'auto' : 'pointer' },
        }}
        action={
          _project?.employer?._id.$oid ===
          authenticationState.user?._id.$oid ? (
            <IconButton
              onClick={(e) => {
                for (let field of ['_id', 'title', 'description', 'skills', 'skill']) {
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
