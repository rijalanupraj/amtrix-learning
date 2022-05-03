import React, { useReducer } from 'react';
import MyContext from './utils/context';
import useTodo from './useTodo';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TodoPage from './TodoPage';
import ArchivePage from './ArchivePage';

function App() {
  const { todos, dispatch, CRUDTodo, CRUDArchive } = useTodo();

  return (
    <BrowserRouter>
      <MyContext.Provider value={{ todos, dispatch, CRUDTodo, CRUDArchive }}>
        <Routes>
          <Route path='/' element={<TodoPage />}></Route>
          <Route path='/archive' element={<ArchivePage />}></Route>
        </Routes>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
