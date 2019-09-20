import React from "react";
import _ from "lodash";

const TableBody = ({data, columns }) => {
  const renderCell = (item, col) => {
    if(col.renderContent) return col.renderContent(item);
    return _.get(item, col.path, '');
  }

  return (
    <tbody>
      {data.map((item, idx) => (
        <tr key={idx}>
          <th scope="row">{idx + 1}</th>
          {columns.map(c => (
            <td key={idx+(c.path || c.key)}>{renderCell(item, c)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;
