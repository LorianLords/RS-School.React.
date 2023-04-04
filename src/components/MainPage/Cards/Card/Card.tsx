import React from 'react';
import s from '../Cards.module.css';

export interface CardProps {
  id: number;
  tripName: string;
  tripDate: string;
  tripType: string;
  overnightStay: boolean;
  tripImg: string;
}

const Card = (props: CardProps) => {
  const { tripName, tripDate, tripType, overnightStay, tripImg } = props;

  return (
    <div className={s.card}>
      <img src={tripImg} alt={tripName} />
      <h2>{tripName}</h2>
      <h3>{tripType}</h3>
      <p>date of trip: {tripDate}</p>
      <p>overnight stay is{!overnightStay ? 'not' : ''} include</p>
    </div>
  );
};

export default Card;
