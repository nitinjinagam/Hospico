import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchAppointmentsByClinic } from "../api/appointmentApi";

const ClinicAppointments = () => {
  const { clinicId } = useParams();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchAppointmentsByClinic(clinicId);
        setAppointments(data);
      } catch {
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    if (clinicId) load();
  }, [clinicId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Appointments for Clinic {clinicId}</h2>
      {appointments.length === 0 ? (
        <div>No appointments found.</div>
      ) : (
        <ul>
          {appointments.map(a => (
            <li key={a.id}>
              {a.userName} - {a.appointmentTime} [{a.status}]
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClinicAppointments;
