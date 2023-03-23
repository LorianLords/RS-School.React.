import "./Header.module.css"
import React from "react";
import s from "./Header.module.css"
import {Link} from "react-router-dom";


const Header = () => {
    const handleSubmit = (event:any) => {
        event.preventDefault(); // предотвращаем перезагрузку страницы
debugger
        const input = event.target.elements.q.value; // получаем доступ к полю ввода
        git push --set-upstream origin task-1

    }

    return (
        <header className={s.header}>
            <div className={s.headerContainer}>
                <div className={s.headerSection}>
                    <div className={s.headerLogo}>
                        DYO
                    </div>
                    <div className={s.headerSearch}>
                        <form id={s["search-form"]} role="search" onSubmit={handleSubmit}>
                            <input
                                id="q"
                                placeholder="Search"
                                type="search"
                                name="q"
                            />
                            <button type={"submit"}></button>
                        </form>
                    </div>
                </div>
                <div  className={s.headerItems} >
                    <Link to={'/main'} className={s.headerItem}>Main</Link>
                    <Link to={'/aboutus'} className={s.headerItem}>About Us</Link>
                    <div  className={s.headerItem}>Cards</div>
                </div>

            </div>
        </header>
)
}

export default Header


