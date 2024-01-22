import Link from 'next/link';
import React, { FormEvent, useState } from 'react';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';

export default function Login() {
  const cookies = new Cookies();
  const router = useRouter();
  const [error, setError] = useState('');
  async function onSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const twoHours = new Date(Date.now() + 7200000);
    const response = await fetch('http://localhost:3000/api/v1/login', {method: 'POST', body: formData});
    if (response.ok) {
      cookies.set('jwt', response.headers.get('Authorization'), {
        path: '/',
        expires: twoHours
      })
      router.push('/products');
    } else {
      const message = await response.text();
      setError(message);
    }
  }
  return (
    <div className='central-container'>
      <h1>Log in now and start checking what&#39;s new!</h1>
      <p className='alert'>{ error }</p>
      <form className='form-container' onSubmit={onSubmit}>
        <div className='form-block'>
          <label htmlFor='email' className='form-label'>Email address</label>
          <input id='email' name='user[email]' className='form-input'/>
        </div>
        <div className='form-block'>
          <label htmlFor='password' className='form-label'>Password</label>
          <input id='password' name='user[password]' className='form-input' type='password'/>
        </div>
        <div className='form-block'>
          <button type='submit' className='submit-button'>Log me in!</button>
        </div>
        <div className='form-block'>
          <Link href='/signup'>I don&#39;t have an account yet</Link>
        </div>
      </form>
    </div>
  )
}