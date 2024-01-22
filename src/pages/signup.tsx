import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';

export default function Signup() {
  const cookies = new Cookies();
  const router = useRouter();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmationError, setConfirmationError] = useState('');
  async function onSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget);
    const twoHours = new Date(Date.now() + 7200000);
    const response = await fetch('http://localhost:3000/api/v1/signup', {method: 'POST', body: formData});
    const data = await response.json();
    if (response.ok) {
      cookies.set('jwt', response.headers.get('Authorization'), {
        path: '/',
        expires: twoHours
      })
      router.push('/products');
    } else {
      data.errors.email ? setEmailError(data.errors.email[0]) : setEmailError('');
      data.errors.password ? setPasswordError(data.errors.password[0]) : setPasswordError('');
      data.errors.password_confirmation ? setConfirmationError(data.errors.password_confirmation[0]) : setConfirmationError('');
    }
  }
  return (
    <div className='central-container'>
      <h1>Register and check for the best PC pieces!</h1>
      <form className='form-container' onSubmit={onSubmit}>
        <div className='form-block'>
          <label htmlFor='email' className='form-label'>Email address</label>
          <input id='email' name='user[email]' className='form-input'/>
          <p className='alert reduced'>{ emailError }</p>
        </div>
        <div className='form-block'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input id='password' name='user[password]' className='form-input' type='password'/>
          <p className='alert reduced'>{ passwordError }</p>
        </div>
        <div className='form-block'>
          <label htmlFor='password_confirmation' className='form-label'>Password confirmation</label>
          <input id='password_confirmation' name='user[password_confirmation]' className='form-input' type='password'/>
          <p className='alert reduced'>{ confirmationError }</p>
        </div>
        <div className='form-block'>
          <button type='submit' className='submit-button'>Register now!</button>
        </div>
        <div className='form-block'>
          <Link href='/login'>I already have an account</Link>
        </div>
      </form>
    </div>
  )
}