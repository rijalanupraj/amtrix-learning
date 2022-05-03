import React from 'react';
import TodosList from './TodosList';
import NewTodo from './NewTodo';
import { Link } from 'react-router-dom';

export default function TodoPage() {
  return (
    <div>
      <NewTodo />
      <TodosList />
      <Link to='/archive'>Go To Archive Page</Link>
    </div>
  );
}
