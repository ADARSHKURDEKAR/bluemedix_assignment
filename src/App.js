import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import UsersList from './components/users/UsersList';
import UserDetails from './components/users/UserDetails';
import AddUser from './components/users/AddUser';
import EditUser from './components/users/EditUser';
import ProductsList from './components/products/ProductsList';
import ProductDetails from './components/products/ProductDetails';
import AddProduct from './components/products/AddProduct';
import EditProduct from './components/products/EditProduct';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container mt-4">
          <Routes>
            {/* User Routes - Exactly as specified in requirements */}
            <Route path="/users" element={<UsersList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/add-user" element={<AddUser />} />
            
            {/* Product Routes - Exactly as specified in requirements */}
            <Route path="/products" element={<ProductsList />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/add-product" element={<AddProduct />} />
            
            {/* Redirect root to users list */}
            <Route path="/" element={<UsersList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;