import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/common/Navbar'
import Home from './pages/Home'
import LoginSignup from './pages/LoginSignup'
import PartnerLogin from './pages/PartnerLogin'
import SearchResults from './pages/SearchResults'
import ClinicDetails from './pages/ClinicDetails'
import { AuthProvider } from './context/AuthContext'


export default function App() {
return (
<AuthProvider>
<div className="min-h-screen bg-gray-50">
<Navbar />
<Routes>
<Route path="/" element={<Home />} />
<Route path="/auth" element={<LoginSignup />} />
<Route path="/partner" element={<PartnerLogin />} />
<Route path="/search" element={<SearchResults />} />
<Route path="/clinics/:id" element={<ClinicDetails />} />
</Routes>
</div>
</AuthProvider>
)
}