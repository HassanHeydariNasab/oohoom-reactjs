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
import {
  fetchProjectsAction,
  fetchUserAction,
} from '../../../redux/actions/api'
import { useDispatch, useSelector } from 'react-redux'

import { Add } from '@material-ui/icons'
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
    <div className="projects-parent-container">
      {authenticationState.user?.role !== 'employee' ? (
        <Button
          style={{ margin: '1rem 0px' }}
          endIcon={<Add />}
          onClick={() => {
            if (window.localStorage.getItem('token')) {
              navigate('create_project')
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
