import './index.css'

import {
  AddTwoTone,
  ArrowLeft,
  KeyboardArrowLeft,
  KeyboardReturn,
} from '@material-ui/icons'
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  InputAdornment,
  TextField,
} from '@material-ui/core'
import React, { useEffect } from 'react'
import {
  addItemToArrayAction,
  clearErrorsAction,
  removeItemFromArrayAction,
  setFieldAction,
} from '../../../redux/actions/general'
import { useDispatch, useSelector } from 'react-redux'

import { PROJECT_FORM_ERROR } from '../../../redux/constants/api'
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
                generalState.project_form__title,
                generalState.project_form__description,
                generalState.project_form__skills || []
              )
            )
            dispatch(setLoadingAction(true))
          }}
        >
          <Card style={{ padding: '1rem' }}>
            <TextField
              label="title"
              helperText={
                generalState.PROJECT_FORM_ERROR?.title
                  ? generalState.PROJECT_FORM_ERROR.title
                  : "example: project's title"
              }
              style={{ marginTop: '3rem' }}
              variant="outlined"
              fullWidth
              value={generalState.project_form__title}
              onChange={(e) => {
                dispatch(
                  setFieldAction('project_form', 'title', e.target.value)
                )
                dispatch(clearErrorsAction(PROJECT_FORM_ERROR))
              }}
              error={Boolean(generalState[PROJECT_FORM_ERROR]?.title)}
            />
            <TextField
              label="description"
              helperText={
                generalState.PROJECT_FORM_ERROR?.description
                  ? generalState.PROJECT_FORM_ERROR.description
                  : "example: project's description"
              }
              style={{ marginTop: '3rem' }}
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              value={generalState.project_form__description}
              onChange={(e) => {
                dispatch(
                  setFieldAction(
                    'project_form',
                    'description',
                    e.target.value
                  )
                )
                dispatch(clearErrorsAction(PROJECT_FORM_ERROR))
              }}
              error={Boolean(generalState[PROJECT_FORM_ERROR]?.description)}
            />
            <div className="tags-form">
              <TextField
                helperText="type a skill and press +"
                variant="outlined"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={() => {
                          if (generalState.project_form__skill)
                            dispatch(
                              addItemToArrayAction(
                                'project_form',
                                'skills',
                                generalState.project_form__skill
                              )
                            )
                        }}
                      >
                        <AddTwoTone />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                value={generalState.project_form__skill}
                onChange={(e) => {
                  dispatch(
                    setFieldAction('project_form', 'skill', e.target.value)
                  )
                }}
              />
              <div className="tags-container">
                {generalState.project_form__skills?.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    className="tag"
                    onDelete={(e) => {
                      dispatch(
                        removeItemFromArrayAction(
                          'project_form',
                          'skills',
                          skill
                        )
                      )
                    }}
                  />
                ))}
              </div>
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
