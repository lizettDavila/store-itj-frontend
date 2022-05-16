import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllProducts, deleteProduct } from '../api/apiProduct'
import "../styles/admin.css"

export const Admin = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [disabled, setDisabled] = useState(false)

  const fetchingProducts = async () => {
    const products = await getAllProducts();
    setProducts(products);
  }
  const handleEditProduct = (id) => {
    navigate(`/product/${id}`)
  }

  const handleDeleteProduct = async (id) => {
    const response = await deleteProduct(id);
    if(response.message !== 'Product deleted correctly'){
      alert('Error deleting product');
      setDisabled(false);
    }
    fetchingProducts();
    setDisabled(false);
  }
  
  useEffect(() => {
    fetchingProducts()
  } , [])

  return (
    <>
      <h3>Inventary</h3>
      <div className='container'>
        {products.length > 0 ?products.map((product, index)=>(
          <div key={index} className='container-product'>
            <img src={product.imageUrl} alt='product'/>
            <div className='container-product-title'>
              <div>{product.name}</div>
              <div>${product.price}</div>
            </div>
            <p className='container-product-desc'>{product.description !== ''? product.description: 'There is not a description for this product.'}</p>
            <div className='container-product-buttons'>
              <div>
                <button className='edit-btn' onClick={()=>handleEditProduct(product._id)}>Edit</button>
              </div>
              <div>
                <button type='button' className='delete-btn' onClick={()=>{setDisabled(true); handleDeleteProduct(product._id)}} disabled={disabled}>Delete</button>
              </div>
            </div>
          </div>
        )): <h2 style={{textAlign:'center'}}>There isn't products yet.</h2>}
      </div>
    </>
  )
}
