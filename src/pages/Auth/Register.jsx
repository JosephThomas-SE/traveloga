// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { realtimeDb } from '../../services/firebase';
import { ref, set } from "firebase/database"; // Import Firebase Realtime Database
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import './Auth.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const auth = getAuth(); // Initialize Firebase Auth
  const navigate = useNavigate();


  // Function to write user data to Firebase Realtime Database
  function writeUserData(userId, name, email) {
    set(ref(realtimeDb, 'users/' + userId), { // Write data to /users/userId path
      username: name,
      email: email,
      role: 'Temp_User' // Assign role as Temp_User
    })
    .then(() => {
      console.log('User data saved successfully!');
    })
    .catch((error) => {
      console.error('Error writing user data: ', error);
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      setError('');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // After successful registration, write the user data to the database
      writeUserData(user.uid, name, email);

      // Optionally, show a success message or redirect the user
      alert("User registered successfully!");

      // Send verification email
      await sendEmailVerification(userCredential.user);
      alert("Registration successful! Please check your email to verify your account.");
      
      // Set the display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Redirect to dashboard or wherever after registration
      navigate('/home');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="text-center mb-4">Create an Account</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group id="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            placeholder="Enter your full name" 
          />
        </Form.Group>

        <Form.Group id="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
            placeholder="Enter your email" 
          />
        </Form.Group>

        <Form.Group id="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
            placeholder="Enter a strong password" 
          />
        </Form.Group>

        <Form.Group id="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required 
            placeholder="Re-enter your password" 
          />
        </Form.Group>

        <Button className="w-100 mt-4" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Registering...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
      </Form>

      <div className="text-center mt-3">
        Already have an account? <a href="/login">Log In</a>
      </div>
    </div>
  );
};

export default Register;
