import React from 'react';
import TableHeader from "./table-header";
import TableBody from "./table-body";

const Table = ({columns, data, sortColumn, onSort}) => {
  if(data.length === 0) return null;
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody columns={columns} data={data} />
    </table>
  );
}
 
export default Table;