import { Container } from '@mui/material';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { TodoProvider } from '../contexts/TodoContext';

const Home: React.FC = () => {
  return (
    <TodoProvider>
      <Container>
        <TodoForm />
        <TodoList />
      </Container>
    </TodoProvider>
  );
};

export default Home;
