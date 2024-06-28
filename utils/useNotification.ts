import { useEffect } from 'react';
import { Todo } from '../contexts/TodoContext';

const useNotification = (todos: Todo[]) => {
  const showNotification = (todo: Todo) => {
    if (Notification.permission === 'granted') {
      new Notification('Todo Alert', {
        body: `The task "${todo.text}" is due now!`,
        icon: '',
      })
    }
  }

  useEffect(() => {
    const setNotificationTimers = () => {
      todos.forEach(todo => {
        if (!todo.completed && todo.endTime) {
          const [hours, minutes] = todo.endTime.split(':').map(Number)
          
          const endTime = new Date()
          endTime.setHours(hours, minutes, 0, 0)
    
          const now = Date.now()
          const timeDifference = endTime.getTime() - now;
    
          if (timeDifference > 0) {
            setTimeout(() => showNotification(todo), timeDifference);
          } else if (timeDifference <= 0 && now - endTime.getTime() < 1000) {
            showNotification(todo);
          }
        }
      })
    };

    if (Notification.permission === 'granted') {
      setNotificationTimers()
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          setNotificationTimers()
        }
      });
    }
  }, [todos])

  return {
    showNotification,
  }
}

export default useNotification
