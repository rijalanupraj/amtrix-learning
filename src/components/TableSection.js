import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

function TableSection({ headings, sortData, onIconClick, renderTableRow }) {
  return (
    <table>
      <TableHeader headings={headings} sortData={sortData} onIconClick={onIconClick} />
      <TableBody renderTableRow={renderTableRow} />
    </table>
  );
}

export default TableSection;
