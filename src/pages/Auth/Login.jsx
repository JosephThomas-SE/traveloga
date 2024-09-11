// src/pages/Auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth'; // Import the signInWithEmailAndPassword function
import { auth, realtimeDb } from '../../services/firebase'; // Import the auth instance
import { Form, Button, Alert, Spinner } from 'react-bootstrap';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError('');
      const userCredential  = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await user.reload();
      // Check if the email is verified
      if (user.emailVerified) {
        // Add user to the database with Temp_User role
        const userRef = realtimeDb.ref(`/users/${user.uid}`);
        userRef.once('value').then(snapshot => {
          const userData = snapshot.val();
          if (userData) {
            if (userData.role === 'Host') {
              alert("Please contact admin to become a host in Vagamon.");
            } else {
              alert(`Your role is: ${userData.role}`);
            }
          }
        });
        // Proceed with login
        alert("Login successful! Welcome to Traveloga.");
      } else {
        // Custom alert for unverified email
        alert("Your email is not verified. Please click OK to verify your account.");
        // Optionally, you can resend the verification email
        await sendEmailVerification(user);
        alert("Verification email resent. Please check your inbox.");
      }

      history('/');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-container">
      <h2 className="text-center mb-4">Login</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
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
            placeholder="Enter your password" 
          />
        </Form.Group>

        <Button className="w-100 mt-4" type="submit" disabled={loading}>
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Logging in...
            </>
          ) : (
            "Login"
          )}
        </Button>
      </Form>

      <div className="text-center mt-3">
        Don't have an account? <a href="/register">Sign Up</a>
      </div>
    </div>
  );
};

export default Login;
