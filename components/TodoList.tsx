import React from 'react'
import { List, ListItemText, IconButton, Card, ListItem, ListItemIcon, Divider } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { useTodoContext, Todo } from '../contexts/TodoContext'
import { CheckBox, CheckBoxOutlineBlank, Edit, Timer } from '@mui/icons-material'
import { styles } from './styles'
import useNotification from '@/utils/useNotification'

const TodoList = () => {
  const { todos, toggleTodo, editTodo, deleteTodo } = useTodoContext()

  const { showNotification } = useNotification(todos)

  if (todos.length < 1) {
    return
  }

  return (
    <Card sx={styles.commanCard}>
      <List sx={{ bgcolor: 'background.paper', borderRadius: 2 }}>
        {todos.map((todo: Todo, index) => (
          <>
            <ListItem
              key={todo.id}
              sx={{
                m: 1,
                bgcolor: todo.completed ? '#f0f0f0' : 'background.paper',
                borderRadius: 2
              }}
            >
              <ListItemIcon>
                <IconButton onClick={() => toggleTodo(todo.id)}>
                  {todo.completed ?
                    <CheckBox color='success' />
                      : <CheckBoxOutlineBlank color='primary' />}
                </IconButton>
                <IconButton >
                  <Timer />
                </IconButton>
                <IconButton size='small' >
                  {todo.endTime}
                </IconButton>
              </ListItemIcon>
              <ListItemText
                primary={todo.text}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              />
              <IconButton onClick={() => editTodo(todo.id)}>
                <Edit color='warning' />
              </IconButton>
              <IconButton onClick={() => deleteTodo(todo.id)}>
                <DeleteIcon color='error' />
              </IconButton>
            </ListItem>
            {todos.length !== index + 1 && <Divider variant="inset" component="li" />}
          </>
        ))}
      </List>
    </Card>
  )
}

export default TodoList
