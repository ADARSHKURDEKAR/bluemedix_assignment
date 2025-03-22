import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    category: '',
    image: ''
  });
  const [validation, setValidation] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.title) errors.title = 'Title is required';
    if (!formData.price) errors.price = 'Price is required';
    else if (isNaN(formData.price)) errors.price = 'Price must be a number';
    if (!formData.description) errors.description = 'Description is required';
    if (!formData.category) errors.category = 'Category is required';
    if (!formData.image) errors.image = 'Image URL is required';
    else {
      try {
        new URL(formData.image);
      } catch {
        errors.image = 'Please enter a valid image URL';
      }
    }
    
    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const productData = {
        ...formData,
        price: Number(formData.price)
      };

      await api.createProduct(productData);
      navigate('/products');
    } catch (err) {
      setError('Failed to create product. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="form-container">
            <h2 className="mb-4">Add New Product</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className={`form-control ${validation.title ? 'is-invalid' : ''}`}
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                {validation.title && <div className="invalid-feedback">{validation.title}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Price</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    step="0.01"
                    className={`form-control ${validation.price ? 'is-invalid' : ''}`}
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                  {validation.price && <div className="invalid-feedback">{validation.price}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  className={`form-control ${validation.description ? 'is-invalid' : ''}`}
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                />
                {validation.description && <div className="invalid-feedback">{validation.description}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className={`form-select ${validation.category ? 'is-invalid' : ''}`}
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="electronics">Electronics</option>
                  <option value="jewelery">Jewelery</option>
                  <option value="men's clothing">Men's Clothing</option>
                  <option value="women's clothing">Women's Clothing</option>
                </select>
                {validation.category && <div className="invalid-feedback">{validation.category}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                  type="url"
                  className={`form-control ${validation.image ? 'is-invalid' : ''}`}
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                />
                {validation.image && <div className="invalid-feedback">{validation.image}</div>}
                {formData.image && (
                  <div className="mt-2">
                    <img
                      src={formData.image}
                      alt="Product preview"
                      className="img-thumbnail"
                      style={{ maxHeight: '200px', objectFit: 'contain' }}
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                )}
              </div>

              <div className="d-grid gap-2">
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Creating Product...
                    </>
                  ) : (
                    'Create Product'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct; 