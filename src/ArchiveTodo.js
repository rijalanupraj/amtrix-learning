import React, { useContext } from 'react';
import MyContext from './utils/context';

const ArchiveTodo = ({ todo }) => {
  const { CRUDArchive } = useContext(MyContext);

  return (
    <div>
      <p>
        {todo.title}

        <button
          style={{ backgroundColor: 'red', color: 'white' }}
          onClick={() => CRUDArchive('DELETE', { id: todo.id })}
        >
          DELETE
        </button>
      </p>
    </div>
  );
};

export default ArchiveTodo;
