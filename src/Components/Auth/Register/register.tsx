import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UsersModel } from '../UsersModel';
import { useForm } from 'react-hook-form';
import './register.css';
import Axios from 'axios';

export const Register = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsersModel>();

  const [error, setError] = useState<string>();

  const registerUser = async (user: UsersModel) => {
    try {
      await Axios.post('http://localhost:3001/users/', user);
      history.push('/');
      alert('Thank you for registering, now login!');
    } catch (error) {
      setError(error.response.data.error);
    }
  };

  const submit = async (data: UsersModel) => {
    registerUser(data);
  };

  return (
    <div className='register'>
      {error && <div className='alert'>{error}</div>}
      <h3>Register please:</h3>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <input
            placeholder='Username: '
            type='email'
            required
            {...register('username', {
              required: true,
            })}
          />
        </div>
        <div>
          <input
            placeholder='Password: '
            type='password'
            required
            {...register('password', {
              required: true,
              minLength: {
                value: 8,
                message: 'Minimum length is 8',
              },
              maxLength: {
                value: 12,
                message: 'Maximum length is 12',
              },
            })}
          />
          {errors.password && (
            <span className='err-msg'>{errors.password.message}</span>
          )}
        </div>

        <div>
          <input
            placeholder='First name: '
            type='text'
            required
            {...register('firstName', { required: true })}
          />
        </div>

        <div>
          <input
            placeholder='Last name: '
            type='text'
            required
            {...register('lastName', { required: true })}
          />
        </div>

        <button type='submit'>Register</button>
      </form>

      <Link className='link' to='/'>
        If you have account - Login
      </Link>
    </div>
  );
};
