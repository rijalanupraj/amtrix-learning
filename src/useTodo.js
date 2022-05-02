// useTodo Hook which extends useReducer Hook
import React, { useReducer } from 'react';
import MyContext from './utils/context';

const useTodo = () => {
  const initialState = {
    list: [
      {
        title: 'ffjdskfjsdk',
        id: '423'
      }
    ],
    archived: []
  };

  const [todos, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'ADD':
          let newList = state.list;
          newList.push({
            title: action.payload.title,
            id: Date.now().toString(36)
          });
          return { ...state, list: newList };
        case 'DELETE':
          const updatedList = state.list.filter((elem, index) => {
            return elem.id !== action.payload.id;
          });
          return { ...state, list: updatedList };
        case 'UPDATE':
          const updateId = action.payload.id;
          // Update the todo
          const updatedTodo = state.list.find(elem => {
            return elem.id === updateId;
          });

          // Update the todo
          updatedTodo.title = action.payload.updatedTodo;

          // Update the list
          let upList = state.list.map(elem => {
            if (elem.id === updateId) {
              return updatedTodo;
            } else {
              return elem;
            }
          });
          return { ...state, list: upList };

        default:
          return state;
      }
    },
    { ...initialState }
  );

  return [todos, dispatch];
};

export default useTodo;
