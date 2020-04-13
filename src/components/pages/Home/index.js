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
import { useDispatch, useSelector } from 'react-redux'

import { Add } from '@material-ui/icons'
import { fetchProjectsAction } from '../../../redux/actions/api'
import { navigate } from '../../../Routes'

const Home = () => {
  useEffect(() => {
    dispatch(fetchProjectsAction('all'))
  }, [])
  const dispatch = useDispatch()
  const projectsState = useSelector((state) => state.projects)
  return (
    <div className="projects-parent-container">
      <Button
        style={{ marginBottom: '1rem' }}
        endIcon={<Add />}
        onClick={() => {
          navigate('create_project')
        }}
      >
        Create project
      </Button>
      <div className="projects-container">
        {projectsState.projects.map((project) => (
          <Card key={project._id.$oid} className='project-card'>
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
