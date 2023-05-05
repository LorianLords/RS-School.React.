import pageStyle from './Pagination.module.css';
import { useEffect, useState } from 'react';
import React from 'react';
import { useAppDispatch } from '../../hooks';
import { changeStatus } from '../../Features/CardsSlice';

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
  const dispatch = useAppDispatch();
  const pages: number[] = [];
  createPages(pages, totalCount, currentPage);

  return (
    <div className={pageStyle.pages}>
      {pages.map((pageNum, index) => (
        <span
          key={index}
          className={currentPage === pageNum ? pageStyle.currentPage : pageStyle.page}
          onClick={() => {
            setCurrentPage(pageNum);
            dispatch(changeStatus('idle'));
          }}
        >
          {pageNum}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
