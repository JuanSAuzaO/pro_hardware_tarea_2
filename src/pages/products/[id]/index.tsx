import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { fetchProduct } from '../../../utils/fetch_module';

export default function Show() {
  const [product, setProduct] = useState({});
  const [cookies] = useCookies(['jwt']);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    const runAsync = async () => {
      if (id) {
        setProduct(await fetchProduct(id));
      }
    }
    runAsync();
  }, [id]);
  let productInfo; 
  if (product) {
    productInfo = (
      <div className='product-card'>
        <h2>Product Name</h2>
        <p className='p-info'>{product["name"]}</p>
        <h2>Description</h2>
        <p className='p-info'>{product["description"]}</p>
        <h2>Price(USD)</h2>
        <p className='p-info'>${product["price_cents"]}</p>
        <button className='link-button'><Link href={`/products/${id}/edit`}>Edit product!</Link></button>
        <button className='link-button delete' onClick={deleteProduct}>Delete product!</button>
      </div>
    )
  }
  async function deleteProduct () {
    const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {method: 'DELETE', headers: {'Authorization': `${cookies.jwt}`}});
    if (response.ok) {
      router.push('/products')
    }
  }
  return (
    <div className='central-container'>
      <h1>Check out the product in detail!</h1>
      { productInfo ? productInfo : <h1 className='loading'>Cargando...</h1> }
    </div>
  )
}