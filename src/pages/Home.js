import React, { useEffect, useState } from "react";
import api from "../services/api";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get("/users")
      .then((response) => {
        console.log("API Response:", response.data); 
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  return (
    <div>
      <h1>Dashboard Home</h1>
      <ul>
        {data.map((user) => (
          <li key={user.id}>
            <strong>{user.name.firstname} {user.name.lastname}</strong> - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;