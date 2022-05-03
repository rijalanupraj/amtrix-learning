import React, { useReducer } from 'react';

const useTodo = () => {
  const initialState = {
    list: [],
    archive: []
  };

  const [todos, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'LIST':
          return { ...state, list: action.list };
        case 'ARCHIVE':
          return { ...state, archive: action.archive };
        default:
          return state;
      }
    },
    { ...initialState }
  );

  const CRUDTodo = (opt, payload) => {
    switch (opt) {
      case 'ADD':
        let newList = [...todos.list, payload.newTodo];
        return dispatch({ type: 'LIST', list: newList });

      case 'ARCHIVE':
        let archiveList = [...todos.archive];
        let remainingList = todos.list.filter((elem, index) => {
          if (elem.id === payload.id) {
            archiveList = [...archiveList, elem];
          }
          return elem.id !== payload.id;
        });
        dispatch({ type: 'ARCHIVE', archive: archiveList });
        return dispatch({ type: 'LIST', list: remainingList });

      case 'DELETE':
        let remList = todos.list.filter((elem, index) => {
          return elem.id !== payload.id;
        });
        return dispatch({ type: 'LIST', list: remList });
      case 'UPDATE':
        const updatedTodo = todos.list.find(elem => {
          return elem.id === payload.id;
        });
        updatedTodo.title = payload.updatedTodo;

        // Updated List
        let upList = todos.list.map(elem => {
          if (elem.id === payload.id) {
            return updatedTodo;
          } else {
            return elem;
          }
        });
        return dispatch({ type: 'LIST', list: upList });

      default:
        return todos.list;
    }
  };

  const CRUDArchive = (opt, payload) => {
    switch (opt) {
      case 'DELETE':
        let remainingArchive = todos.archive.filter((elem, index) => {
          return elem.id !== payload.id;
        });
        return dispatch({ type: 'ARCHIVE', archive: remainingArchive });
      default:
        return todos.archive;
    }
  };

  return { todos, dispatch, CRUDTodo, CRUDArchive };
};

export default useTodo;
