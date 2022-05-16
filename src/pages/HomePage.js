import {useEffect, useState} from 'react'
import { getAllProducts } from '../api/apiProduct';
import "../styles/customer.css"

export const HomePage = ({onCount, onSave}) => {
  const [products, setProducts] = useState([]);
  const fetchingProducts = async () => {
    const products = await getAllProducts()
    setProducts(products)
  }

  useEffect(() => {
    fetchingProducts();
  } , [])

  return (
    <>
    <h3>Catalog</h3>
    <div className='container'>
      {products.length > 0 ? products.map((product, index)=>(
        <div key={index} className='container-product'>
          <img src={product.imageUrl} alt='product'/>
          <div className='container-product-title'>
            <div>{product.name}</div>
            <div>${product.price}</div>
          </div>
          <p className='container-product-desc'>{product.description !== ''? product.description: 'There is not a description for this product.'}</p>
          <button className='add-btn' onClick={()=>  {onCount('add'); onSave(product._id, product)}}>Add to car</button>
        </div>
      )): <h2 style={{textAlign:'center'}}>There isn't products yet.</h2>}
    </div>
  </>
  )
}


