import React, { useState, useEffect } from 'react';

function RankBadge({ rank }) {
  const cls = rank === 1 ? 'rank-1' : rank === 2 ? 'rank-2' : rank === 3 ? 'rank-3' : 'rank-other';
  const label = rank === 1 ? '&#129351;' : rank === 2 ? '&#129352;' : rank === 3 ? '&#129353;' : String(rank);
  return (
    <span
      className={`rank-badge ${cls}`}
      dangerouslySetInnerHTML={{ __html: label }}
    />
  );
}

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    console.log('Leaderboard component: fetching from', apiUrl);
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard component: fetched data', data);
        const results = Array.isArray(data) ? data : data.results || [];
        setEntries(results);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Leaderboard component: fetch error', err);
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
        <p className="fw-semibold">Loading leaderboard...</p>
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
        <h2>&#129351; Leaderboard</h2>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-striped table-bordered table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">User</th>
                <th scope="col">Team</th>
                <th scope="col">Total Calories</th>
                <th scope="col">Score</th>
              </tr>
            </thead>
            <tbody>
              {entries.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-muted py-4">No leaderboard entries found.</td>
                </tr>
              ) : (
                entries.map((entry, index) => (
                  <tr key={entry._id || entry.id || index} className={index < 3 ? 'table-warning' : ''}>
                    <td><RankBadge rank={index + 1} /></td>
                    <td><span className="fw-semibold">{entry.user_name || entry.user}</span></td>
                    <td><span className="badge bg-primary me-1">{entry.team_name || 'N/A'}</span></td>
                    <td><span className="fw-semibold">{entry.total_calories ?? 0} kcal</span></td>
                    <td>
                      <span className="badge bg-danger rounded-pill fs-6">{entry.score}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card-footer text-muted text-end">
        <small>{entries.length} competitor{entries.length !== 1 ? 's' : ''}</small>
      </div>
    </div>
  );
}

export default Leaderboard;
