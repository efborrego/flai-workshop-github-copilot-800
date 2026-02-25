import React, { useState, useEffect } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    console.log('Users component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Users component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setUsers(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Users component: fetch error', err);
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
        <p className="fw-semibold">Loading users...</p>
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
        <h2>&#128100; Users</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">No users found.</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user._id || user.id || user.name}>
                    <td className="text-muted">{index + 1}</td>
                    <td><span className="fw-semibold">{user.name}</span></td>
                    <td>
                      <a href={`mailto:${user.email}`} className="link-primary">{user.email}</a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted text-end">
        <small>{users.length} user{users.length !== 1 ? 's' : ''} total</small>
      </div>
    </div>
  );
}

export default Users;
