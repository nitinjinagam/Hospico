import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchClinics } from "../api/clinicApi";
import { fetchDoctorsByClinicAndSpecialization } from "../api/doctorApi";
import { bookAppointment } from "../api/appointmentApi";

const ClinicDetails = () => {
  const { clinicId } = useParams();
  const navigate = useNavigate();
  const [clinic, setClinic] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [message, setMessage] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch clinic details (from list API, or you can create a getClinicById API)
    const fetchClinic = async () => {
      setLoading(true);
      try {
        const clinics = await fetchClinics();
        const found = clinics.find(c => String(c.clinicId) === String(clinicId));
        setClinic(found);
      } catch (e) {
        setClinic(null);
      } finally {
        setLoading(false);
      }
    };
    fetchClinic();
  }, [clinicId]);

  useEffect(() => {
    if (!clinicId) return;
    // You can set specialization to filter doctors, or leave empty for all
    const fetchDocs = async () => {
      try {
        const data = await fetchDoctorsByClinicAndSpecialization(clinicId, specialization || "");
        setDoctors(data);
      } catch (e) {
        setDoctors([]);
      }
    };
    fetchDocs();
  }, [clinicId, specialization]);

  const userId = Number(localStorage.getItem("userId"));;

  const handleBook = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await bookAppointment({
        clinicId: parseInt(clinicId),
        userId,
        appointmentTime,
      });
      setMessage("Appointment booked successfully.");
    } catch (err) {
      setMessage("Booking failed.");
    }
  };

  if (loading) return <div>Loading clinic...</div>;
  if (!clinic) return <div>Clinic not found.</div>;

  return (
    <div className="p-4">
      <button onClick={() => navigate("/clinics")}>← Back to clinics</button>
      <h2 className="text-2xl font-bold mb-2">{clinic.name}</h2>
      <div>
        <strong>Address:</strong> {clinic.address}, {clinic.city}
        <br />
        <strong>Phone:</strong> {clinic.phone}
        <br />
        <strong>Specializations:</strong> {clinic.specializations?.join(", ")}
      </div>
      <hr className="my-4" />

      <h3 className="text-lg font-bold">Doctors</h3>
      <input
        type="text"
        placeholder="Filter by specialization"
        value={specialization}
        onChange={e => setSpecialization(e.target.value)}
        className="mb-2"
      />
      {doctors.length === 0 ? (
        <div>No doctors found.</div>
      ) : (
        <ul>
          {doctors.map(doc => (
          <li
            key={doc.id}
            style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: 8 }}
          >
            {/* Show doctor image or default */}
            <img
              src={doc.imageUrl ? doc.imageUrl : "/default_doctor.png"}
              alt={doc.name}
              style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }}
              onError={e => {
                e.target.onerror = null; // prevents looping if default is missing
                e.target.src = "/default_doctor.png";
              }}
            />
            <div>
              <strong>{doc.name}</strong> — {doc.specialization} ({doc.qualifications})
            </div>
          </li>
        ))}

        </ul>
      )}

      <hr className="my-4" />
      <h3 className="text-lg font-bold mb-2">Book Appointment</h3>
      <form onSubmit={handleBook}>
        <input
          type="datetime-local"
          value={appointmentTime}
          onChange={e => setAppointmentTime(e.target.value)}
          required
          className="border p-1 mr-2"
        />
        <button type="submit" className="bg-blue-500 px-2 py-1 text-white rounded">Book</button>
      </form>
      {message && <div className="mt-2">{message}</div>}
    </div>
  );
};

export default ClinicDetails;
