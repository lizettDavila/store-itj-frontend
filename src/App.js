import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { HomePage } from "./pages/HomePage";
import { Admin } from "./pages/Admin";
import { Checkout } from "./pages/Checkout";
import { Product } from "./pages/Product";

function App() {
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [productsSelected, setProductsSelected] = useState([]);
  const [productIds, setProductIds] = useState([]);

  //main project logic

  const handleOnCount = (action) => {
    if(action === 'add') {
      setNumberOfItems(numberOfItems + 1);
    }else{
      setNumberOfItems(numberOfItems - 1);
    }
  };
  const handleOnSave = (id, product) => {
    setProductIds([...productIds, id]);
    if (productIds.includes(id) === false) {
      setProductsSelected([...productsSelected, { ...product, count: 1 }]);
    } else {
      const elementFounded = productsSelected.find(
        (element) => element._id === id
      );
      let newProducts = productsSelected.filter(
        (element) => element._id !== elementFounded._id
      );
      setProductsSelected([
        { ...elementFounded, count: elementFounded.count + 1 },
        ...newProducts
      ]);
    }

  };

  const handleOnRemove = async (id) => {
    const elementFounded = await productsSelected.find(
      (element) => element._id === id
    );
    let newIds =  productIds.filter(
      (element) => element !== elementFounded._id
    );
    let newProducts =  productsSelected.filter(
      (element) => element._id !== elementFounded._id
    );
    if (elementFounded.count > 1) {
      setProductsSelected([
        { ...elementFounded, count: elementFounded.count - 1 },
        ...newProducts,
      ]);
    } else {
      let newProducts = productsSelected.filter(
        (element) => element._id !== elementFounded._id
      );
      setProductsSelected([...newProducts]);
      setProductIds([...newIds]);
    }
    return newProducts;
  };

  const handleOnCheckout = () => {
    setProductsSelected([]);
    setProductIds([]);
    setNumberOfItems(0);
  }
  return (
    <>
      <NavBar numberOfItems={numberOfItems} />
      <Routes>
        <Route
          index
          element={<HomePage onCount={handleOnCount} onSave={handleOnSave} />}
        />
        <Route path="/admin" element={<Admin />} />
        <Route
          path="/checkout"
          element={
            <Checkout
              productsSelected={productsSelected}
              onRemove={handleOnRemove}
              onCount={handleOnCount}
              onCheckout={handleOnCheckout}
            />
          }
        />
        <Route path="/product" element={<Product />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </>
  );
}

export default App;
