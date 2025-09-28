import React, { useEffect, useState } from "react";
import { fetchAppointmentsByUser, deleteAppointment, updateAppointment } from "../api/appointmentApi";
import { getUserId } from "../utils/helpers";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newTime, setNewTime] = useState("");
  const [msg, setMsg] = useState("");
  const userId = getUserId();

  // Load appointments
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchAppointmentsByUser(userId);
        setAppointments(data);
      } catch {
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };
    if (userId) load();
  }, [userId]);

  const handleDelete = async (id) => {
    try {
      await deleteAppointment(id);
      setAppointments(appointments.filter(a => a.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const handleReschedule = (id, currentTime) => {
    setEditingId(id);
    setNewTime(currentTime.replace(" ", "T")); // Pre-fill with current value
    setMsg("");
  };

  const handleRescheduleSubmit = async (e, id) => {
    e.preventDefault();
    try {
      await updateAppointment(id, { appointmentTime: newTime });
      setMsg("Appointment updated!");
      // Reload appointments
      const data = await fetchAppointmentsByUser(userId);
      setAppointments(data);
      setEditingId(null);
      setNewTime("");
    } catch {
      setMsg("Failed to update appointment.");
    }
  };

  if (!userId) return <div>Please log in.</div>;
  if (loading) return <div>Loading appointments...</div>;

  return (
    <div>
      <h2>My Appointments</h2>
      {appointments.length === 0 ? (
        <div>No appointments found.</div>
      ) : (
        <ul>
          {appointments.map(a => (
            <li key={a.id} style={{ marginBottom: 12 }}>
              {a.clinicName} on {a.appointmentTime} [{a.status}]
              <button onClick={() => handleDelete(a.id)} style={{ marginLeft: 8 }}>Cancel</button>
              <button onClick={() => handleReschedule(a.id, a.appointmentTime)} style={{ marginLeft: 8 }}>Reschedule</button>
              {/* Reschedule Form */}
              {editingId === a.id && (
                <form
                  onSubmit={e => handleRescheduleSubmit(e, a.id)}
                  style={{ display: "inline-block", marginLeft: 10 }}
                >
                  <input
                    type="datetime-local"
                    value={newTime}
                    onChange={e => setNewTime(e.target.value)}
                    required
                    style={{ marginRight: 6 }}
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingId(null)} style={{ marginLeft: 4 }}>Cancel</button>
                </form>
              )}
            </li>
          ))}
        </ul>
      )}
      {msg && <div>{msg}</div>}
    </div>
  );
};

export default Appointments;
