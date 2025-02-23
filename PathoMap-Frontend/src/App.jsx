import { useState } from 'react'
import './App.css'
import FixedBottomNavigation from './components/Navigation'
import {BrowserRouter , Routes, Route, Link} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/LoginPage'
import SignUp from './pages/SignUpPage'
import UserContext from "./contexts/UserContext"
function App() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [userToken, setUserToken] = useState(null)



  const handleToken = (token) => {
    setFormData({ username: '', password: '' })
    setUserToken(token)
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
    <UserContext.Provider value={userToken} >
      <BrowserRouter>
        <FixedBottomNavigation userToken={userToken} setUserToken={setUserToken}/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login handleInputChange={handleInputChange} formData={formData} handleToken={handleToken}/>} />
            <Route path="/signup" element={<SignUp handleInputChange={handleInputChange} formData={formData}/>} />
          </Routes>
      </BrowserRouter>

    </UserContext.Provider>
      
    </>
  )
}

export default App
