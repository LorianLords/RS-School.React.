import React, { ChangeEvent, useCallback, useContext, useEffect, useState } from 'react';
import CardList from '../../components/CardList/CardList';
import CreateCard from '../../components/CreateCard/CreateCard';
import s from './MainPage.module.css';
import { Link, useNavigate } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';

import ModalWindow from '../../components/Modal/Modal';

import { useSelector } from 'react-redux';
import { getPagesNum, getCurrentPage } from '../../Features/Selectors';
import { useModalState } from '../../hooks/useModalState';

console.log(1);
const baseUrl = './';
const MainPage = () => {
  const pages = useSelector(getPagesNum);
  const currentPage = useSelector(getCurrentPage);
  const { isOpen, onToggle, onOpen, onClose } = useModalState();
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [selectValue, setSelectValue] = useState<string>('id');
  const [windowUrl, setWindowUrl] = useState(baseUrl);
  const [totalCount, setTotalCount] = useState<number>(pages || 1);

  const link = windowUrl === baseUrl ? 'createcard/' : './';
  const buttonText = isOpenForm ? 'Close Window' : 'Create new Card';

  const selectOptions = [
    { value: 'id', title: 'По умолчанию' },
    { value: 'name', title: 'По имени' },
    { value: 'status', title: 'По статусу' },
  ];
  const navigate = useNavigate();
  useEffect(() => {
    navigate(windowUrl);
  }, []);

  useEffect(() => {
    setTotalCount(pages);
  }, [pages]);

  const onCreateCard = () => {
    setIsOpenForm(!isOpenForm);
    setWindowUrl(windowUrl === baseUrl ? 'createcard/' : './');
  };

  const onChangeSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const sortOption = e.target.value;
    setSelectValue(sortOption);
  };
  return (
    <div data-testid={'mainPageTest'} className={s.main}>
      <h1>Welcome to our main page</h1>
      {isOpenForm && <CreateCard />}
      <Link to={link}>
        <button data-testid={'btnCreateTest'} className={s.windowBtn} onClick={onCreateCard}>
          {buttonText}
        </button>
      </Link>

      {isOpen && <ModalWindow onClose={onClose}/>}

      <div className={s.paginatorWrapper}>
        <Pagination totalCount={totalCount} currentPage={currentPage} />

        <div className={s.typeSelect}>
          <select
            id={'selectSort'}
            value={selectValue}
            data-testid={'selectSortTest'}
            onChange={onChangeSort}
          >
            {selectOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <CardList onOpen={onOpen} selectValue={selectValue} currentPage={currentPage} />
    </div>
  );
};

export default MainPage;
