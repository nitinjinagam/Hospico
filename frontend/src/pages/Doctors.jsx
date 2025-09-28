import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchDoctorsByClinicAndSpecialization,
  addDoctorToClinic,
  deleteDoctor
} from "../api/doctorApi";

const Doctors = () => {
  const { clinicId } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    qualifications: "",
    imageUrl: ""
  });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState("");

  // Fetch ALL doctors for the clinic
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // Leave specialization blank to get all doctors
        const data = await fetchDoctorsByClinicAndSpecialization(clinicId, "");
        setDoctors(data);
      } catch {
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };
    if (clinicId) load();
  }, [clinicId]);

  const handleChange = e =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleAdd = async e => {
    e.preventDefault();
    setMsg("");
    try {
      await addDoctorToClinic(clinicId, form);
      setForm({ name: "", specialization: "", qualifications: "", imageUrl: "" });
      setMsg("Doctor added!");
      // Reload doctors
      const data = await fetchDoctorsByClinicAndSpecialization(clinicId, "");
      setDoctors(data);
    } catch {
      setMsg("Failed to add doctor.");
    }
  };

  const handleDelete = async doctorId => {
    setMsg("");
    try {
      await deleteDoctor(doctorId);
      setDoctors(doctors.filter(d => d.id !== doctorId));
    } catch {
      setMsg("Failed to delete.");
    }
  };

  return (
    <div>
      <h2>Doctor Management for Clinic {clinicId}</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: "1rem" }}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          required
        />
        <input
          name="qualifications"
          placeholder="Qualifications"
          value={form.qualifications}
          onChange={handleChange}
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          value={form.imageUrl}
          onChange={handleChange}
        />
        <button type="submit">Add Doctor</button>
      </form>
      {msg && <div>{msg}</div>}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {doctors.map(doc => (
            <li key={doc.id} style={{ marginBottom: 8, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <img
                src={doc.imageUrl ? doc.imageUrl : "/default_doctor.png"}
                alt={doc.name}
                style={{ width: 40, height: 40, objectFit: "cover", borderRadius: "50%" }}
                onError={e => {
                  e.target.onerror = null;
                  e.target.src = "/default_doctor.png";
                }}
              />
              <div>
                <strong>{doc.name}</strong> — {doc.specialization} ({doc.qualifications})
              </div>
              <button onClick={() => handleDelete(doc.id)} style={{ marginLeft: 12 }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Doctors;
