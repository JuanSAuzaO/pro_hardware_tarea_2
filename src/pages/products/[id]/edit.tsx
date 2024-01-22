import React, { FormEvent, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { fetchProduct } from '../../../utils/fetch_module';

export default function Edit() {
  const [product, setProduct] = useState({});
  const [cookies] = useCookies(['jwt']);
  const router = useRouter();
  const { id } = router.query;
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  useEffect(() => {
    const runAsync = async () => {
      if (id) {
        setProduct(await fetchProduct(id));
      }
    }
    runAsync();
  }, [id]);
  let editForm;
  if (product) {
    editForm = (
      <form className='form-container' onSubmit={onSubmit}>
        <div className='form-block'>
          <label htmlFor='name' className='form-label'>Product name</label>
          <input id='name' name='product[name]' className='form-input' defaultValue={product["name"]}/>
          <p className='alert reduced'>{ nameError }</p>
        </div>
        <div className='form-block'>
          <label htmlFor='description' className='form-label'>Description</label>
          <textarea id='description' name='product[description]' className='form-textarea' defaultValue={product["description"]}></textarea>
          <p className='alert reduced'>{ descriptionError }</p>
        </div>
        <div className='form-block'>
          <label htmlFor='price' className='form-label'>Price</label>
          <input id='price' name='product[price_cents]' className='form-input' type='number' step='0.01' defaultValue={product["price_cents"]}/>
          <p className='alert reduced'>{ priceError }</p>
        </div>
        <div className='form-block'>
          <button type='submit' className='submit-button'>Update now!</button>
        </div>
      </form>
    )
  }
  
  async function onSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const price_cents: number = parseFloat(e.currentTarget.price.value) * 100;
    const formData = new FormData(e.currentTarget);
    formData.set('product[price_cents]', price_cents.toString());
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {method: 'PUT', body: formData, headers: {'Authorization': `${cookies.jwt}`}});
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
      <h1>Improve your product details!</h1>
      { editForm ? editForm : <h1 className='loading'>Cargando...</h1> }
    </div>
  )
}