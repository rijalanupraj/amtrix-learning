import React, { useContext, useState, useRef } from 'react';
import MyContext from './utils/MyContext';
import './style/table.css';
import AddTable from './AddTable';

function MyTable() {
  const myRef = useRef();
  const { empInfo, CRUDData } = useContext(MyContext);
  const [inEditMode, setInEditMode] = useState({
    data: null,
    status: false,
    id: null,
    rowId: null,
    columnId: null,
    value: null
  });

  const onDataClick = (id, rowId, columnId, value, data) => {
    setInEditMode(prev => {
      return {
        id,
        data,
        status: true,
        rowId,
        columnId,
        value
      };
    });
  };

  const checkIfEditable = (id, rowId, columnId) => {
    if (!inEditMode.status) {
      return false;
    }
    if (id === inEditMode.id && rowId === inEditMode.rowId && inEditMode.columnId === columnId) {
      return true;
    }
    return false;
  };

  const onEditableChange = e => {
    e.preventDefault();
    console.log('hello');

    setInEditMode(prevState => {
      return {
        ...prevState,
        value: e.target.value
      };
    });
  };

  const onUpdateSubmit = e => {
    if (e.key === 'Enter') {
      let updatedData = [...inEditMode.data];
      updatedData[inEditMode.columnId] = inEditMode.value;
      CRUDData('UPDATE', { id: inEditMode.id, updatedData });
      setInEditMode({
        data: null,
        status: false,
        id: null,
        rowId: null,
        columnId: null,
        value: null
      });
    } else if (e.key === 'Escape') {
      setInEditMode({
        data: null,
        status: false,
        id: null,
        rowId: null,
        columnId: null,
        value: null
      });
    }
  };

  return (
    <div>
      <p>This is Table</p>
      <AddTable />
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Age</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          {empInfo.data.map((elem, index) => {
            return (
              <tr key={elem[0]}>
                {elem.map((e, i) => {
                  return checkIfEditable(elem[0], index, i) ? (
                    <td key={i}>
                      <input
                        ref={myRef}
                        value={inEditMode.value}
                        onChange={onEditableChange}
                        type={i > 2 ? 'number' : 'text'}
                        onKeyDown={onUpdateSubmit}
                      />
                    </td>
                  ) : (
                    <td key={i} onClick={() => onDataClick(elem[0], index, i, e, elem)}>
                      {e}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default MyTable;
