import React, { useContext, useState, useRef, useEffect } from 'react';
import MyContext from './utils/MyContext';
import './style/table.css';
import SearchSection from './components/SearchSection';
import TableSection from './components/TableSection';

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

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5
  });

  useEffect(() => {
    // Fetch data from http
    const fetchEmp = async () => {
      const response = await fetch(
        `http://localhost:8000/empInfo?_page=${pagination.page}&_limit=${pagination.limit}`
      );

      const data = await response.json();

      // Convert object to array
      const dataArray = [];

      for (let i = 0; i < data.length; i++) {
        dataArray.push(Object.values(data[i]));
      }
      setTableData(dataArray);
      CRUDData('REPLACE', { data: dataArray });
    };
    fetchEmp();
  }, []);

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

  const searchTable = e => {
    e.preventDefault();
    // Search Data
    let searchedData = [...empInfo.data];
    searchedData = searchedData.filter(elem => {
      return elem[searchData.column]
        .toString()
        .toLowerCase()
        .includes(searchData.term.toString().toLowerCase());
    });

    setTableData(searchedData);
  };

  return (
    <div>
      <SearchSection
        headings={headings}
        searchData={searchData}
        searchTable={searchTable}
        setSearchData={setSearchData}
      />
      <TableSection
        headings={headings}
        sortData={sortData}
        onIconClick={onIconClick}
        renderTableRow={renderTableRow}
      />
    </div>
  );
}

export default MyTable;
