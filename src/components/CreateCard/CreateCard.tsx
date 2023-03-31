import React, { Component, RefObject } from 'react';
import s from './CreateCard.module.css';

class CreateCard extends Component<any, any> {
  private input: RefObject<HTMLInputElement> = React.createRef();
  private date: RefObject<HTMLInputElement> = React.createRef();
  private typeOfTrip: RefObject<HTMLSelectElement> = React.createRef();
  private withNight: RefObject<HTMLInputElement> = React.createRef();
  private withoutNight: RefObject<HTMLInputElement> = React.createRef();
  private tripImg: RefObject<HTMLInputElement> = React.createRef();

  constructor(props: any) {
    super(props);
    this.state = {
      selectedOption: 'withNight',
      fileName: 'empty',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const file = this.tripImg.current?.files?.[0];
    let imageUrl = null;
    if (file) {
      imageUrl = URL.createObjectURL(file);
    }
    const card = {
      id: 7,
      name: this.input.current?.value,
      tripDate: this.date.current?.value,
      tripType: this.typeOfTrip.current?.value,
      overnightStay: this.withNight.current?.checked,
      tripImg: imageUrl,
    };
    this.props.updateCardList(card);
  }

  handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ selectedOption: event.target.value });
  }
  render() {
    return (
      <div className={s.window}>
        <form onSubmit={this.handleSubmit}>
          <label>
            Название путевки:
            <input type="text" ref={this.input} className={s.name} />
          </label>
          <br />
          <label htmlFor="">
            Дата начала: <br />
            <input type={'date'} min={'01.06.2023'} ref={this.date} />
          </label>
          <br />
          <label htmlFor="">
            Тип туристической экскурсии:
            <select ref={this.typeOfTrip}>
              <option value="bus">Туристический автобус</option>
              <option value="walk">Пешая прогулка</option>
              <option value="water">Водный транспорт</option>
            </select>
          </label>
          <div>
            <input
              type="radio"
              name="withNight"
              value="withNight"
              checked={'withNight' === this.state.selectedOption}
              ref={this.withNight}
              id="withNight"
              onChange={this.handleRadioChange}
            />

            <label htmlFor="with">с ночевкой</label>
            <input
              type="radio"
              name="withoutNight"
              value="withoutNight"
              checked={'withoutNight' === this.state.selectedOption}
              ref={this.withoutNight}
              id="withoutNight"
              onChange={this.handleRadioChange}
            />
            <label htmlFor="without">без ночевки</label>
          </div>
          <div>
            <label className={s.label}>
              <input
                className={s.fileInput}
                type="file"
                name="tripFile"
                accept="image/*"
                ref={this.tripImg}
              />
              <span className={s.inputFileBtn}>Выберите файл</span>
              <span className={s.inputFileText}>пусто</span>
            </label>
          </div>

          <input type="submit" value={'Создать'} />
        </form>
      </div>
    );
  }
}

export default CreateCard;
