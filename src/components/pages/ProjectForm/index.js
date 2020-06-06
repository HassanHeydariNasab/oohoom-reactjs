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
import {
  createProjectAction,
  updateProjectAction,
} from '../../../redux/actions/api'
import { useDispatch, useSelector } from 'react-redux'

import { CREATE_PROJECT_ERROR } from '../../../redux/constants/api'
import { navigate } from '../../../Routes'
import { setLoadingAction } from '../../../redux/actions/notification'

const CreateProject = ({ back_url = '/', t }) => {
  useEffect(() => {}, [])
  const dispatch = useDispatch()
  const generalState = useSelector((state) => state.general)
  const notificationState = useSelector((state) => state.notification)
  return (
    <div className="project-parent-container">
      <Button
        style={{ marginBottom: '1rem' }}
        startIcon={<KeyboardArrowLeft />}
        onClick={() => {
          navigate(back_url)
        }}
      >
        {t('Back')}
      </Button>
      <div className="project-container">
        <form
          autoComplete="off"
          action="javascript:;"
          onSubmit={(e) => {
            if (generalState.project_form___id) {
              dispatch(
                updateProjectAction(
                  generalState.project_form___id,
                  generalState.project_form__description,
                  generalState.project_form__skills || []
                )
              )
            } else {
              dispatch(
                createProjectAction(
                  generalState.project_form__title,
                  generalState.project_form__description,
                  generalState.project_form__skills || []
                )
              )
            }
            dispatch(setLoadingAction(true))
          }}
        >
          <Card style={{ padding: '1rem' }}>
            <TextField
              label={t('title')}
              helperText={
                generalState.CREATE_PROJECT_ERROR?.title
                  ? generalState.CREATE_PROJECT_ERROR.title
                  : t('project_title_helper_text')
              }
              style={{ marginTop: '3rem' }}
              variant="outlined"
              fullWidth
              value={generalState.project_form__title}
              onChange={(e) => {
                dispatch(
                  setFieldAction('project_form', 'title', e.target.value)
                )
                dispatch(clearErrorsAction(CREATE_PROJECT_ERROR))
              }}
              error={Boolean(generalState[CREATE_PROJECT_ERROR]?.title)}
              disabled={generalState.project_form___id}
            />
            <TextField
              label={t('description')}
              helperText={
                generalState.CREATE_PROJECT_ERROR?.description
                  ? generalState.CREATE_PROJECT_ERROR.description
                  : ''
              }
              style={{ marginTop: '3rem' }}
              variant="outlined"
              fullWidth
              multiline
              rows={10}
              value={generalState.project_form__description}
              onChange={(e) => {
                dispatch(
                  setFieldAction('project_form', 'description', e.target.value)
                )
                dispatch(clearErrorsAction(CREATE_PROJECT_ERROR))
              }}
              error={Boolean(generalState[CREATE_PROJECT_ERROR]?.description)}
            />
            <div className="tags-form">
              <TextField
                helperText={t('type_a_skill')}
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
                {generalState.project_form___id ? t('Update') : t('Create')}
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
