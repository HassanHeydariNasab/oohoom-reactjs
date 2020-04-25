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
import {
  fetchProjectsAction,
  fetchUserAction,
} from '../../../redux/actions/api'
import { useDispatch, useSelector } from 'react-redux'

import { CREATE_PROJECT_ERROR } from '../../../redux/constants/api'
import { navigate } from '../../../Routes'

const Home = () => {
  useEffect(() => {
    dispatch(fetchProjectsAction('all', 0, 100))

    if (window.localStorage.getItem('token')) {
      dispatch(fetchUserAction('me'))
    }
  }, [])
  const dispatch = useDispatch()
  const projectsState = useSelector((state) => state.projects)
  const authenticationState = useSelector((state) => state.authentication)
  return (
    <div className="project-parent-container">
      {authenticationState.user?.role !== 'employee' ? (
        <Button
          style={{ marginBottom: '1rem' }}
          endIcon={<Add />}
          onClick={() => {
            if (window.localStorage.getItem('token')) {
              dispatch(clearFormAction('project_form'))
              dispatch(clearErrorsAction(CREATE_PROJECT_ERROR))
              navigate('project_form')
            } else {
              navigate('auth')
            }
          }}
        >
          Create project
        </Button>
      ) : null}
      <div className="projects-container">
        {projectsState.projects.map((project) => (
          <Card key={project._id.$oid} className="project-card">
            <CardHeader
              title={project.title}
              action={
                project.employer._id.$oid ===
                authenticationState.user?._id.$oid ? (
                  <IconButton
                    onClick={(e) => {
                      for (let field of [
                        '_id',
                        'title',
                        'description',
                        'skills',
                      ]) {
                        dispatch(
                          setFieldAction('project_form', field, project[field])
                        )
                      }
                      dispatch(clearErrorsAction(CREATE_PROJECT_ERROR))
                      navigate('project_form')
                    }}
                  >
                    <EditOutlined />
                  </IconButton>
                ) : null
              }
            />
            <CardContent>{project.description}</CardContent>
            <div className="tags-container">
              {project.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onClick={() => {}}
                  className="tag"
                />
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Home
