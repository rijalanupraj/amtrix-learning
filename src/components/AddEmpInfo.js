import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import axios from 'axios';
import Grid from '@mui/material/Grid';

function AddEmpInfo() {
  const [fName, setFName] = React.useState('');
  const [lName, setLName] = React.useState('');
  const [age, setAge] = React.useState(1);
  const [salary, setSalary] = React.useState(0);
  const [gender, setGender] = useState('MALE');

  const genders = [
    {
      value: 'Male',
      label: 'Male'
    },
    {
      value: 'Female',
      label: 'Female'
    }
  ];

  const onFormSubmit = async e => {
    e.preventDefault();

    // Add new employee using post request
    const response = await axios.post('http://localhost:8000/empInfo', {
      firstName: fName,
      lastName: lName,
      age,
      salary,
      gender,
      history: [
        {
          date: new Date().toISOString(),
          customerId: '11091700',
          amount: 3
        }
      ]
    });
    if (response.status === 201) {
      setFName('');
      setLName('');
      setAge(1);
      setSalary(0);
    }
  };

  const handleGenderChange = event => {
    setGender(event.target.value);
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={4}>
            <TextField
              type='text'
              value={fName}
              onChange={e => setFName(e.target.value)}
              id='outlined-basic'
              label='First Name'
              variant='outlined'
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              type='text'
              value={lName}
              onChange={e => setLName(e.target.value)}
              id='outlined-basic'
              label='Last Name'
              variant='outlined'
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              value={age}
              onChange={e => setAge(e.target.value)}
              type='number'
              id='outlined-basic'
              label='Age'
              variant='outlined'
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              value={salary}
              onChange={e => setSalary(e.target.value)}
              type='number'
              id='outlined-basic'
              label='Salary'
              variant='outlined'
            />
          </Grid>

          <Grid item xs={4}>
            <TextField
              id='filled-select-currency-native'
              select
              label='Gender'
              value={gender}
              onChange={handleGenderChange}
              SelectProps={{
                native: true
              }}
              //   helperText='Please Select you age'
              variant='filled'
            >
              {genders.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <Button type='submit' variant='contained' color='primary'>
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AddEmpInfo;
