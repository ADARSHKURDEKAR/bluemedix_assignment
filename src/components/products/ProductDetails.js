import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await api.getProduct(id);
      setProduct(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch product details');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;
  if (!product) return <div className="alert alert-info mt-3">Product not found</div>;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="img-fluid rounded-start p-3"
                  style={{ objectFit: 'contain', height: '100%' }}
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h2 className="card-title">{product.title}</h2>
                  <p className="card-text">{product.description}</p>
                  <div className="mb-3">
                    <h4 className="text-primary">${product.price}</h4>
                    <span className="badge bg-secondary">{product.category}</span>
                  </div>
                  <div className="d-flex gap-2">
                    <Link to={`/edit-product/${product.id}`} className="btn btn-warning">
                      Edit Product
                    </Link>
                    <Link to="/products" className="btn btn-secondary">
                      Back to Products
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 