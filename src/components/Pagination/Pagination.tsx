import pageStyle from './Pagination.module.css';
import { useEffect, useState } from 'react';
import React from 'react';

const createPages = (pages: number[], totalCount: number, currentPage: number) => {
  const range = Math.ceil(currentPage / 10) * 10 - 1;

  if (totalCount > 10) {
    if (currentPage > 8) {
      for (let i = currentPage - 1; i <= currentPage + 7; i++) {
        pages.push(i);
        if (i == totalCount) break;
      }
    } else {
      for (let i = 1; i <= 10; i++) {
        pages.push(i);
        if (i == totalCount) break;
      }
    }
  } else {
    for (let i = 1; i <= totalCount; i++) {
      pages.push(i);
    }
  }
};

interface IpaginatorProps {
  setCurrentPage: React.Dispatch<number | undefined>;
  currentPage?: number;
  totalCount: number | undefined;
}
const Pagination = ({ setCurrentPage, currentPage = 1, totalCount = 1 }: IpaginatorProps) => {
  const [currPage, setCurrPage] = useState(currentPage);
  //const totalPageCount = Math.ceil(totalCount / pageSize);

  const pages: number[] = [];
  createPages(pages, totalCount, currPage);
  setCurrentPage(currPage);
  return (
    <div className={pageStyle.pages}>
      {pages.map((pageNum, index) => (
        <span
          key={index}
          className={currPage === pageNum ? pageStyle.currentPage : pageStyle.page}
          onClick={() => {
            setCurrPage(pageNum);
          }}
        >
          {pageNum}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
