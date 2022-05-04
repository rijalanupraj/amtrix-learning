import React, { useContext, useState, useRef, useEffect } from 'react';
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
    columnId: null,
    value: null
  });
  const [tableData, setTableData] = useState([]);
  const [sortData, setSortData] = useState({
    columnId: null,
    sortType: null,
    dataType: null
  });

  useEffect(() => {
    setTableData(empInfo.data);
  }, [empInfo]);

  const onDataClick = (id, columnId, value, data) => {
    setInEditMode(prev => {
      return {
        id,
        data,
        status: true,
        columnId,
        value
      };
    });
  };

  const checkIfEditable = (id, columnId) => {
    if (!inEditMode.status) {
      return false;
    }
    if (id === inEditMode.id && inEditMode.columnId === columnId) {
      return true;
    }
    return false;
  };

  const onEditableChange = e => {
    e.preventDefault();

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
        columnId: null,
        value: null
      });
    } else if (e.key === 'Escape') {
      setInEditMode({
        data: null,
        status: false,
        id: null,
        columnId: null,
        value: null
      });
    }
  };

  const renderTableRow = () => {
    let sorted = [...tableData];
    switch (sortData.dataType) {
      case 'NUM':
        sorted.sort((a, b) => {
          if (sortData.sortType === 'DESC') {
            return b[sortData.columnId] - a[sortData.columnId];
          }
          return a[sortData.columnId] - b[sortData.columnId];
        });
        break;
      case 'STR':
        // Sort String
        sorted.sort((a, b) => {
          if (sortData.sortType === 'DESC') {
            return b[sortData.columnId].localeCompare(a[sortData.columnId]);
          }
          return a[sortData.columnId].localeCompare(b[sortData.columnId]);
        });
        break;
      default:
        break;
    }

    return sorted.map((elem, index) => {
      return (
        <tr key={elem[0]}>
          {elem.map((e, i) => {
            return checkIfEditable(elem[0], i) ? (
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
              <td key={i} onClick={() => onDataClick(elem[0], i, e, elem)}>
                {e}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  const onIconClick = (columnId, sortType, dataType) => {
    setSortData(prev => {
      return {
        columnId,
        sortType,
        dataType
      };
    });
  };

  const renderTableHeading = () => {
    const headings = ['S.N', 'First Name', 'Last Name', 'Age', 'Salary'];

    return (
      <>
        {headings.map((elem, index) => {
          return (
            <th key={elem}>
              {elem}
              {sortData.columnId !== index && (
                <>
                  <i
                    className='sort-icon fa fa-sort-desc'
                    onClick={() =>
                      onIconClick(index, 'DESC', index > 0 && index < 3 ? 'STR' : 'NUM')
                    }
                    aria-hidden='true'
                  ></i>
                  <i
                    className='sort-icon fa fa-sort-asc'
                    onClick={() =>
                      onIconClick(index, 'ASC', index > 0 && index < 3 ? 'STR' : 'NUM')
                    }
                    aria-hidden='true'
                  ></i>
                </>
              )}
              {sortData.columnId === index && sortData.sortType === 'ASC' && (
                <i
                  className='sort-icon fa fa-sort-desc'
                  onClick={() => onIconClick(index, 'DESC', index > 0 && index < 3 ? 'STR' : 'NUM')}
                  aria-hidden='true'
                ></i>
              )}
              {sortData.columnId === index && sortData.sortType === 'DESC' && (
                <i
                  className='sort-icon fa fa-sort-asc'
                  onClick={() => onIconClick(index, 'ASC', index > 0 && index < 3 ? 'STR' : 'NUM')}
                  aria-hidden='true'
                ></i>
              )}
            </th>
          );
        })}
      </>
    );
  };

  return (
    <div>
      <p>This is Table</p>
      <AddTable />
      <table>
        <thead>
          <tr>{renderTableHeading()}</tr>
        </thead>
        <tbody>{renderTableRow()}</tbody>
      </table>
    </div>
  );
}

export default MyTable;
