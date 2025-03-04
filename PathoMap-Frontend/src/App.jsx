import { useState, useNavigate } from 'react'
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
  const [userToken, setUserToken] = useState(null)

  const handleToken = (token) => {
    setFormData({ username: '', password: '' })
    setUserToken(token)

  }

  const handleLogout = () => {
    setUserToken("")
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
    <UserContext.Provider value={{userToken, formData, handleInputChange, handleToken}} > 
      {/* # providers store the state and ass passes it to children */}
      <BrowserRouter>
        <FixedBottomNavigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<SignUp />} />
            <Route path="/new-user/:username" element={<NewUser />} />
            <Route path="/profile" element={<Profile />} />  
            <Route path="/symptomSearch" element={<SymptomSearch />} />
            <Route path="/diseaseLookup" element={<DiseaseLookup />}  />
            {/* direct to new user form with the users id as a parameter. */}
          </Routes>
      </BrowserRouter>

    </UserContext.Provider>
      
    </>
  )
}

export default App
