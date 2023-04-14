import React from 'react';
import s from '../Cards.module.css';
import { format } from 'prettier';

export type CardProps = {
  id: number;
  name: string;
  gender: string;
  species: string;
  created: string;
  status: string;
  image: string;

  /* id: number;
  tripName: string;
  tripDate: string;
  tripType: string;
  overnightStay: boolean;
  tripImg: string;*/
};

const Card = (props: CardProps) => {
  const { id, name, gender, created, species, status, image } = props;
  return (
    <div id={id.toString()} data-testid={name} className={s.card}>
      <img src={image} alt={name} />
      <h2>{name}</h2>
      <h3>
        {gender} | {species}
      </h3>
      <label>date of create:</label>
      <p>{created.split('T')[0]}</p>
      <p>{status}</p>
    </div>
  );
};

export default React.memo(Card);
