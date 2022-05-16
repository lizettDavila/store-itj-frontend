import { useEffect, useState } from 'react';
import { useLocation, Link, NavLink } from 'react-router-dom';
import "../styles/navbar.css";
import { FiShoppingCart } from "react-icons/fi";

function NavBar({numberOfItems}) {
  const location = useLocation();
  const [user, setUser] = useState('other');
  
  useEffect(() => {
    if (location.pathname === "/admin") {
      setUser('admin');
    }else if(location.pathname === "/") {
      setUser('customer');
    }else if(location.pathname === "/checkout") {
      setUser('checkout');
    }else{
      setUser('other');
    }
  } , [location]);
  
  return (
    <div className='container-navbar'>
      {
        user === 'admin' ?
        <div className='containe-links'>
          <div>
            <NavLink to="/">Main page</NavLink>
          </div>
          <div>
           <NavLink to="/product">Create new product</NavLink>
          </div>
        </div>:
        user === 'customer' ?
        <div className='containe-links'>
          <div>
            <NavLink to="/admin">Go to Admin </NavLink>
          </div>
          <div className='cart'>
            <NavLink to="/checkout ">
              <FiShoppingCart className='icon'/>
            </NavLink>
            <div className='counter'>{numberOfItems}</div>
          </div>
        </div>:
        user === 'checkout' ?
        <div className='containe-links'>
          <div>
            <NavLink to="/">Go back</NavLink>
          </div>
          <div className='cart'>
            <NavLink to="/checkout ">
              <FiShoppingCart className='icon'/>
            </NavLink>
            <div className='counter'>{numberOfItems}</div>
          </div>
        </div>:
        <div className='containe-links'>
          <div>
            <NavLink to="/">Go to the main page</NavLink>
          </div>
        </div>
      }
    </div>
  )
}

export default NavBar;
