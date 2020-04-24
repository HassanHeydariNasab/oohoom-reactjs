import './index.css'

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import { clearErrorsAction, clearFormAction } from '../../../redux/actions/general'
import {
  fetchProjectsAction,
  fetchUserAction,
} from '../../../redux/actions/api'
import { useDispatch, useSelector } from 'react-redux'

import { Add } from '@material-ui/icons'
import { PROJECT_FORM_ERROR } from '../../../redux/constants/api'
import { navigate } from '../../../Routes'

const Home = () => {
  useEffect(() => {
    dispatch(fetchProjectsAction('all'))

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
              dispatch(clearErrorsAction(PROJECT_FORM_ERROR))
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
            <CardHeader title={project.title} />
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
