import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Clinics from "../pages/Clinics";
import ClinicDetails from "../pages/ClinicDetails";
import Appointments from "../pages/Appointments";
import UserProfile from "../pages/UserProfile";
import ClinicAppointments from "../pages/ClinicAppointments";
import Doctors from "../pages/Doctors";

// import Home from "../pages/Home"; // and other pages

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/clinics" element={<Clinics />} />
    <Route path="/clinics/:clinicId" element={<ClinicDetails />} />
    {/* <Route path="/" element={<Home />} /> */}
    <Route path="/appointments" element={<Appointments />} />
    <Route path="*" element={<Login />} />
    <Route path="/profile" element={<UserProfile />} />
    <Route path="/clinics/:clinicId/appointments" element={<ClinicAppointments />} />
    <Route path="/clinics/:clinicId/manage-doctors" element={<Doctors />} />

  </Routes>
);



export default AppRoutes;
