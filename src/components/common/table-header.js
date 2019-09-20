import React from "react";

const TableHeader = ({ columns, sortColumn, onSort }) => {
  const handleSortClick = path => {
    if (!path) return;
    const newSortColumn = { ...sortColumn };
    if (path === newSortColumn.path) {
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    } else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    onSort(newSortColumn);
  };

  return (
    <thead>
      <tr>
        <th key="#" scope="col">
          #
        </th>
        {columns.map(c => (
          <th
            className={c.path? 'pointer' : ''}
            key={c.path || c.key}
            onClick={() => handleSortClick(c.path)}
            scope="col"
          >
            {c.name}
            {c.path === sortColumn.path && (
              sortColumn.order === 'asc'
              ? <i className="fa fa-sort-asc ml-10" aria-hidden="true"></i>
              : <i className="fa fa-sort-desc ml-10" aria-hidden="true"></i>
            )}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
