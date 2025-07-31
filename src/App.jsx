import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Experiences from './pages/Experiences'
import Services from './pages/Services'
import NotFound from './pages/NotFound'
import Something from './pages/Something'
import HotelDetailPage from './pages/HotelDetailPage'
import { AllDataProvider } from './contexts/AllDataContext'
import {UserProvider} from "./contexts/UsersContext"
import ServicesDetailPage from './pages/ServicesDetailPage'
import ExperiencesDetailPage from './pages/ExperiencesDetailPage'
import SearchPage from './pages/SearchPage'
import UserPage from "./pages/UserPage"
import AdminPage from './pages/AdminPage'
function App() {
  return (
    <>
    <UserProvider>
      <AllDataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              <Route index element={<Home />} />
              <Route path="home" element={<Home />} />
              <Route path="experiences" element={<Experiences />} />
              <Route path="services" element={<Services />} />
            
            </Route>  
            <Route path="s/:id" element={<Something />} />
            <Route path="home/:id" element={<HotelDetailPage />} />
            <Route path="services/:id" element={<ServicesDetailPage />} />
            <Route path="experiences/:id" element={<ExperiencesDetailPage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path = "users/profile" element ={<UserPage/>}/>
            <Route path="*" element={<NotFound />} />
            <Route path= "adminpage" element={<AdminPage/>}/>
          </Routes>
        </Router>
      </AllDataProvider>
    </UserProvider>
    </>
  )
}

export default App  