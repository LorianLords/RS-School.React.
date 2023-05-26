import React, { ChangeEventHandler, useState } from 'react';
import s from './CreateCard.module.css';
import { SubmitHandler, useForm } from 'react-hook-form';

import Input from './InputField/Input';
import { useAppDispatch } from '../../hooks';
import { pushCardData } from '../../Features/CardsSlice';
import Select from './InputField/Select';

type RickAndMortyCardProps = {
  id: number;
  name: string;
  gender: string;
  species: string;
  created: string;
  status: string;
  image: string;
  episode?: [];
  location?: { name: string; url: string };
  origin?: { name: string; url?: string };
  type?: string;
  url?: string;
};

const statusOptions = ['Alive', 'Dead', 'Unknown'];
const radioGender = ['Male', 'Female', 'Unknown'];
const CreateCard = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RickAndMortyCardProps>({
    defaultValues: {
      name: '',
      gender: '',
      species: '',
      created: '',
      status: 'Alive',
      image: undefined,
    },
  });
  const [fileName, setFileName] = useState('');
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<RickAndMortyCardProps> = (data, event) => {
    const file = data.image?.[0];
    let imageUrl = null;
    if (file) {
      imageUrl = URL.createObjectURL(file as unknown as Blob);
    }
    const card = {
      ...data,
      location: { name: 'Unknown' },
      origin: { name: 'Unknown' },
      id: 237,
      image: imageUrl,
    };
    dispatch(pushCardData({ card }));
    event?.target.reset();
    setFileName('');
  };

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const fileName = event.currentTarget.files?.[0]?.name || '';
    setFileName(fileName);
  };

  return (
    <div className={s.window}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Create new Card</h2>
        <Input
          name={'name'}
          testId={'nameTest'}
          type={'text'}
          error={errors.name}
          styles={s.name}
          register={register}
          label={"Character's name:"}
          required={{ value: true, message: 'required input field' }}
          options={{
            maxLength: { value: 20, message: 'Max length is 20 symbols' },
          }}
        />
        <Input
          type={'text'}
          testId={'speciesTest'}
          name={'species'}
          error={errors.species}
          styles={s.name}
          register={register}
          label={'Species:'}
          required={{ value: true, message: 'required input field' }}
          options={{
            maxLength: { value: 20, message: 'Max length is 20 symbols' },
          }}
        />

        <Input
          type={'date'}
          name={'created'}
          testId={'dateTest'}
          error={errors.created}
          styles={s.name}
          register={register}
          required={{ value: true, message: 'required input field' }}
          label={'Created date:'}
          options={{
            pattern: {
              value: /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
              message: 'Date of Birth must be a valid date in the format YYYY-MM-DD',
            },
            max: {
              value: '2023-12-31',
              message: 'Date of creation must be earlier than 2023-12-31',
            },
          }}
        />

        <Select
          label={'Character status:'}
          name={'status'}
          testId={'selectTest'}
          optionValues={statusOptions}
          register={register}
          required={{
            value: true,
            message: 'Field is not complete',
          }}
          errorText={errors.status?.message}
        />

        {radioGender.map((gender, index) => {
          return (
            <label key={index} className={s.formControl}>
              <input
                type="radio"
                data-testid={'radioTest' + gender}
                value={gender}
                {...register('gender', { required: true })}
                id="withNight"
              />
              {gender}
            </label>
          );
        })}

        <div>
          <label className={s.label}>
            <input
              className={s.fileInput}
              type="file"
              data-testid={'input-file'}
              {...register('image')}
              accept="image/*"
              onChange={handleFileChange}
            />
            <span className={s.inputFileBtn}>Выберите файл</span>
            <span className={s.inputFileText}>{fileName}</span>
          </label>
        </div>

        <input className={s.submit} data-testid={'submitTest'} type="submit" value={'Create'} />
      </form>
    </div>
  );
};

export default CreateCard;
