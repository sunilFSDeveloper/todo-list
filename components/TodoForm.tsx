import React, { useEffect, useState } from 'react'
import { TextField, Button, Grid, Card } from '@mui/material'
import { useTodoContext } from '../contexts/TodoContext'
import { todoSchema } from '../utils/validationSchema'
import { useFormik } from 'formik'
import { AddCircleOutline } from '@mui/icons-material'
import { styles } from './styles'
import SnackbarComponent from './SnackbarComponent'

const TodoForm = () => {
  const { todos, IsEditTodo, addTodo, updateTodo } = useTodoContext()
  const [error, setError] = useState<string | null>(null)

  const formik = useFormik({
    initialValues: {
      text: '',
      endTime: '',
    },
    validationSchema: todoSchema,
    onSubmit: values => {
      const todoData = {
        id: Date.now(),
        text: values.text,
        completed: false,
        endTime: values.endTime,
      }

      IsEditTodo.editMode ? updateTodo({...todoData, id: IsEditTodo.id}) : addTodo(todoData);
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (IsEditTodo.editMode) {
      const EditingTodo = todos.find((todo) => todo.id === IsEditTodo.id)
      if (EditingTodo) {
        formik.setValues({
          ...formik.values,
          text: EditingTodo.text,
          endTime: EditingTodo.endTime
        });
      }
    }
  }, [IsEditTodo, todos])

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card sx={styles.commanCard}>
        <Grid container spacing={2} >
          <Grid item xs={9}>
            <TextField
              fullWidth
              variant="outlined"
              id="text"
              name="text"
              label="Add Today's Todo"
              value={formik.values.text}
              onChange={formik.handleChange}
              error={formik.touched.text && Boolean(formik.errors.text)}
              helperText={formik.touched.text && formik.errors.text}
              focused={IsEditTodo.editMode}
            />
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              variant="outlined"
              id="endTime"
              name="endTime"
              label="End Time"
              type="time"
              value={formik.values.endTime}
              onChange={formik.handleChange}
              error={formik.touched.endTime && Boolean(formik.errors.endTime)}
              helperText={formik.touched.endTime && formik.errors.endTime}
              focused={IsEditTodo.editMode}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={1}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size='large'
              style={{ height: '3.2rem', marginTop: 1 }}
            >
              <AddCircleOutline fontSize='medium' />
            </Button>
          </Grid>
        </Grid>
        <SnackbarComponent errorText={formik.errors.text} setError={setError} />
      </Card>
    </form>
  );
};

export default TodoForm;
