import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductById,
  createProduct,
  updateProduct,
} from "../api/apiProduct";
import "../styles/product.css";

const newProduct = {
  name: "",
  imageUrl: "",
  price: "",
  description: "",
  updatedAt: new Date().toISOString(),
};

export const Product = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState(newProduct);



  const handleOnCancel = () => {
    navigate("/admin");
  };
  const handleOnSubmit = () => {
    if (id) {
      updateProduct(id, product);
    } else {
      createProduct(product);
    }
    navigate("/admin", {replace: true});
  };
  const handleOnChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  useEffect(() => {
    const fetchProductById = async () => {
      const response = await getProductById(id);
      setProduct(response);
    };
    if (id) {
      fetchProductById();
    } 
  }, [id]);

  return (
      <>
        <h3>Here you can create or edit information about your product!</h3>
        <div className="container-form">
        <form method="Post">
            <div className="container-inputs">
            <div>
                <label> Name:</label>
                <input
                type="text"
                name="name"
                placeholder="Example: Laptop"
                defaultValue={product.name}
                onChange={(e) => handleOnChange(e)}
                />
            </div>
            <div>
                <label> Image from url:</label>
                <input
                type="text"
                name="imageUrl"
                defaultValue={product.imageUrl}
                onChange={(e) => handleOnChange(e)}
                />
            </div>
            <div>
                <label>Price:</label>
                <input
                type="text"
                name="price"
                placeholder="Example: 350.00"
                defaultValue={product.price}
                onChange={(e) => handleOnChange(e)}
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                type="textarea"
                name="description"
                defaultValue={product.description}
                onChange={(e) => handleOnChange(e)}
                />
            </div>
            </div>
            <div className="container-btns">
            <button type="button" onClick={() => handleOnCancel()}>
                Cancel
            </button>
            <button
                type="button"
                onClick={(e) => handleOnSubmit(e)}
                disabled={
                product.name === "" ||
                product.imageUrl === "" ||
                product.price === "" ? true : false
                }
            >
                Save
            </button>
            </div>
        </form>
        </div>
      </>
  );
};
