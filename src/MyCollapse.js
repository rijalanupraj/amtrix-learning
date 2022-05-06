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
import AddEmpInfo from './mycomp/AddEmpInfo';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp';

function Row(props) {
  const { row, triggerStateChange } = props;
  const [open, setOpen] = React.useState(false);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    id: null,
    value: null,
    columnKey: null
  });

  const genders = [
    {
      value: 'Select',
      label: 'Select'
    },
    {
      value: 'Male',
      label: 'Male'
    },
    {
      value: 'Female',
      label: 'Female'
    }
  ];

  const checkIfEditable = (id, columnKey) => {
    if (!inEditMode.status) {
      return false;
    }
    if (id === inEditMode.id && inEditMode.columnKey === columnKey) {
      return true;
    }
    return false;
  };

  const onTableDataClick = (id, columnKey, value) => {
    setInEditMode(prev => {
      return {
        id,
        status: true,
        columnKey,
        value
      };
    });
  };

  const updateDataRequest = async (id, columKey, value) => {
    // Update Data
    const response = await axios.patch('http://localhost:8000/empInfo/' + id, {
      [columKey]: value
    });

    if (response.status === 200) {
      triggerStateChange();
      alert('Successful');
    } else {
      alert('Failed');
    }
  };

  const updateGender = (id, columKey, value) => {
    updateDataRequest(id, columKey, value);
    setInEditMode({
      status: false,
      id: null,
      columKey: null,
      value: null
    });
  };

  const deleteSingleRow = async id => {
    const response = await axios.delete('http://localhost:8000/empInfo/' + id);
    if (response.status === 200) {
      triggerStateChange();
      alert('Successful');
    } else {
      alert('Failed');
    }
  };

  const onUpdateSubmit = e => {
    switch (e.key) {
      case 'Enter':
        updateDataRequest(inEditMode.id, inEditMode.columnKey, inEditMode.value);
        setInEditMode({
          status: false,
          id: null,
          columKey: null,
          value: null
        });
        break;
      case 'Escape':
        setInEditMode({
          status: false,
          id: null,
          columnKey: null,
          value: null
        });
        break;
      default:
        break;
    }
  };

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
          {/* Delete  */}
          <DeleteForeverIcon color='error' onClick={() => deleteSingleRow(row.id)} />
        </TableCell>
        {Object.keys(row).map((key, index) => {
          if (key === 'history' || key === 'id') {
            return null;
          }

          return checkIfEditable(row.id, key) ? (
            <TableCell key={key} align='right'>
              {key === 'gender' ? (
                <>
                  <TextField
                    id='filled-select-currency-native'
                    select
                    label='Gender'
                    value={key.gender}
                    onChange={e => {
                      console.log(e.target.value);
                      setInEditMode({
                        ...inEditMode,
                        value: e.target.value
                      });
                      updateGender(row.id, key, e.target.value);
                    }}
                    SelectProps={{
                      native: true
                    }}
                    variant='filled'
                  >
                    {genders.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </TextField>
                  <BackspaceSharpIcon
                    onClick={() => setInEditMode({ ...inEditMode, status: false })}
                  />
                </>
              ) : (
                <>
                  <TextField
                    id={`${row.id}-${key}`}
                    value={inEditMode.value}
                    onKeyDown={onUpdateSubmit}
                    onChange={e =>
                      setInEditMode({
                        ...inEditMode,
                        value: e.target.value
                      })
                    }
                  />
                  <BackspaceSharpIcon
                    onClick={() => setInEditMode({ ...inEditMode, status: false })}
                  />
                </>
              )}
            </TableCell>
          ) : (
            <TableCell
              key={key}
              align='right'
              onClick={() => onTableDataClick(row.id, key, row[key])}
            >
              {row[key]}
            </TableCell>
          );
        })}
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
    column: 'all',
    status: false
  });
  const [updateTrigger, setUpdateTrigger] = React.useState(false);
  const [sortField, setSortField] = useState(null);

  const headings = ['id', 'firstName', 'lastName', 'age', 'Gender', 'salary'];
  const searchFields = ['searchFields', 'id', 'firstName', 'lastName', 'age', 'Gender', 'salary'];

  useEffect(() => {
    const fetchEmp = async () => {
      let response;
      if (searchData.column === 'all' && searchData.status === true && searchData.term != null) {
        response = await fetch('http://localhost:8000/empInfo?q=' + searchData.term);
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

  const triggerStateChange = () => {
    setUpdateTrigger(!updateTrigger);
  };

  return (
    <>
      <AddEmpInfo />
      <br />
      <br />
      <br />
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
            <MenuItem value={'all'}>{'All'}</MenuItem>
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
              <Row key={row.id} row={row} triggerStateChange={triggerStateChange} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
