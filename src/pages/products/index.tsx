import Link from 'next/link';
import React, { useEffect, useState} from 'react';
import { fetchProducts } from '../../utils/fetch_module';
import { Cookies } from 'react-cookie';
import { useRouter } from 'next/router';

export default function List() {
  const [products, setProducts] = useState([]);
  const cookies = new Cookies();
  const router = useRouter();
  useEffect(() => {
    const runAsync = async () => {
      setProducts(await fetchProducts());
    }
    runAsync();
  }, [])
  let list;
  if (products) {
    list = products.map((product, i) => {
      return (
        <div className='product-card' key={product.name + i}>
          <h2>Product Name</h2>
          <Link href={`/products/${product.id}`}><p className='p-info link'>{product.name}</p></Link>
          <h2>Description</h2>
          <p className='p-info'>{product.description}</p>
          <h2>Price(USD)</h2>
          <p className='p-info'>${product.price_cents/100}</p>
        </div>
      )
    });
  }
  async function logOut () {
    const response = await fetch(`http://localhost:3000/api/v1/logout`, {method: 'DELETE', headers: {'Authorization': `${cookies.get('jwt')}`}});
    if (response.ok) {
      router.push('/');
      cookies.remove('jwt', { path: '/' })
    }
  }
  return (
    <div className='central-container'>
      <h1>Here you will find a list of top products!</h1>
      <div className='p-index'>
        <button className='link-button'><Link href='/products/new'>Or sell yours!</Link></button>
      </div>
      { list ? list : <h1 className='loading'>Cargando...</h1> }
      <div className='p-index'>
        <button className='link-button delete' onClick={logOut}>Log out</button>
      </div>
    </div>
  )
}