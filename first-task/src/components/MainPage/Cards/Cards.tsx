import {ICard} from "../../../models";

import s from "./Cards.module.css"
import React, { Component } from 'react';
import Card,{CardProps} from './Card/Card';

interface CardsProps {
    cards: CardProps[];
}

class Cards extends Component<CardsProps> {
    render() {
        const { cards } = this.props;

        return (
            <div className={s.cards}>
                {cards.map((card) => (
                    <Card
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        imageUrl={card.imageUrl}
                     />
                ))}
            </div>
        );
    }
}

export default Cards;




/*

export const cards: ICard[] = [

]*/
