import React from "react";
import Cards from "./Cards/Cards";

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
const MainPage = () => {
    return(
        <div>
          <h1>Welcome to our main page</h1>
            <Cards cards={CardList}/>
        </div>
    )
}

export default MainPage;