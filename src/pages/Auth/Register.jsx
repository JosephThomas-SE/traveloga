// src/pages/Auth/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth';
import { realtimeDb } from '../../services/firebase';
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

      // Add user to the database with Temp_User role
      const userRef = realtimeDb.ref(`/users/${user.uid}`);
      await userRef.set({
        name: name,
        email: email,
        role: 'Temp_User',
      });

      // Send verification email
      await sendEmailVerification(userCredential.user);
      alert("Registration successful! Please check your email to verify your account.");
      
      // Set the display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // Redirect to dashboard or wherever after registration
      navigate('/login');
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
