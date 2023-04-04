import './Header.module.css';
import React, { Component } from 'react';
import s from './Header.module.css';
import { Link } from 'react-router-dom';

class Header extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { value: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentCleanup = this.componentCleanup.bind(this);
  }
  componentCleanup = (event: any) => {
    localStorage.setItem('search', this.state.value);
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.componentCleanup);
    if (localStorage.hasOwnProperty('search')) {
      const input = localStorage.getItem('search');
      this.setState({ value: input });
    }
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.componentCleanup);
    /* localStorage.setItem('search', this.state.value)*/
  }

  handleSubmit(event: any) {
    event.preventDefault(); // предотвращаем перезагрузку страницы
    const input = event.target.elements.q.value; // получаем доступ к полю ввода
    localStorage.setItem('search', input);
  }
  handleChange(event: any) {
    const value = event.target.value;
    this.setState({ ...this.state, value });
    localStorage.setItem('search', this.state.value);
  }

  render() {
    return (
      <header className={s.header}>
        <div className={s.headerContainer}>
          <div className={s.headerSection}>
            <div className={s.headerLogo}>DYO</div>
            <div className={s.headerSearch}>
              <form id={s['search-form']} role="search" onSubmit={this.handleSubmit}>
                <input
                  id="q"
                  placeholder="Search"
                  type="search"
                  name="q"
                  value={this.state.value}
                  onChange={this.handleChange}
                />
                <button type={'submit'}></button>
              </form>
            </div>
          </div>
          <div className={s.headerItems}>
            <Link to={'/main'} className={s.headerItem}>
              Main
            </Link>
            <Link to={'/aboutus'} className={s.headerItem}>
              About Us
            </Link>
            <div className={s.headerItem}>Cards</div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
