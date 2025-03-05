import React from 'react';

export default function Form({ formType, handleSubmit, formData, handleFormDataChange }) {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleFormDataChange}  
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleFormDataChange}  
        />
      </div>
      <button type="submit">{formType}</button>
    </form>
  );
}