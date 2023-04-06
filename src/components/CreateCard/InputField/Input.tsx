import s from '../CreateCard.module.css';
import React from 'react';
import { FieldError, RegisterOptions, UseFormRegister, ValidationRule } from 'react-hook-form';

interface InputType {
  name: string;
  type: string;
  label: string;
  styles: string;
  register: UseFormRegister<any>;
  required:
    | string
    | {
        value: boolean;
        message: string;
      };
  options: {
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    min?: {
      value: string;
      message: string;
    };
    max?: {
      value: string;
      message: string;
    };
  };

  maxLengthText?: string;
  error: FieldError | undefined;
}
const Input = ({ name, error, type, label, styles, register, required, options }: InputType) => (
  <div className={s.inputField}>
    <label className={s.label}>{label}</label>
    <input
      placeholder={'Name of trip'}
      type={type}
      className={styles}
      {...register(name, {
        required: required,
        ...options,
        /*   maxLength: { value: maxLength, message: maxLengthText },*/
      })}
    />
    <p>{error?.message}</p>
  </div>
);

export default Input;
