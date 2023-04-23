import React, { MouseEventHandler, useState } from 'react';
import s from '../Cards.module.css';

export type CardProps = {
  id: number;
  name: string;
  gender: string;
  species: string;
  created: string;
  status: string;
  image: string;
  type?: string;
  origin?: { name: string; url?: string };
};
export type IProps = {
  card: CardProps;
  setIsOpen: React.Dispatch<boolean>;
  setCardState: React.Dispatch<CardProps>;
};
const Card = ({ setIsOpen, setCardState, card }: IProps) => {
  const { id, name, gender, created, species, status, image } = card;
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    document.body.classList.add('modalOpen');
    setCardState(card);
    setIsOpen(true);
  };
  return (
    <div id={id.toString()} data-testid={name} className={s.card} onClick={handleClick}>
      <img src={image} alt={name} draggable={false} />
      <h2>{name}</h2>
      <h3>
        {gender} | {species}
      </h3>
    </div>
  );
};

export default React.memo(Card);
