import React, { Component } from 'react';
import s from '../Cards.module.css';


export interface CardProps {
  id: number;
  name: string;
  tripDate: string;
  tripType: string;
  overnightStay: boolean;
  tripImg: string;
}

class Card extends Component<CardProps> {
  render() {
    const { name, tripDate, tripType, overnightStay, tripImg } = this.props;
    return (
      <div className={s.card}>
        <img src={tripImg} alt={name} />
        <h2>{name}</h2>
        <h3>{tripType}</h3>
        <p>date of trip: {tripDate}</p>
        <p>overnight stay is{!overnightStay ? 'not' : ''} include</p>
      </div>
    );
  }
}

export default Card;
