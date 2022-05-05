import React from 'react';

function SearchSection({ headings, searchData, searchTable, setSearchData }) {
  return (
    <div className='search-div'>
      <form onSubmit={searchTable}>
        <select
          onChange={e => {
            setSearchData(prev => {
              return {
                ...prev,
                column: headings.findIndex(value => value === e.target.value)
              };
            });
          }}
          value={headings[searchData.column]}
        >
          {headings.map((elem, index) => {
            return (
              <option key={elem} value={elem}>
                {elem}{' '}
              </option>
            );
          })}
        </select>
        <input
          className='search-input'
          type='text'
          value={searchData.term}
          onChange={e =>
            setSearchData(prev => {
              return { ...prev, term: e.target.value };
            })
          }
        />
        <button className='submit-button' type='submit'>
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchSection;
