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
import Project from '../Project'
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
    <div className="projects-parent-container">
      {authenticationState.user?.role !== 'employee' ? (
        <Button
          style={{ marginBottom: '1rem' }}
          endIcon={<Add />}
          onClick={() => {
            if (window.localStorage.getItem('token')) {
              dispatch(clearFormAction('project_form'))
              dispatch(clearErrorsAction(CREATE_PROJECT_ERROR))
              navigate(`/project-form/?back_url=${window.location.pathname}`)
            } else {
              navigate(`/auth/?back_url=${window.location.pathname}`)
            }
          }}
        >
          Create project
        </Button>
      ) : null}
      <div className="projects-container">
        {projectsState.projects.map((project) => (
          <Project project={project} key={project._id.$oid} />
        ))}
      </div>
    </div>
  )
}

export default Home
