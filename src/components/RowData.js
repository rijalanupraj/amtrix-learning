import React, { useState } from 'react';
import axios from 'axios';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackspaceSharpIcon from '@mui/icons-material/BackspaceSharp';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import TableCell from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { Button, Typography } from '@mui/material';
import Table from '@mui/material/Table';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MyModal from './MyModal';

function RowData({ row, triggerStateChange }) {
  const [open, setOpen] = React.useState(false);
  const [inEditMode, setInEditMode] = useState({
    status: false,
    id: null,
    value: null,
    columnKey: null
  });

  const [deleteRowId, setDeleteRowId] = useState(null);
  const [modalOpen, setModalOpen] = useState(true);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setDeleteRowId(null);
  };

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
    const response = await axios.delete('http://localhost:8000/empInfo/' + deleteRowId);
    if (response.status === 200) {
      triggerStateChange();
      alert('Successful');
      setDeleteRowId(null);
    } else {
      alert('Failed');
      setDeleteRowId(null);
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

  const deletePopUp = rowId => {
    setDeleteRowId(rowId);
    setModalOpen(true);
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
          <DeleteForeverIcon color='error' onClick={() => deletePopUp(row.id)} />
        </TableCell>
        {Object.keys(row).map((key, index) => {
          if (key === 'history' || key === 'id') {
            return null;
          }

          return checkIfEditable(row.id, key) ? (
            <TableCell key={key} align='left'>
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
            <TableCell key={key} onClick={() => onTableDataClick(row.id, key, row[key])}>
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
      {deleteRowId && (
        <MyModal modalOpen={modalOpen} handleModalClose={handleModalClose}>
          <>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Delete Data
            </Typography>
            <Typography id='modal-modal-description' sx={{ mt: 2 }}>
              Are you Sure you want to Delete?
            </Typography>
            <Button variant='contained' color='primary' onClick={deleteSingleRow}>
              Delete
            </Button>
          </>
        </MyModal>
      )}
    </React.Fragment>
  );
}

export default RowData;
