/* eslint-disable no-unused-vars */
// src/components/AdminRegister.jsx
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../style/AdminRegister.css'; // Import CSS for styling

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Add admin role to Firestore
      await setDoc(doc(db, 'adminUsers', user.uid), {
        email: user.email,
        role: 'admin'
      });

      setSuccess('Admin registered successfully!');
    } catch (error) {
      setError(`Error registering admin: ${error.message}`);
    }
  };

  return (
    <div className="admin-register">
      <h1>Register Admin</h1>
      <form onSubmit={handleRegister}>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Register</button>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </form>
    </div>
  );
};

export default AdminRegister;
