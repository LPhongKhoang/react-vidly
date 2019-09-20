import React from 'react';
import PropTypes from "prop-types";

const ListGroup = ({items, selectedItem, onItemSelect, allLabel, displayProperty, keyProperty}) => {
  
  return (
    <ul className="list-group">
      <li
          key="all-items-abc123"
          className={!selectedItem ? "list-group-item active" : "list-group-item"}
          onClick={() => onItemSelect(null)}
          style={{cursor: "pointer"}}
        >
          {allLabel}
        </li>
      {items.map(it => (
        <li
          key={it[keyProperty]}
          className={selectedItem === it ? "list-group-item active" : "list-group-item"}
          onClick={() => onItemSelect(it)}
          style={{cursor: "pointer"}}
        >
          {it[displayProperty]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  allLabel: "All items",
  displayProperty: "name",
  keyProperty: "_id"
}

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  onItemSelect: PropTypes.func.isRequired
}
 
export default ListGroup;