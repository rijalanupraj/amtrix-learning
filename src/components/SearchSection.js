import React from 'react';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

function SearchSection({
  headings,
  triggerStateChange,
  onColumnChange,
  setSearchData,
  onSearchButtonClick,
  clearSearch,
  searchData
}) {
  return (
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
  );
}

export default SearchSection;
