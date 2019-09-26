import React from 'react';
import PropTypes from "prop-types";

const Paginaion = ({pages=3, pageIndex=1, totalPages, onPageChange}) => {
  if(totalPages <= 1) return null;

  if(pageIndex < 1) pageIndex = 1;
  if(pageIndex > totalPages) pageIndex = totalPages;

  const startPageIndex = Math.floor((pageIndex-1)/pages) * pages + 1;
  const endPageIndex = (startPageIndex + pages-1) > totalPages ? totalPages : (startPageIndex + pages-1);
  const listPageCell = [];
  if(startPageIndex > pages) {
    listPageCell.push(
      <li key="page_prev" onClick={() => onPageChange(pageIndex-1)} className="page-item">
        <font className="page-link">Prev</font>
      </li>
    );
  }
  for(let i = startPageIndex; i<=endPageIndex; i++) {
    listPageCell.push(
      <li key={"page"+i} onClick={() => onPageChange(i)} className={i === pageIndex ? "page-item active" : "page-item"}>
        <font className="page-link">{i}</font>
      </li>
    )
  }

  if(endPageIndex < totalPages ) {
    listPageCell.push(
      <li key="page_next" onClick={() => onPageChange(pageIndex+1)} className="page-item">
        <font className="page-link">Next</font>
      </li>
    );
  }
  
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {listPageCell}
      </ul>
    </nav>
  );
}

Paginaion.propTypes = {
  pages: PropTypes.number,
  pageIndex: PropTypes.number,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
}

export default Paginaion;