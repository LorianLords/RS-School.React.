import React, { useState } from 'react';
import s from './CreateCard.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CardProps } from '../MainPage/Cards/Card/Card';
import defaultImg from '../../assets/react.svg';

type FormValues = {
  tripName: string;
  tripDate: string;
  tripType: string;
  overnightStay: string;
  tripImg: FileList;
};

const CreateCard = (props: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      tripName: 'welcome to paris',
      tripDate: '',
      tripType: 'Tourist bus',
      overnightStay: '',
      tripImg: undefined,
    },
  });
  const [fileName, setFileName] = useState('empty');

  const onSubmit: SubmitHandler<FormValues> = (event) => {
    console.log(event);
    const file = event.tripImg?.[0];
    let imageUrl = null;
    if (file) {
      imageUrl = URL.createObjectURL(file);
    }
    const card = {
      id: 7,
      ...event,
      overnightStay: Boolean(event.overnightStay),
      tripImg: imageUrl,
    };

    props.updateCardList(card);
  };

  /*  const Input = ({label, register, required}) => (
    <>
      <label>{label}</label>
      <input {...register(label, {required})} />
    </>
  )*/

  /*const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };*/
  return (
    <div className={s.window}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label> Название путевки:</label>
        <input
          type="text"
          className={s.name}
          {...register('tripName', {
            required: {
              value: true,
              message: 'Field is not complete',
            },
            minLength: { value: 4, message: 'Min length is 4 symbols' },
            maxLength: 30,
          })}
        />
        <p>{errors.tripName?.message}</p>

        <label>Дата начала:</label>
        <input
          type={'date'}
          {...register('tripDate', {
            required: {
              value: true,
              message: 'Field is not complete',
            },
            maxLength: 20,
          })}
        />
        <p>{errors.tripDate?.message}</p>

        <label>Тип туристической экскурсии:</label>

        <select {...register('tripType', { required: true })}>
          <option value="Tourist bus">Туристический автобус</option>
          <option value="Walking tour">Пешая прогулка</option>
          <option value="Water transport">Водный транспорт</option>
        </select>

        <label>с ночевкой</label>
        <input
          type="radio"
          value={'true'}
          {...register('overnightStay', { required: true })}
          id="withNight"
        />
        <label>без ночевки</label>
        <input
          type="radio"
          value={'false'}
          {...register('overnightStay', { required: true })}
          id="withoutNight"
        />

        <div>
          <label className={s.label}>
            <input className={s.fileInput} type="file" {...register('tripImg')} accept="image/*" />
            <span className={s.inputFileBtn}>Выберите файл</span>
            <span className={s.inputFileText}>пусто</span>
          </label>
        </div>

        <input type="submit" value={'Создать'} />
      </form>
    </div>
  );
};

export default CreateCard;
