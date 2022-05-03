import React, { useContext } from 'react';
import MyContext from './utils/context';
import ArchiveTodo from './ArchiveTodo';
import { Link } from 'react-router-dom';

function ArchivePage() {
  const { todos, dispatch } = useContext(MyContext);

  const renderArchivedTodo = () => {
    if (todos.archive.length === 0) {
      return <h3>No Archive Found</h3>;
    } else {
      return (
        <>
          <ul>
            {todos.archive.map((todo, index) => {
              return <ArchiveTodo key={todo.id} todo={todo} />;
            })}
          </ul>
        </>
      );
    }
  };

  return (
    <div>
      <Link to='/'>Home</Link>
      {renderArchivedTodo()}
    </div>
  );
}

export default ArchivePage;
