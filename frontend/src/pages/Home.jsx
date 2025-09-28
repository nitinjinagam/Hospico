import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'


export default function Home() {
const navigate = useNavigate()
const { user, setPendingFilters } = useAuth()
const [q, setQ] = useState('')
const [city, setCity] = useState('Vijayawada')
const [specialization, setSpecialization] = useState('')


function handleSearch() {
const filters = { q, city, specialization }
if (!user) {
// save selected filters then redirect to auth
setPendingFilters(filters)
navigate('/auth')
return
}
// if logged in go to search with state
navigate('/search', { state: filters })
}


return (
<div className="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white">
<div className="max-w-6xl mx-auto px-6 py-24 flex items-center">
<div className="w-1/2 pr-8">
<h1 className="text-4xl font-extrabold">Find the Best Healthcare Near You</h1>
<p className="mt-4 text-lg">Connect with top-rated hospitals and specialists in your area.</p>
</div>
<div className="w-1/2">
<div className="bg-white rounded-lg p-6 text-gray-800 shadow-lg">
<div className="flex gap-3">
<input className="flex-1 border rounded px-4 py-2" placeholder="Search hospitals, specialties..." value={q} onChange={e=>setQ(e.target.value)} />
<select className="border rounded px-3 py-2" value={city} onChange={e=>setCity(e.target.value)}>
<option>Vijayawada</option>
<option>Hyderabad</option>
<option>Bangalore</option>
</select>
<button onClick={handleSearch} className="bg-blue-600 text-white rounded px-4">Search</button>
</div>
<div className="mt-4 flex gap-2 overflow-x-auto">
{['Cardiology','Neurology','Pediatrics','Orthopedics','Oncology','Gynecology'].map(s=> (
<button key={s} className="bg-gray-100 px-3 py-1 rounded-full text-sm">{s}</button>
))}
</div>
<div className="mt-3 text-right">
<button className="text-sm underline" onClick={async()=>{
// request geolocation then act
if (!navigator.geolocation) return alert('Geolocation not supported')
navigator.geolocation.getCurrentPosition(pos=>{
const { latitude, longitude } = pos.coords
// if not logged redirect to auth but save lat/lng
const filters = { nearby: true, lat: latitude, lng: longitude }
setPendingFilters(filters)
if (!user) navigate('/auth')
else navigate('/search', { state: filters })
})
}}>Search nearby</button>
</div>
</div>
</div>
</div>
</div>
)
}