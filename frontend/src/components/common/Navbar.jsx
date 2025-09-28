import React from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function Navbar() {
const navigate = useNavigate()
return (
<nav className="bg-white shadow-sm">
<div className="mx-auto px-4 sm:px-6 lg:px-8">
<div className="flex justify-between h-16 items-center">
<div className="flex items-center space-x-4">
<Link to="/" className="flex items-center gap-2">
<div className="w-10 h-10 bg-blue-500 rounded flex items-center justify-center text-white font-bold">H</div>
<span className="text-lg font-semibold text-blue-600">HospiCo</span>
</Link>


<div className="hidden md:flex items-center space-x-6 ml-8 text-gray-600">
<Link to="/search" className="hover:text-gray-900">Find Hospitals</Link>
<Link to="#" className="hover:text-gray-900">Specialties</Link>
<Link to="#" className="hover:text-gray-900">Emergency</Link>
<div className="relative group">
<button className="hover:text-gray-900">Resources</button>
<div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
<Link to="#" className="block px-3 py-2 text-sm">Health Resources</Link>
<Link to="#" className="block px-3 py-2 text-sm">Blog</Link>
<Link to="#" className="block px-3 py-2 text-sm">FAQs</Link>
</div>
</div>
</div>
</div>


<div className="flex items-center space-x-4">
<div className="hidden sm:flex items-center text-sm text-gray-600 gap-4">
<div className="flex items-center gap-2"><svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeWidth="2" d="M3 5h12M9 3v2M9 7v2" /></svg> 1-234-567-890</div>
<Link to="/partner" className="text-blue-600">Partner Portal</Link>
<Link to="/auth" className="text-gray-600">Sign in / Sign up</Link>
</div>


<button onClick={() => navigate('/auth')} className="bg-blue-600 text-white px-4 py-2 rounded-lg">Book Appointment</button>
</div>
</div>
</div>
</nav>
)
}