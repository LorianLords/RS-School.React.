import React, {Component, useState} from "react";
import Cards from "./Cards/Cards";
import CreateCard from "../CreateCard/CreateCard";
import s from "./MainPage.module.css"
import {NavLink, Outlet, redirect} from "react-router-dom";
import createCard from "../CreateCard/CreateCard";

const CardList = [
    {
        id: 1,
        title: 'Card 1',
        description: 'This is card 1',
        imageUrl: 'https://ka-ap.ru/wp-content/uploads/6/a/3/6a378c8766aa78688e64188fced8b262.jpeg',
    },
    {
        id: 2,
        title: 'Card 2',
        description: 'This is card 2',
        imageUrl: 'http://need.estate/images/NEWS/RSS/Varlamov/2016-02/86c4162b80.jpeg',
    },
    {
        id: 3,
        title: 'Card 3',
        description: 'This is card 3',
        imageUrl: 'https://barnes-newyork.com/wp-content/uploads/2019/09/nyc-3810333_960_720.jpg',
    },
    {
        id: 4,
        title: 'Card 3',
        description: 'This is card 3',
        imageUrl: 'https://ic.pics.livejournal.com/zdenulya/62427274/148946/148946_900.jpg',
    },
    {
        id: 5,
        title: 'Card 3',
        description: 'This is card 3',
        imageUrl: 'https://lemurtour.ru/wp-content/uploads/foto-realdirect.jpg',
    },
    {
        id: 6,
        title: 'Card 3',
        description: 'This is card 3',
        imageUrl: 'https://i.pinimg.com/originals/9b/ee/39/9bee39da063b29c4f03e60466bd511a2.jpg',
    },
]


class MainPage extends Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state={
            isOpen: false,
            cardList: {...CardList}
        }
    this.updateCardList = this.updateCardList.bind(this)

    }

    updateCardList(card: any){
       CardList.push(card)
    }
    render() {
        return (
            <div className={s.main}>
                <h1>Welcome to our main page</h1>
                <Outlet context={this.updateCardList}/>
                {!this.state.isOpen? <NavLink to={`createcard/`}>
                        <button onClick={() => {this.setState({ isOpen: true})}}>Create new Card</button>
                    </NavLink>
                    : <NavLink to={`./`}>
                        <button onClick={() => {this.setState({ isOpen: false})}}>Close Window</button>
                    </NavLink>}


                <Cards cards={CardList}/>
            </div>
        )
    }


}

export default MainPage;