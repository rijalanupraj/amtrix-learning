import React from 'react';
import '../style/table.css';

function TableHeader({ headings, sortData, onIconClick }) {
  const renderTableHeading = () => {
    return (
      <>
        {headings.map((elem, index) => {
          return (
            <th key={elem}>
              {elem}
              {sortData.columnId !== index && (
                <>
                  <i
                    className='sort-icon fa fa-arrow-up'
                    onClick={() =>
                      onIconClick(index, 'DESC', index > 0 && index < 3 ? 'STR' : 'NUM')
                    }
                    aria-hidden='true'
                  ></i>
                  <i
                    className='sort-icon fa-solid fa-circle-minus'
                    onClick={() => onIconClick(index, 'DEFAULT', 'DEFAULT')}
                    aria-hidden='true'
                  ></i>
                  <i
                    className='sort-icon fa fa-arrow-down'
                    onClick={() =>
                      onIconClick(index, 'ASC', index > 0 && index < 3 ? 'STR' : 'NUM')
                    }
                    aria-hidden='true'
                  ></i>
                </>
              )}
              {sortData.columnId === index && sortData.sortType === 'ASC' && (
                <i
                  className='sort-icon fa fa-arrow-up'
                  onClick={() => onIconClick(index, 'DESC', index > 0 && index < 3 ? 'STR' : 'NUM')}
                  aria-hidden='true'
                ></i>
              )}
              {sortData.columnId === index && sortData.sortType === 'DESC' && (
                <i
                  className='sort-icon fa fa-arrow-down'
                  onClick={() => onIconClick(index, 'ASC', index > 0 && index < 3 ? 'STR' : 'NUM')}
                  aria-hidden='true'
                ></i>
              )}
            </th>
          );
        })}
      </>
    );
  };
  return (
    <thead>
      <tr>{renderTableHeading()}</tr>
    </thead>
  );
}

export default TableHeader;
