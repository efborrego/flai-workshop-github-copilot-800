import React, { useState, useEffect } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    console.log('Teams component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Teams component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setTeams(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Teams component: fetch error', err);
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
        <p className="fw-semibold">Loading teams...</p>
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
        <h2>&#128101; Teams</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Team Name</th>
                <th scope="col">Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center text-muted py-4">No teams found.</td>
                </tr>
              ) : (
                teams.map((team, index) => {
                  const memberList = Array.isArray(team.members)
                    ? team.members.map((m) => (typeof m === 'object' ? (m.name || m.username || m.email) : m))
                    : [];
                  return (
                    <tr key={team._id || team.id || team.name}>
                      <td className="text-muted">{index + 1}</td>
                      <td><span className="fw-semibold">{team.name}</span></td>
                      <td>
                        {memberList.length > 0 ? (
                          memberList.map((member, i) => (
                            <span key={i} className="badge bg-secondary me-1">{member}</span>
                          ))
                        ) : (
                          <span className="text-muted fst-italic">No members</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted text-end">
        <small>{teams.length} team{teams.length !== 1 ? 's' : ''} total</small>
      </div>
    </div>
  );
}

export default Teams;
