import React, { useContext, useState, useRef, useEffect } from 'react';
import MyContext from './utils/MyContext';
import './style/table.css';
import AddTable from './AddTable';

function MyTable() {
  const myRef = useRef();
  const headings = ['S.N', 'First Name', 'Last Name', 'Age', 'Salary'];
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
  const [searchData, setSearchData] = useState({
    term: '',
    column: 0
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
      case 'DEFAULT':
        console.log('hello');
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
    return (
      <>
        {headings.map((elem, index) => {
          return (
            <th key={elem}>
              {elem}
              {sortData.columnId !== index && (
                <>
                  <i
                    className='sort-icon fa fa-arrow-up'
                    onClick={() =>
                      onIconClick(index, 'DESC', index > 0 && index < 3 ? 'STR' : 'NUM')
                    }
                    aria-hidden='true'
                  ></i>
                  <i
                    className='sort-icon fa-solid fa-circle-minus'
                    onClick={() => onIconClick(index, 'DEFAULT', 'DEFAULT')}
                    aria-hidden='true'
                  ></i>
                  <i
                    className='sort-icon fa fa-arrow-down'
                    onClick={() =>
                      onIconClick(index, 'ASC', index > 0 && index < 3 ? 'STR' : 'NUM')
                    }
                    aria-hidden='true'
                  ></i>
                </>
              )}
              {sortData.columnId === index && sortData.sortType === 'ASC' && (
                <i
                  className='sort-icon fa fa-arrow-up'
                  onClick={() => onIconClick(index, 'DESC', index > 0 && index < 3 ? 'STR' : 'NUM')}
                  aria-hidden='true'
                ></i>
              )}
              {sortData.columnId === index && sortData.sortType === 'DESC' && (
                <i
                  className='sort-icon fa fa-arrow-down'
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

  const searchTable = e => {
    e.preventDefault();
    // Search Data
    let searchedData = [...empInfo.data];
    searchedData = searchedData.filter(elem => {
      console.log(elem[searchData.column]);
      return elem[searchData.column]
        .toString()
        .toLowerCase()
        .includes(searchData.term.toString().toLowerCase());
    });

    setTableData(searchedData);
  };

  return (
    <div>
      <p>This is Table</p>
      <AddTable />
      <div className='search-div'>
        <form onSubmit={searchTable}>
          <select
            onChange={e => {
              setSearchData(prev => {
                return {
                  ...prev,
                  column: headings.findIndex(value => value === e.target.value)
                };
              });
            }}
            value={headings[searchData.column]}
          >
            {headings.map((elem, index) => {
              return (
                <option key={elem} value={elem}>
                  {elem}{' '}
                </option>
              );
            })}
          </select>
          <input
            className='search-input'
            type='text'
            value={searchData.term}
            onChange={e =>
              setSearchData(prev => {
                return { ...prev, term: e.target.value };
              })
            }
          />
          <button className='submit-button' type='submit'>
            Search
          </button>
        </form>
      </div>
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
