import s from '../CreateCard.module.css';
import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { RickAndMortyCardProps } from '../../../Pages/MainPage/MainPage';

interface NameProperty {
  status: string;
}
interface SelectProps {
  label: string;
  name: Path<NameProperty>;
  optionValues: string[];
  register: UseFormRegister<RickAndMortyCardProps>;
  required:
    | string
    | {
        value: boolean;
        message: string;
      };
  errorText: string | undefined;
  testId: string;
}
const Select: React.FC<SelectProps> = ({
  testId,
  name,
  label,
  optionValues,
  register,
  required,
  errorText,
}) => {
  return (
    <>
      <label>{label}</label>
      <div className={s.typeSelect}>
        <select
          data-testid={testId}
          {...register(name, {
            required: required,
          })}
        >
          <option value="Alive">Alive</option>
          {optionValues.map((value, index) => {
            return <option key={index}>{value}</option>;
          })}
          <option value="Dead">Dead</option>
          <option value="Unknown">Unknown</option>
        </select>
        <span className={s.focus}></span>
      </div>
      <p>{errorText}</p>
    </>
  );
};

export default Select;
