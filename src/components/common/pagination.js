import React from 'react';

export default ({pages=3, pageIndex=1, totalPages, onPageChange}) => {
  if(pageIndex < 1) pageIndex = 1;
  if(pageIndex > totalPages) pageIndex = totalPages;

  const startPageIndex = Math.floor(pageIndex/pages) * 3 + 1;
  const endPageIndex = startPageIndex + 2;
  const listPageCell = [];
  if(startPageIndex > pages) {
    listPageCell.push(
      <li onClick={() => onPageChange(pageIndex-1)} class="page-item"><a class="page-link" href="#">Prev</a></li>
    );
  }
  for(let i = startPageIndex; i<=endPageIndex; i++) {
    listPageCell.push(
      <li onClick={() => onPageChange(i)} class={i === pageIndex ? "page-item active" : "page-item"}><a class="page-link" href="#">{i}</a></li>
    )
  }

  if(startPageIndex > pages) {
    listPageCell.push(
      <li onClick={() => onPageChange(pageIndex+1)} class="page-item"><a class="page-link" href="#">Next</a></li>
    );
  }
  
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        {listPageCell}
      </ul>
    </nav>
  );
}