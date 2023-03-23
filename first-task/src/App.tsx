import React, {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes, Route, Outlet} from "react-router-dom";
import './App.css'
import AboutUs from './components/AboutUs/AboutUs';
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Header from "./components/Header/Header";




function App() {
    const [count, setCount] = useState(0)

    return (
        <div className="App">
            <Header/>
            <div className={'app-wrapper-content'}>
               <Outlet />
            </div>
        </div>
    )
}

export default App
