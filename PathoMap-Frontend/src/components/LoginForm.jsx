// import React, {useState} from 'react';

// export default function LoginForm({username}, {password}){
//     const handleSubmit= (e) =>{
        
//     }
//     if (!username || !password){
//         const [username, setUsername] = useState("");
//         const [password, setPassword] = useState("");
//     return(
//         <form onSubmit={handleSubmit}>
//             <div>
//                 <input type="text" value={username} placeholder="Username" />
//             </div>
//             <div>
//                 <input type="password" value={password} placeholder="password" />
//             </div>
//             <button type="submit" > Sign In </button>
//         </form>
//     )}


// }

function Form({formType, handleInputChange, formData, handleSubmit, errorMessage}) {

    return (
      <>
      {errorMessage && <h2>{errorMessage}</h2>}
      <div className="login">
        <h2>{formType}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit">{formType}</button>
        </form>
      </div>
      </>
    );
  }
  
  export default Form;
  