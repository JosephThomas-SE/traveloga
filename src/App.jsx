// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Home from './components/Home';
import AdminDashboard from './pages/adminDashboard/AdminDashboard';
import HostPage from './pages/hostsPage/Hostpage';
import ResortList from './pages/resortsPage/ResortsPage';
import RestaurantsList from './pages/restaurantsPage/RestaurantsPage';
import PlacesList from './pages/placesPage/PlacesPage';
import JeepSafariList from './pages/jeepSafari/JeepSafariPage';
import DetailsPage from './pages/DetailsPage'; // Import your details page
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './pages/Auth/contexts/AuthContext';
import { SidebarProvider } from './services/SidebarContext'; // Adjust path if necessary


const App = () => {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Router>
          <div className="app">
            <Sidebar />  {/* Sidebar component for navigation */}
              <Routes>
                {/* Public Routes */}
                <Route path="/" exact element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Private/Protected Routes */}
                <Route path="/admin" element={<PrivateRoute element={<AdminDashboard />} />} />
                <Route path="/host" element={<PrivateRoute element={<HostPage />} />} />
                <Route path="/resorts/*" element={<ResortList />} />
                <Route path="/restaurants/*" element={<RestaurantsList />} />
                <Route path="/places/*" element={<PlacesList />} />
                <Route path="/jeepsafari/*" element={<JeepSafariList />} />
                <Route path="/details/:id" element={<DetailsPage />} /> {/* Details page route */}

                {/* Redirect all unknown routes to home */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
          </div>
        </Router>
      </SidebarProvider>
    </AuthProvider>
  );
};

export default App;
