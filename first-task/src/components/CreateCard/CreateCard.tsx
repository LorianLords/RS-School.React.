import React, {ChangeEvent, Component, createRef, FormEvent, RefObject} from "react";
import s from "./CreateCard.module.css"
import {useOutletContext, NavLink} from "react-router-dom";

interface FormState {
    id?: number,
    name: string | undefined;
    dateOfTrip: string | undefined;
    typeOfTrip: string;
    withOvernightStay: boolean
    tripImg: string

}

class CreateCard extends Component<any, FormState> {


     private input: RefObject<HTMLInputElement> = React.createRef()
     private date: RefObject<HTMLInputElement> = React.createRef()
    private typeOfTrip: RefObject<HTMLSelectElement> = React.createRef()
    private withOvernightStay: RefObject<HTMLInputElement> = React.createRef()
    private tripImg:  RefObject<HTMLInputElement> = React.createRef()

    constructor(props: any) {
        super(props)
            this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event:  React.FormEvent<HTMLFormElement>){

      alert(this.input.current?.value + " " + this.date.current?.value)
        event.preventDefault();
      debugger
        const file = this.tripImg.current?.files?.[0];
        let imageUrl = null;
        if (file){
            imageUrl = URL.createObjectURL(file);
        }
        const withOver = this.withOvernightStay.current?.checked? this.withOvernightStay.current.value : null;
        const card = {
          tripName: this.input.current?.value,
          tripDate: this.date.current?.value,
          tripType: this.typeOfTrip.current?.value,
          tripImg: imageUrl,
          withOvernightStay: this.withOvernightStay.current?.checked? this.withOvernightStay.current.value : null
      }
        console.log(card)
    }
    render() {

        const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
            const file = event.target.files && event.target.files[0];
           // this.setState({ file });
       };


        return (
            <div className={s.window}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Название путевки:
                        <input
                            type="text"
                            ref={this.input}
                            className={s.name}
                        />
                    </label>
                    <br/>
                    <label htmlFor="">
                        Дата начала: <br/>
                        <input type={"date"}
                               min={"01.06.2023"}
                        ref={this.date}/>
                    </label>
                    <br/>
                    <label htmlFor="">
                        Тип туристической экскурсии:
                        <select value={"bus"} ref={this.typeOfTrip}>
                            <option value="bus">Туристический автобус</option>
                            <option value="walk">Пешая прогулка</option>
                            <option value="water">Водный транспорт</option>
                        </select>
                    </label>
                    <br/>
                    <input type="radio" name="topping" value="true" ref={this.withOvernightStay} id="regular"/>
                    <label htmlFor="regular">с ночевкой</label>
                    <input type="radio" name="topping" value="false" ref={this.withOvernightStay} id="medium"/>
                    <label htmlFor="medium">без ночевки</label>


                    <input type="file" accept="image/*" ref={this.tripImg}/>
                    <input type="submit" value={"Создать"}/>
                </form>



            </div>

        )
    }
}

export default CreateCard;