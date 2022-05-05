import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label='expand row' size='small' onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>
          {row.id}
        </TableCell>
        <TableCell align='right'>{row.firstName}</TableCell>
        <TableCell align='right'>{row.lastName}</TableCell>
        <TableCell align='right'>{row.age}</TableCell>
        <TableCell align='right'>{row.gender}</TableCell>
        <TableCell align='right'>{row.salary}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>
                History
              </Typography>
              <Table size='small' aria-label='purchases'>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Customer</TableCell>
                    <TableCell align='right'>Amount</TableCell>
                    <TableCell align='right'>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.history.map(historyRow => (
                    <TableRow key={historyRow.date}>
                      <TableCell component='th' scope='row'>
                        {historyRow.date}
                      </TableCell>
                      <TableCell>{historyRow.customerId}</TableCell>
                      <TableCell align='right'>{historyRow.amount}</TableCell>
                      <TableCell align='right'>
                        {Math.round(historyRow.amount * row.salary * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function MyCollapse() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);
  const [filterShow, setFilterShow] = useState(0);
  const [searchData, setSearchData] = React.useState({
    term: null,
    column: 'id',
    status: false
  });
  const [searchTrigger, setSearchTrigger] = React.useState(false);
  const [sortField, setSortField] = useState(null);

  const headings = ['id', 'firstName', 'lastName', 'age', 'Gender', 'salary'];

  useEffect(() => {
    const fetchEmp = async () => {
      const response = await fetch(
        searchData.status
          ? `http://localhost:8000/empInfo?${searchData.column}=${searchData.term}&_page=${
              page + 1
            }&_limit=${pageSize}`
          : `http://localhost:8000/empInfo?_page=${page + 1}&_limit=${pageSize}`
      );

      const data = await response.json();

      setData(data);
    };

    fetchEmp();
  }, [page, pageSize, searchTrigger]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPageSize(event.target.value);
    setPage(0);
  };

  const onColumnChange = event => {
    setSearchData({ ...searchData, column: event.target.value });
  };

  const onSearchButtonClick = event => {
    setSearchData({ ...searchData, status: true });
    setSearchTrigger(!searchTrigger);
  };

  const clearSearch = event => {
    setSearchData({ ...searchData, status: false });
    setSearchTrigger(!searchTrigger);
  };

  return (
    <>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id='demo-simple-select-label'>Select Column</InputLabel>
          <Select
            labelId='demo-simple-select-label'
            id='demo-simple-select'
            value={searchData.column}
            label='Column'
            onChange={onColumnChange}
          >
            <MenuItem value={headings[0]}>{headings[0]}</MenuItem>
            <MenuItem value={headings[1]}>{headings[1]}</MenuItem>
            <MenuItem value={headings[2]}>{headings[2]}</MenuItem>
            <MenuItem value={headings[3]}>{headings[3]}</MenuItem>
            <MenuItem value={headings[4]}>{headings[4]}</MenuItem>
            <MenuItem value={headings[5]}>{headings[5]}</MenuItem>
          </Select>
          <TextField
            id='outlined-basic'
            onChange={e => {
              setSearchData({ ...searchData, term: e.target.value });
            }}
            label='Search'
            variant='outlined'
          />
          <Button variant='contained' onClick={onSearchButtonClick}>
            Search
          </Button>
          <Button variant='outlined' onClick={clearSearch}>
            Clear Search
          </Button>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table aria-label='collapsible table'>
          <TableHead>
            <TableRow>
              <TableCell />
              {headings.map((heading, index) => (
                <TableCell
                  onMouseEnter={e => {
                    setFilterShow(index);
                  }}
                  onMouseLeave={e => {
                    setFilterShow(-1);
                  }}
                  key={heading}
                >
                  {heading}
                  {filterShow === index && <ArrowDownwardIcon />}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map(row => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2, 5, 10, 25, 100]}
        component='div'
        count={20}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
}
