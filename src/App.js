import React, { useReducer } from 'react';
import MyContext from './utils/context';
import TodosList from './TodosList';
import NewTodo from './NewTodo';
import useTodo from './useTodo';

function App() {
  const [todos, dispatch] = useTodo();
  console.log('Hello');

  return (
    <MyContext.Provider value={{ todos, dispatch }}>
      <div>
        <NewTodo />
        <TodosList />
      </div>
    </MyContext.Provider>
  );
}

export default App;
