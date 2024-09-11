// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './components/Home';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import HostPage from './pages/hostsPage/Hostpage';
import ResortList from './pages/resortsPage/ResortsPage';
import RestaurantsList from './pages/restaurantsPage/RestaurantsPage';
import PlacesList from './pages/placesPage/PlacesPage';
import JeepSafariList from './pages/jeepSafari/JeepSafariPage';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './pages/Auth/contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Sidebar />  {/* Sidebar component for navigation */}
          <Container className="mt-4">
            <Routes>
              {/* Public Routes */}
              <Route path="/" exact element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              {/* Private/Protected Routes */}
              <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} />} />
              <Route path="/host" element={<PrivateRoute element={<HostPage />} />} />
              <Route path="/resorts" element={<ResortList />} />
              <Route path="/restaurants" element={<RestaurantsList />} />
              <Route path="/places" element={<PlacesList />} />
              <Route path="/jeepsafari" element={<JeepSafariList />} />

              {/* Redirect all unknown routes to home */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Container>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
