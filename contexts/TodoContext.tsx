import React, { createContext, useContext, useReducer, FC, ReactNode } from 'react';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
  endTime: string;
}

export interface EditTodo {
  id: number;
  editMode: boolean;
}

interface TodoContextType {
  todos: Todo[];
  IsEditTodo: EditTodo;
  addTodo: (todo: Todo) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
  updateTodo: (todo: Todo) => void;
}

const initialState: { todos: Todo[], IsEditTodo: EditTodo } = {
  todos: [],
  IsEditTodo: {
    id: 0,
    editMode: false
  }
};

type TodoAction =
  | { type: 'ADD_TODO'; payload: Todo }
  | { type: 'TOGGLE_TODO'; payload: number }
  | { type: 'EDIT_TODO'; payload: number }
  | { type: 'UPDATE_TODO'; payload: Todo }
  | { type: 'DELETE_TODO'; payload: number };

const todoReducer = (state: typeof initialState, action: TodoAction) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => 
          todo.id === action.payload.id ? {
            ...todo,
            text: action.payload.text,
            endTime: action.payload.endTime
          } : todo
        ),
        IsEditTodo: {
          id: 0,
          editMode: false
        }
      };
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };
    case 'EDIT_TODO':
      return {
        ...state,
        IsEditTodo: {
          id: action.payload,
          editMode: true
        },
      };
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };
    default:
      return state;
  }
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  const addTodo = (todo: Todo) => {
    dispatch({ type: 'ADD_TODO', payload: todo });
  };

  const updateTodo = (todo: Todo) => {
    dispatch({ type: 'UPDATE_TODO', payload: todo });
  };

  const toggleTodo = (id: number) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  };

  const editTodo = (id: number) => {
    dispatch({ type: 'EDIT_TODO', payload: id });
  };

  const deleteTodo = (id: number) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  };

  return (
    <TodoContext.Provider value={{ todos: state.todos, IsEditTodo: state.IsEditTodo,  addTodo, updateTodo, toggleTodo, editTodo, deleteTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext use inside a TodoProvider');
  }
  return context;
};
