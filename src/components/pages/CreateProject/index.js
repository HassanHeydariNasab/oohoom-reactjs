import './index.css'

import { ArrowLeft, KeyboardArrowLeft } from '@material-ui/icons'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  TextField,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import {
  clearErrorsAction,
  setFieldAction,
} from '../../../redux/actions/general'
import { useDispatch, useSelector } from 'react-redux'

import { CREATE_PROJECT_ERROR } from '../../../redux/constants/api'
import { createProjectAction } from '../../../redux/actions/api'
import { navigate } from '../../../Routes'
import { setLoadingAction } from '../../../redux/actions/notification'

const CreateProject = () => {
  useEffect(() => {}, [])
  const dispatch = useDispatch()
  const projectState = useSelector((state) => state.project)
  const generalState = useSelector((state) => state.general)
  const notificationState = useSelector((state) => state.notification)
  return (
    <div className="project-parent-container">
      <Button
        style={{ marginBottom: '1rem' }}
        startIcon={<KeyboardArrowLeft />}
        onClick={() => {
          navigate('home')
        }}
      >
        Back
      </Button>
      <div className="project-container">
        <form
          autoComplete="off"
          action="javascript:;"
          onSubmit={(e) => {
            dispatch(
              createProjectAction(
                generalState.create_project__title,
                generalState.create_project__description,
                generalState.create_project__skills || []
              )
            )
            dispatch(setLoadingAction(true))
          }}
        >
          <Card style={{padding: '1rem'}}>
            <TextField
              label="title"
              helperText={
                generalState.CREATE_PROJECT_ERROR?.title
                  ? generalState.CREATE_PROJECT_ERROR.title
                  : "example: project's title"
              }
              style={{ marginTop: '3rem' }}
              variant="outlined"
              fullWidth
              value={generalState.create_project__title}
              onChange={(e) => {
                dispatch(
                  setFieldAction('create_project', 'title', e.target.value)
                )
                dispatch(clearErrorsAction(CREATE_PROJECT_ERROR))
              }}
              error={Boolean(generalState[CREATE_PROJECT_ERROR]?.title)}
            />
            <TextField
              label="description"
              helperText={
                generalState.CREATE_PROJECT_ERROR?.description
                  ? generalState.CREATE_PROJECT_ERROR.description
                  : "example: project's description"
              }
              style={{ marginTop: '3rem' }}
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              value={generalState.create_project__description}
              onChange={(e) => {
                dispatch(
                  setFieldAction('create_project', 'description', e.target.value)
                )
                dispatch(clearErrorsAction(CREATE_PROJECT_ERROR))
              }}
              error={Boolean(generalState[CREATE_PROJECT_ERROR]?.description)}
            />
            <div className="tags-container">
              {generalState.create_project__skills?.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onClick={() => {}}
                  className="tag"
                />
              ))}
            </div>
            <Divider />
            <CardActions>
              <Button
                variant="contained"
                disabled={notificationState.loading}
                size="large"
                color="primary"
                type="submit"
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
