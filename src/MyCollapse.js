import React, { useState, useEffect } from 'react';
import TablePagination from '@mui/material/TablePagination';
import AddEmpInfo from './components/AddEmpInfo';
import MyTable from './components/MyTable';

import SearchSection from './components/SearchSection';

export default function MyCollapse() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = React.useState({
    term: null,
    column: 'all',
    status: false
  });
  const [updateTrigger, setUpdateTrigger] = React.useState(false);
  const headings = ['id', 'firstName', 'lastName', 'age', 'salary', 'gender'];

  useEffect(() => {
    const fetchEmp = async () => {
      let response;
      if (searchData.column === 'all' && searchData.status === true && searchData.term != null) {
        response = await fetch(
          `http://localhost:8000/empInfo?q=${searchData.term}&_page=${page + 1}&_limit=${pageSize}`
        );
      } else if (searchData.column !== 'all') {
        response = await fetch(
          `http://localhost:8000/empInfo?${searchData.column}=${searchData.term}&_page=${
            page + 1
          }&_limit=${pageSize}`
        );
      } else {
        response = await fetch(
          `http://localhost:8000/empInfo?_page=${page + 1}&_limit=${pageSize}`
        );
      }
      const data = await response.json();
      setData(data);
    };

    fetchEmp();
  }, [page, pageSize, updateTrigger]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPageSize(event.target.value);
    setPage(0);
  };

  const triggerStateChange = () => {
    setUpdateTrigger(!updateTrigger);
  };

  const onColumnChange = event => {
    setSearchData({ ...searchData, column: event.target.value });
  };

  const onSearchButtonClick = event => {
    setSearchData({ ...searchData, status: true });
    triggerStateChange();
  };

  const clearSearch = event => {
    setSearchData({ ...searchData, status: false });
    triggerStateChange();
  };

  return (
    <>
      <AddEmpInfo />
      <br />
      <br />
      <SearchSection
        headings={headings}
        triggerStateChange={triggerStateChange}
        onColumnChange={onColumnChange}
        setSearchData={setSearchData}
        onSearchButtonClick={onSearchButtonClick}
        clearSearch={clearSearch}
        searchData={searchData}
      />
      <MyTable headings={headings} data={data} triggerStateChange={triggerStateChange} />
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25, 100]}
        component='div'
        count={30}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
