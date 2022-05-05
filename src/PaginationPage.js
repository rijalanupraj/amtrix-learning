import React from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

function PaginationPage() {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5);
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchEmp = async () => {
      const response = await fetch(
        `http://localhost:8000/empInfo?_page=${page}&_limit=${pageSize}`
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
    <div>
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
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
              <td>{item[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Pagination */}
      <Button variant='contained'>Hello World</Button>
      <div>
        {page > 1 && <button onClick={() => setPage(page - 1)}>Prev</button>}
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}

export default PaginationPage;
