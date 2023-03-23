import React, { Component } from 'react';
import s from "../Cards.module.css"
import {ICard} from "../../../../models";

export interface CardProps {
    id: number,
    title: string;
    description: string;
    imageUrl: string;
}

class Card extends Component<CardProps> {
    render() {

        const { title, description , imageUrl } = this.props;
        return (
            <div className={s.card}>
                <img src={imageUrl} alt={title} />
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        );
    }
}

export default Card
