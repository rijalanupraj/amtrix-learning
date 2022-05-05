import React from 'react';

function TableBody({ renderTableRow }) {
  return <tbody>{renderTableRow()}</tbody>;
}

export default TableBody;
