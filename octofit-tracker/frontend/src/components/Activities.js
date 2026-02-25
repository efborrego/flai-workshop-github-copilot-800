import React, { useState, useEffect } from 'react';

const ACTIVITY_ICONS = {
  running: '🏃',
  cycling: '🚴',
  swimming: '🏊',
  yoga: '🧘',
  weightlifting: '🏋️',
};

function activityIcon(type) {
  if (!type) return '🏃';
  const key = type.toLowerCase();
  return ACTIVITY_ICONS[key] || '⚡';
}

function formatDate(dateStr) {
  if (!dateStr) return '—';
  // Parse as local date by splitting to avoid UTC offset shifting the day
  const [year, month, day] = dateStr.split('-').map(Number);
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setActivities(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Activities component: fetch error', err);
        setError(err.message);
        setLoading(false);
      });
  }, [apiUrl]);

  if (loading) {
    return (
      <div className="octofit-spinner-wrapper">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="fw-semibold">Loading activities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger d-flex align-items-center mt-4" role="alert">
        <i className="me-2">&#9888;</i>
        <div><strong>Error:</strong> {error}</div>
      </div>
    );
  }

  return (
    <div className="card octofit-card">
      <div className="card-header">
        <h2>&#127939; Activities</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">User</th>
                <th scope="col">Activity Type</th>
                <th scope="col">Duration (min)</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">No activities found.</td>
                </tr>
              ) : (
                activities.map((activity, index) => (
                  <tr key={activity._id || activity.id}>
                    <td className="text-muted">{index + 1}</td>
                    <td><span className="fw-semibold">{activity.user_name || activity.user}</span></td>
                    <td>
                      <span>{activityIcon(activity.activity_type)}</span>{' '}
                      <span className="badge bg-primary">{activity.activity_type}</span>
                    </td>
                    <td>
                      <span className="badge bg-success rounded-pill">{activity.duration} min</span>
                    </td>
                    <td>{formatDate(activity.date)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted text-end">
        <small>{activities.length} activit{activities.length !== 1 ? 'ies' : 'y'} total</small>
      </div>
    </div>
  );
}

export default Activities;
