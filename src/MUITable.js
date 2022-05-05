import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
});

export default function MUITable() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [data, setData] = React.useState([]);

  useEffect(() => {
    const fetchEmp = async () => {
      const response = await fetch(
        `http://localhost:8000/empInfo?$_page=${page}&_limit=${pageSize}`
      );

      const data = await response.json();

      // Convert object to array
      const dataArray = [];

      for (let i = 0; i < data.length; i++) {
        dataArray.push(Object.values(data[i]));
      }
      setData(dataArray);
    };

    fetchEmp();
  }, [page]);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>S.N</TableCell>
                <TableCell align='right'>First Name</TableCell>
                <TableCell align='right'>Last Name</TableCell>
                <TableCell align='right'>Age</TableCell>
                <TableCell align='right'>Salary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map(row => (
                <TableRow key={row[0]} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell component='th' scope='row'>
                    {row[0]}
                  </TableCell>
                  <TableCell align='right'>{row[1]}</TableCell>
                  <TableCell align='right'>{row[2]}</TableCell>
                  <TableCell align='right'>{row[3]}</TableCell>
                  <TableCell align='right'>{row[4]}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ThemeProvider>
      <Stack spacing={2}>
        <Pagination
          count={4}
          onChange={e => {
            setPage(e.currentTarget.textContent);
          }}
          variant='outlined'
          shape='rounded'
        />
      </Stack>
    </>
  );
}
