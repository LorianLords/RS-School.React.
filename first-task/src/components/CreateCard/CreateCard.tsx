import React, { Component, RefObject } from 'react';
import s from './CreateCard.module.css';

interface FormState {
  id?: number;
  /*   name: string | undefined;
       dateOfTrip: string | undefined;
       typeOfTrip: string;
       withOvernightStay: boolean
       tripImg: string*/
  selectedOption: string;
}

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
    const overnightStay = this.withNight.current?.checked;
    const card = {
      id: 7,
      name: this.input.current?.value,
      tripDate: this.date.current?.value,
      tripType: this.typeOfTrip.current?.value,
      overnightStay: overnightStay,
      tripImg: imageUrl,
    };
    this.props.updateCardList(card);
    console.log();
  }

  handleRadioChange(event: React.ChangeEvent<HTMLInputElement>) {
    debugger;
    this.setState({ selectedOption: event.target.value });
  }

  /*    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files && event.target.files[0];
            // this.setState({ file });
        };*/
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

          <input type="file" accept="image/*" ref={this.tripImg} />
          <input type="submit" value={'Создать'} />
        </form>
      </div>
    );
  }
}

export default CreateCard;
