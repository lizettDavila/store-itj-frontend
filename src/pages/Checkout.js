import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPurchase } from "../api/apiPurchase";
import "../styles/checkout.css";

export const Checkout = ({ productsSelected, onRemove, onCount, onCheckout }) => {
  const newCheckout = {
    name: "",
    address: "",
    products: [...productsSelected],
  };
  const navigate = useNavigate();
  const [checkout, setCheckout] = useState(newCheckout);

  let totalToPaid = productsSelected.reduce(
    (acc, product) =>
      acc + parseFloat(parseFloat(product.price) * product.count),
    0
  );
 

  const savePurchase = async () => {
      await createPurchase(checkout);
      await onCheckout(checkout);
      navigate("/"); 
  }
  const handleRemove = async (id, price) => {
   let newProducts =  await onRemove(id);
   setCheckout({
    ...checkout,
    products: [...newProducts],
  }); 
    await onCount("less");
    totalToPaid = totalToPaid - price;
  };

  const handleOnChange = (e) => {
    setCheckout({
      ...checkout,
      [e.target.name]: e.target.value,
    });
   
  }

  const handleCkeckout =  async () => {
    if(checkout.products.length > 0){
       savePurchase(); 
    }
  };



  return (
    <div className="container-checkout">
      <div className="labels">
        <div>Name</div>
        <div>Price</div>
        <div>Number</div>
        <div>Total e/u</div>
        <div></div>
      </div>
      {productsSelected.map((product) => (
        <div key={product._id} className="product-detail">
          <div>{product.name}</div>
          <div>{product.price}</div>
          <div>{product.count}</div>
          <div>
            {parseFloat(parseFloat(product.price) * product.count).toFixed(2)}
          </div>
          <div className="detail-btn">
            <button onClick={() => handleRemove(product._id, product.price)}>
              Remove 1 item
            </button>
          </div>
        </div>
      ))}
      <div className="total">{`Total: ${totalToPaid.toFixed(2)}`}</div>
      <div className="container-form">
        <form method="POST">
          <div className="container-inputs">
            <div className="form-input">
              <label> Enter your fullname:</label>
              <input
                type="text"
                name="name"
                placeholder="Johnn Doe"
                defaultValue={checkout.name}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div className="form-input">
              <label> Enter your address:</label>
              <input
                type="text"
                name="address"
                placeholder="Quito, Ecuador"
                defaultValue={checkout.address}
                onChange={(e) => handleOnChange(e)}
              />
            </div>
            <div>
              <button
                type="button"
                onClick={() => handleCkeckout()}
                className="check-btn"
                disabled={
                  checkout.name === "" ||
                  checkout.address === "" ||
                  productsSelected.length === 0
                }
              >
                Checkout
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
