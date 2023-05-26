import React, { MouseEventHandler, useState } from 'react';
import s from '../Cards.module.css';
import { useAppDispatch } from '../../../hooks';
import { setModalWindow } from '../../../Features/CardsSlice';
import {  RickAndMortyCardProps } from '../../../shared/interfaces';
import { useModalState } from '../../../hooks/useModalState';

type CardProps = {
  onOpen: () => void;
  card: RickAndMortyCardProps;
};
const Card = ({ onOpen, card }: CardProps) => {

  const { id, name, gender, created, species, status, image } = card;
  const dispatch = useAppDispatch();

  const handleClick: MouseEventHandler<HTMLDivElement> = () => {
    document.body.classList.add('modalOpen');
    dispatch(setModalWindow({ id }));
    onOpen();
  };

  return (
    <div id={id.toString()} data-testid={'testCard'} className={s.card} onClick={handleClick}>
      <img src={image} alt={name} draggable={false} />
      <h2>{name}</h2>
      <h3>
        {gender} | {species}
      </h3>
    </div>
  );
};

export default React.memo(Card);
