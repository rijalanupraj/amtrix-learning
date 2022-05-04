import React, { useState, useContext } from 'react';
import MyContext from './utils/MyContext';

function AddTable() {
  const { empInfo, CRUDData } = useContext(MyContext);
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [age, setAge] = useState(1);
  const [salary, setSalary] = useState(0);

  const onFormSubmit = e => {
    e.preventDefault();
    CRUDData('ADD', { newData: [empInfo.data.length + 1, fName, lName, age, salary] });
    setFName('');
    setLName('');
    setAge(1);
    setSalary(0);
  };

  return (
    <div>
      <form onSubmit={onFormSubmit}>
        <input
          type='text'
          placeholder='
        First Name'
          value={fName}
          onChange={e => setFName(e.target.value)}
        />
        <input
          type='text'
          placeholder='Last Name'
          value={lName}
          onChange={e => setLName(e.target.value)}
        />
        <input type='number' placeholder='Age' value={age} onChange={e => setAge(e.target.value)} />
        <input
          type='number'
          placeholder='Salary'
          value={salary}
          onChange={e => setSalary(e.target.value)}
        />
        <button> Submit</button>
      </form>
    </div>
  );
}

export default AddTable;
