import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Internal Import
import RowData from './RowData';

const MyTable = ({ headings, data, triggerStateChange }) => {
  const [filterShow, setFilterShow] = useState(0);

  return (
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
            <RowData key={row.id} row={row} triggerStateChange={triggerStateChange} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
