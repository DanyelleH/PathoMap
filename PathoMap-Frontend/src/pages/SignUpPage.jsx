import React, { useState, useContext, useEffect } from 'react';
import { signup } from '../api/authApi';
import Form from '../components/LoginForm';
import { useNavigate } from 'react-router-dom';
import UserContext from '../contexts/UserContext';

export default function SignUpForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Call the signup API with the username and password
    const signupResponse = await signup({ username, password });

    // If signup is successful, set redirect state
    if (signupResponse.username && signupResponse.password) {
      setShouldRedirect(true);
    }
  };

  // Perform redirection when signup is successful
  useEffect(() => {
    if (shouldRedirect) {
      navigate("/login");
    }
  }, [shouldRedirect, navigate]);

  // Handle input changes
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  // Return the form with input handling
  return (
    <Form
      formType="Create Account"
      handleSubmit={handleSubmit}
      setUsername={setUsername} // Pass the state setters as props
      setPassword={setPassword}
      username={username} // Pass the current username and password as props
      password={password}
      handleUsernameChange={handleUsernameChange} // pass the onChange handlers
      handlePasswordChange={handlePasswordChange} // pass the onChange handlers
    />
  );
}