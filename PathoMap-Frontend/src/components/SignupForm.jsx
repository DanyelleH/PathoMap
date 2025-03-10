import React from 'react';

export default function SignupForm({ formType, handleSubmit, handleFormDataChange }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder='username'
          onChange={handleFormDataChange}  
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder='password'
          onChange={handleFormDataChange}  
        />
      </div>
      <button type="submit">{formType}</button>
    </form>
  );
}