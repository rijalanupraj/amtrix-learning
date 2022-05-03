import React, { useContext, useState } from 'react';
import MyContext from './utils/context';

const SingleTodo = ({ todo }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedText, setUpdatedText] = useState('');
  const { dispatch } = useContext(MyContext);

  const onEditButtonClick = () => {
    setIsUpdate(prev => {
      return !prev;
    });
  };

  const onUpdateButtonClick = event => {
    event.preventDefault();
    dispatch({ type: 'UPDATE', payload: { id: todo.id, updatedTodo: updatedText } });
    setIsUpdate(false);
  };

  return (
    <div>
      <p>
        {todo.title}
        <button
          style={{ backgroundColor: 'red', color: 'white' }}
          onClick={() => dispatch({ type: 'DELETE', payload: { id: todo.id } })}
        >
          Delete
        </button>
        <button
          style={{ backgroundColor: 'lightgreen', color: 'black' }}
          onClick={onEditButtonClick}
        >
          Edit
        </button>
        {isUpdate && (
          <div>
            <input
              type='text'
              value={updatedText}
              onChange={event => setUpdatedText(event.target.value)}
            />
            <button onClick={onUpdateButtonClick}>Update Todo</button>
          </div>
        )}
      </p>
    </div>
  );
};

export default SingleTodo;
