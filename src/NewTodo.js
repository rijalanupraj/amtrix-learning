import React, { useState, useContext } from 'react';
import MyContext from './utils/context';

const NewTodo = () => {
  const [newTitle, setNewTitle] = useState('');
  const { dispatch } = useContext(MyContext);

  const onButtonClick = event => {
    event.preventDefault();
    dispatch({ type: 'ADD', payload: { title: newTitle } });
  };

  return (
    <div>
      <input
        type='text'
        value={newTitle}
        onChange={event => {
          setNewTitle(event.target.value);
        }}
      />
      <button onClick={onButtonClick}>Add Todo</button>
    </div>
  );
};

export default NewTodo;
