import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    firstname: '',
    lastname: '',
    phone: ''
  });
  const [validation, setValidation] = useState({});

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.getUser(id);
      const user = response.data;
      setFormData({
        email: user.email,
        username: user.username,
        firstname: user.name.firstname,
        lastname: user.name.lastname,
        phone: user.phone
      });
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user data');
      setLoading(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
    
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.firstname) errors.firstname = 'First name is required';
    if (!formData.lastname) errors.lastname = 'Last name is required';
    if (!formData.phone) errors.phone = 'Phone number is required';
    
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
      const userData = {
        email: formData.email,
        username: formData.username,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname
        },
        phone: formData.phone
      };

      await api.updateUser(id, userData);
      navigate('/users');
    } catch (err) {
      setError('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="form-container">
            <h2 className="mb-4">Edit User</h2>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    type="text"
                    className={`form-control ${validation.firstname ? 'is-invalid' : ''}`}
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                  {validation.firstname && <div className="invalid-feedback">{validation.firstname}</div>}
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    type="text"
                    className={`form-control ${validation.lastname ? 'is-invalid' : ''}`}
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChange}
                  />
                  {validation.lastname && <div className="invalid-feedback">{validation.lastname}</div>}
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${validation.email ? 'is-invalid' : ''}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {validation.email && <div className="invalid-feedback">{validation.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Username</label>
                <input
                  type="text"
                  className={`form-control ${validation.username ? 'is-invalid' : ''}`}
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {validation.username && <div className="invalid-feedback">{validation.username}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  className={`form-control ${validation.phone ? 'is-invalid' : ''}`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {validation.phone && <div className="invalid-feedback">{validation.phone}</div>}
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
                      Updating User...
                    </>
                  ) : (
                    'Update User'
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

export default EditUser; 