import React, { ChangeEventHandler, useState } from 'react';
import s from './CreateCard.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';

import Input from './InputField/Input';
import { CardProps } from '../CardList/Card/Card';

type FormValues = {
  tripName: string;
  tripDate: string;
  tripType: string;
  overnightStay: string;
  tripImg: FileList;
};

type CreateCardProps = {
  updateCardList: (card: FormValues) => void;
};

const CreateCard = (props: CreateCardProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      tripName: '',
      tripDate: '',
      tripType: 'Tourist bus',
      overnightStay: '',
      tripImg: undefined,
    },
  });
  const [fileName, setFileName] = useState('');

  const onSubmit: SubmitHandler<FormValues> = (data, event) => {
    const file = data.tripImg?.[0];
    let imageUrl = null;
    if (file) {
      imageUrl = URL.createObjectURL(file);
    }
    const card = {
      id: 7,
      ...data,
      overnightStay: Boolean(data.overnightStay),
      tripImg: imageUrl,
    };
    props.updateCardList(card);
    event?.target.reset();
    setFileName('');
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    debugger;
    const fileName = event.currentTarget.files?.[0]?.name || '';
    console.log(errors.tripName);
    setFileName(fileName);
  };

  return (
    <div className={s.window}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new Card</h2>
        <Input
          type={'text'}
          testId={'nameTest'}
          name={'tripName'}
          error={errors.tripName}
          styles={s.name}
          register={register}
          required={{ value: true, message: 'required input field' }}
          options={{
            maxLength: { value: 20, message: 'Max length is 20 symbols' },
          }}
          label={'Название путевки:'}
        />

        <Input
          type={'date'}
          name={'tripDate'}
          testId={'dateTest'}
          error={errors.tripDate}
          styles={s.name}
          register={register}
          required={{ value: true, message: 'required input field' }}
          options={{
            pattern: {
              value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
              message: 'Date of Birth must be a valid date in the format YYYY-MM-DD',
            },
            min: { value: '2023-03-01', message: 'Date of trip must be later than 2023-03-01' },
            max: { value: '2023-12-31', message: 'Date of trip must be earlier than 2023-12-31' },
          }}
          label={'Дата начала:'}
        />

        <label>Тип туристической экскурсии:</label>
        <div className={s.typeSelect}>
          <select
            data-testid={'selectTest'}
            {...register('tripType', {
              required: {
                value: true,
                message: 'Field is not complete',
              },
            })}
          >
            <option data-testid={'bus-option'} value="Tourist bus">
              Туристический автобус
            </option>
            <option value="Walking tour">Пешая прогулка</option>
            <option value="Water transport">Водный транспорт</option>
          </select>
          <span className={s.focus}></span>
        </div>
        <p>{errors.tripType?.message}</p>

        <div>
          <label className={s.formControl}>
            <input
              type="radio"
              data-testid={'radioTestWith'}
              value={'true'}
              {...register('overnightStay', { required: true })}
              id="withNight"
            />
            С ночевкой
          </label>
          <label className={s.formControl}>
            <input
              type="radio"
              data-testid={'radioTestWithout'}
              value={'false'}
              {...register('overnightStay', { required: true })}
              id="withoutNight"
            />
            Без ночевки
          </label>
        </div>

        <div>
          <label className={s.label}>
            <input
              className={s.fileInput}
              type="file"
              data-testid={'input-file'}
              {...register('tripImg')}
              accept="image/*"
              onChange={handleFileChange}
            />
            <span className={s.inputFileBtn}>Выберите файл</span>
            <span className={s.inputFileText}>{fileName}</span>
          </label>
        </div>

        <input className={s.submit} data-testid={'submitTest'} type="submit" value={'Создать'} />
      </form>
    </div>
  );
};

export default CreateCard;
