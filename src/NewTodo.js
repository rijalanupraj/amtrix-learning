import React, { useState, useContext } from 'react';
import MyContext from './utils/context';

const NewTodo = () => {
  const [newTitle, setNewTitle] = useState('');
  const { CRUDTodo } = useContext(MyContext);

  const onButtonClick = event => {
    event.preventDefault();
    CRUDTodo('ADD', { newTodo: { title: newTitle, id: Date.now().toString(36) } });
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
