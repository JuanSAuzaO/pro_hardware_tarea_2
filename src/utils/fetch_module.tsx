import { Cookies } from 'react-cookie';

export const fetchProducts = async () => {
  const cookies = new Cookies();
  const response = await fetch('http://localhost:3000/api/v1/products', {method: 'GET', headers: {'Authorization': `${cookies.get('jwt')}`}});
  const data = await response.json();
  return data.products;
}

export const fetchProduct = async (id) => {
  const cookies = new Cookies();
  const response = await fetch(`http://localhost:3000/api/v1/products/${id}`, {method: 'GET', headers: {'Authorization': `${cookies.get('jwt')}`}});
  const data = await response.json();
  data.product["price_cents"] =  data.product["price_cents"]/100
  return data.product;
}