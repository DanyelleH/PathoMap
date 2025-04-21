import './App.css'
import FixedBottomNavigation from './components/Navigation'
import {BrowserRouter , Routes, Route, Link} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/LoginPage'
import SignUp from './pages/SignUpPage'
import {UserProvider} from "./contexts/UserContext"
import NewUser from './pages/UserInformation'
import Profile from './pages/ProfilePage'
import SymptomSearch from './pages/SymptomSearchPage'
import DiseaseLookup from './pages/DiseaseLookupPage'
import ProteinSearch from './pages/ProteinSearchPage'
import DiseaseInformation from './pages/DiseaseInformation'
import About from './pages/AboutPage'
import { ThemeProvider } from './contexts/themeContext'
function App() {
  return (
      <BrowserRouter>
        <UserProvider >
          <ThemeProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} /> 
            <Route path="/signup" element={<SignUp />} />
            <Route path="/new-user/:username" element={<NewUser />} />
            <Route path="/profile" element={<Profile />} />  
            <Route path="/symptomSearch" element={<SymptomSearch />} />
            <Route path="/diseaseLookup" element={<DiseaseLookup />}  />
            <Route path="/exploreProteins" element={<ProteinSearch />} />
            <Route path="diseaseInformation/:diseasePk" element={ <DiseaseInformation />} />
            <Route path="aboutUs" element={<About />} />
            {/* direct to new user form with the users id as a parameter. */}
          </Routes>
          <FixedBottomNavigation />
          </ThemeProvider>
        </UserProvider>
      </BrowserRouter>
  )
}

export default App
