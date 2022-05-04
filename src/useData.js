import { useReducer } from 'react';

const useData = () => {
  const initialValue = {
    data: [
      [1, 'Anup Raj', 'Rijal', 21, 4000],
      [4, 'Hrishav', 'Paija', 17, 32000],
      [3, 'Simanta', 'Karki', 71, 8000],
      [2, 'Sulav', 'Pandey', 22, 14000],
      [5, 'Pranap', 'Khadka', 32, 23000]
    ]
  };
  const [empInfo, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'CRUDDATA':
        return { ...state, data: action.data };
      default:
        return state;
    }
  }, initialValue);

  const CRUDData = (opt, payload) => {
    switch (opt) {
      case 'ADD':
        let newDataList = [...empInfo.data, payload.newData];
        return dispatch({ type: 'CRUDDATA', data: newDataList });
      case 'UPDATE':
        let updatedData = empInfo.data.map((elem, index) => {
          if (elem[0] === payload.id) {
            return payload.updatedData;
          }
          return elem;
        });
        return dispatch({ type: 'CRUDDATA', data: updatedData });
      case 'REPLACE':
        return dispatch({ type: 'CRUDDATA', data: payload.data });
      default:
        return empInfo.data;
    }
  };

  return { empInfo, dispatch, CRUDData };
};

export default useData;
