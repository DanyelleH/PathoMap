import { useState } from 'react'
import './App.css'
import FixedBottomNavigation from './components/Navigation'
import {BrowserRouter , Routes, Route, Link} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/LoginPage'
import SignUp from './pages/SignUpPage'
import UserContext from "./contexts/UserContext"
import NewUser from './pages/UserInformation'
import Profile from './pages/ProfilePage'
import SymptomSearch from './pages/SymptomSearchPage'
import DiseaseLookup from './pages/DiseaseLookupPage'

function App() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [userToken, setUserToken] = useState(sessionStorage.getItem("token"))


  const handleToken = (token) => {
    setFormData({ username: '', password: '' })
    setUserToken(token)
    sessionStorage.setItem("userToken", token)
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
            <Route path="/" element={<HomePage />} formData={formData}/>
            <Route path="/home" element={<HomePage formData={formData}/>} />
            <Route path="/login" element={<Login handleInputChange={handleInputChange} formData={formData} handleToken={handleToken}/>} />
            <Route path="/signup" element={<SignUp handleToken ={handleToken} handleInputChange={handleInputChange} formData={formData}/>} />
            <Route path="/new-user/:username" element={<NewUser handleInputChange={handleInputChange} formData={formData} handleToken={handleToken}/>} />
            <Route path="/profile" element={<Profile />} />  
            <Route path="/symptomSearch" element={<SymptomSearch />} handleToken={handleToken}/>
            <Route path="/diseaseLookup" element={<DiseaseLookup />} handleToken={handleToken} />
            {/* direct to new user form with the users id as a parameter. */}
          </Routes>
      </BrowserRouter>

    </UserContext.Provider>
      
    </>
  )
}

export default App
