import React, { useState, useContext, useEffect } from 'react';
import { signup } from '../api/authApi';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export default function SignUpForm() {
  const [ formData , setFormData] = useState({username:"",password:""})
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;
    try {
      const signupResponse = await signup({ username, password });

      if (signupResponse.username && signupResponse.password) {
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error('Sign-up failed:', error);
    }
  };

  // Perform redirection when signup is successful
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/login");
    }
  }, [shouldRedirect, navigate]);

  // Return the form with input handling
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="username"
          value={formData.username} // Bind input to state
          onChange={handleInputChange}  
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="password"
          value={formData.password} // Bind input to state
          onChange={handleInputChange}  
        />
      </div>
      <button type="submit">Sign Up</button>
    </form>
  );
}