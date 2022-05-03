import React, { useContext, useState } from 'react';
import MyContext from './utils/context';

const SingleTodo = ({ todo }) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedText, setUpdatedText] = useState('');
  const { dispatch, CRUDTodo } = useContext(MyContext);

  const onEditButtonClick = () => {
    setIsUpdate(prev => {
      return !prev;
    });
  };

  const onUpdateButtonClick = event => {
    event.preventDefault();
    CRUDTodo('UPDATE', { id: todo.id, updatedTodo: updatedText });
    setIsUpdate(false);
  };

  return (
    <div>
      <p>
        {todo.title}
        <button
          style={{ backgroundColor: 'pink', color: 'white' }}
          onClick={() =>
            CRUDTodo('ARCHIVE', {
              id: todo.id
            })
          }
        >
          ARCHIVE
        </button>
        <button
          style={{ backgroundColor: 'red', color: 'white' }}
          onClick={() => CRUDTodo('DELETE', { id: todo.id })}
        >
          DELETE
        </button>
        <button
          style={{ backgroundColor: 'lightgreen', color: 'black' }}
          onClick={onEditButtonClick}
        >
          Edit
        </button>
      </p>
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
    </div>
  );
};

export default SingleTodo;
