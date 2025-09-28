import React, { useEffect, useState } from "react";
import { fetchUser , updateUser } from "../api/userApi";
import { getUserId } from "../utils/helpers";

const UserProfile = () => {
  const userId = getUserId();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ phone: "", password: "" });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await fetchUser (userId);
      setUser(data);
      setForm({ phone: data.phone || "", password: "" });
    };
    if (userId) load();
  }, [userId]);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    // Only include fields that are non-empty
    const submitData = {};
    if (form.phone && form.phone !== user.phone) submitData.phone = form.phone;
    if (form.password) submitData.password = form.password;
    try {
    await updateUser(userId, submitData);
    setMessage("Updated!");
    setForm(f => ({ ...f, password: "" })); // clear password after update
    // Optionally reload user to refresh info
    const updatedUser = await fetchUser(userId);
    setUser(updatedUser);
    } catch {
    setMessage("Update failed");
    }
  };

  if (!userId) return <div>Please log in.</div>;
  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <div>Email: {user.email}</div>
      <form onSubmit={handleSubmit}>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New password"
        />
        <button type="submit">Update</button>
      </form>
      {message && <div>{message}</div>}
    </div>
  );
};

export default UserProfile;
