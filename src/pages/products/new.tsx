import React, { FormEvent, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

export default function New() {
  const [cookies] = useCookies(['jwt']);
  const router = useRouter();
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  async function onSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const price_cents: number = parseFloat(e.currentTarget.price.value) * 100;
    const formData = new FormData(e.currentTarget);
    formData.set('product[price_cents]', price_cents.toString());
    const response = await fetch('http://localhost:3000/api/v1/products', { method: 'POST', body: formData, headers: { 'Authorization': `${ cookies.jwt }` } });
    const data = await response.json();
    if (data.errors) {
      data.errors.name ? setNameError(data.errors.name[0]) : setNameError('');
      data.errors.description ? setDescriptionError(data.errors.description[0]) : setDescriptionError('');
      data.errors.price_cents ? setPriceError(data.errors.price_cents[0]) : setPriceError('');
    } else {
      router.push('/products');
    }
  }
  return (
    <div className='central-container'>
      <h1>Welcome! start posting top PC hardware!</h1>
      <form className='form-container' onSubmit={onSubmit}>
        <div className='form-block'>
          <label htmlFor='name' className='form-label'>Product name</label>
          <input id='name' name='product[name]' className='form-input'/>
          <p className='alert reduced'>{ nameError }</p>
        </div>
        <div className='form-block'>
          <label htmlFor='description' className='form-label'>Description</label>
          <textarea id='description' name='product[description]' className='form-textarea'></textarea>
          <p className='alert reduced'>{ descriptionError }</p>
        </div>
        <div className='form-block'>
          <label htmlFor='price' className='form-label'>Price</label>
          <input id='price' name='product[price_cents]' className='form-input' type='number' step='0.01'/>
          <p className='alert reduced'>{ priceError }</p>
        </div>
        <div className='form-block'>
          <button type='submit' className='submit-button'>Post now!</button>
        </div>
      </form>
    </div>
  )
}