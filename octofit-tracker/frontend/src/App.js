import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="App">
      {/* ── Navigation ── */}
      <nav className="navbar navbar-expand-lg octofit-navbar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img src="/octofit-logo.svg" alt="OctoFit logo" className="brand-logo" />
            <span className="brand-name">Octo<span>Fit</span> Tracker</span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
            aria-controls="mainNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="mainNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/users">Users</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/teams">Teams</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/activities">Activities</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/leaderboard">Leaderboard</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')} to="/workouts">Workouts</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ── Page Content ── */}
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={
            <div className="octofit-hero text-center">
              <h1 className="display-5 fw-bold">&#127939; Welcome to OctoFit Tracker</h1>
              <p className="lead mt-3">
                Track activities, compete on the leaderboard, and crush your fitness goals.
              </p>
              <hr className="my-4 border-light opacity-25" />
              <div className="mt-3">
                <span className="badge-feature">&#128100; User Profiles</span>
                <span className="badge-feature">&#127939; Activity Logging</span>
                <span className="badge-feature">&#129351; Leaderboard</span>
                <span className="badge-feature">&#128170; Team Management</span>
                <span className="badge-feature">&#128197; Workout Suggestions</span>
              </div>
              <div className="mt-4">
                <NavLink to="/activities" className="btn btn-danger btn-lg me-2">Log Activity</NavLink>
                <NavLink to="/leaderboard" className="btn btn-outline-light btn-lg">View Leaderboard</NavLink>
              </div>
            </div>
          } />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
