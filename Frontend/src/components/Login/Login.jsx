import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 
import { useUser } from '../../Context/UserContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const { loginUser } = useUser();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Assuming your backend is running on http://localhost:8000
      const response = await axios.post('http://localhost:8000/api/v1/users/login', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if 'response' is defined before accessing 'data'
      if (response && response.data) {
        // Handle the response from the backend (success or failure)
        console.log('Login successful:', response.data);

        // Reset form data after successful login
        setFormData({
          email: '',
          password: '',
        });

        loginUser(response.data.data.user);
        console.log("response:",response.data.data.user);
        
        navigate('/');
      } else {
        console.error('Unexpected response:', response);
      }
    } catch (error) {
      // Handle errors from the backend
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h2>Connectify.</h2>
          
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
          <input type="email" id="email" name="email" value={formData.email} placeholder='Email' onChange={handleChange} required />
          <input type="password" id="password" name="password" value={formData.password} placeholder='Password' onChange={handleChange} required />
            <button onClick={handleSubmit}>Login</button>
            <h5>Demo Login Credentials -<br></br> username: aaryan@gmail.com <br/> password: 123</h5>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
