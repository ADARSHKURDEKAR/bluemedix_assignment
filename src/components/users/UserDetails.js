import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../../services/api';

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await api.getUser(id);
      setUser(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch user details');
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-5"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="alert alert-danger mt-3">{error}</div>;
  if (!user) return <div className="alert alert-info mt-3">User not found</div>;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">User Details</h2>
              <div className="row mb-3">
                <div className="col-md-4 fw-bold">Full Name:</div>
                <div className="col-md-8">{user.name.firstname} {user.name.lastname}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4 fw-bold">Username:</div>
                <div className="col-md-8">{user.username}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4 fw-bold">Email:</div>
                <div className="col-md-8">{user.email}</div>
              </div>
              <div className="row mb-3">
                <div className="col-md-4 fw-bold">Phone:</div>
                <div className="col-md-8">{user.phone}</div>
              </div>
              {user.address && (
                <div className="row mb-3">
                  <div className="col-md-4 fw-bold">Address:</div>
                  <div className="col-md-8">
                    {user.address.street}, {user.address.city}, {user.address.zipcode}
                  </div>
                </div>
              )}
              <div className="d-flex gap-2 mt-4">
                <Link to={`/edit-user/${user.id}`} className="btn btn-warning">
                  Edit User
                </Link>
                <Link to="/users" className="btn btn-secondary">
                  Back to Users
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails; 