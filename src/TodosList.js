import React, { useContext } from 'react';
import MyContext from './utils/context';
import SingleTodo from './SingleTodo';

const TodosList = () => {
  const { todos } = useContext(MyContext);
  return (
    <div>
      <ul>
        {todos.list.map((todo, index) => {
          return <SingleTodo key={todo.id} todo={todo} />;
        })}
      </ul>
    </div>
  );
};

export default TodosList;
