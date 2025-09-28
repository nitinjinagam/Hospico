import React, { useEffect, useState } from "react";
import { fetchClinics } from "../api/clinicApi";
import { useNavigate } from "react-router-dom";

const Clinics = () => {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [specialization, setSpecialization] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadClinics = async () => {
      setLoading(true);
      try {
        const data = await fetchClinics(city, specialization);
        setClinics(data);
      } catch (e) {
        setClinics([]);
      } finally {
        setLoading(false);
      }
    };
    loadClinics();
  }, [city, specialization]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Clinics</h2>
      <div>
        <input
          type="text"
          placeholder="Filter by city"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filter by specialization"
          value={specialization}
          onChange={e => setSpecialization(e.target.value)}
        />
      </div>
      {loading ? (
        <div>Loading clinics...</div>
      ) : clinics.length === 0 ? (
        <div>No clinics found.</div>
      ) : (
        <ul>
          {clinics.map(clinic => (
            <li
              key={clinic.clinicId}
              onClick={() => navigate(`/clinics/${clinic.clinicId}`)}
              style={{ cursor: "pointer", marginBottom: 8, display: "flex", alignItems: "center", gap: "1rem" }}
            >
              {/* Show clinic image or default */}
              <img
                src={clinic.imageUrl ? clinic.imageUrl : "/default_clinic.png"}
                alt={clinic.name}
                style={{ width: 48, height: 48, objectFit: "cover", borderRadius: "8px" }}
                onError={e => {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src = "/default_clinic.png";
                }}
              />
              <div>
                <strong>{clinic.name}</strong> — {clinic.address}, {clinic.city}
              </div>
            </li>
          ))}

        </ul>
      )}
    </div>
  );
};

export default Clinics;
