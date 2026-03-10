import React, { useState } from 'react';

type Meeting = {
  id: string;
  title: string;
  timeRange: string;
  dateLabel: string;
  participants: string[];
  extraParticipants?: string;
  status: 'sent' | 'pending' | 'scheduled';
  statusLabel: string;
  statusDetail?: string;
};

const mockMeetings: Meeting[] = [
];

export const Dashboard: React.FC = () => {
  const [meetings] = useState<Meeting[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncClick = () => {
    setIsSyncing(true);
    // à brancher plus tard sur une API de synchronisation Google OAuth
    window.setTimeout(() => {
      setIsSyncing(false);
    }, 600);
  };

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-mark">CO</div>
          <div>
            <div className="sidebar-title">CloseOS Meet Rappel</div>
            <div className="sidebar-subtitle">Google Workspace Sync</div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item nav-item--active">Dashboard</button>
          <button className="nav-item">Upcoming Calls</button>
          <button className="nav-item">Automation Settings</button>
          <button className="nav-item">History</button>
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item">Profile</button>
          <div className="storage-card">
            <div className="storage-header">
              <span>Storage Usage</span>
              <span className="storage-percentage">85%</span>
            </div>
            <div className="storage-bar">
              <div className="storage-bar-fill" />
            </div>
            <div className="storage-caption">of sync quota used</div>
          </div>
        </div>
      </aside>

      <main className="main">
        <header className="topbar">
          <div className="search-wrapper">
            <input
              className="search-input"
              placeholder="Search meetings or participants..."
            />
          </div>
          <div className="topbar-right">
            <div className="user-pill">
              <div className="user-avatar">CO</div>
              <div>
                <div className="user-name">Mon compte</div>
                <div className="user-plan">Rappels Meet</div>
              </div>
            </div>
          </div>
        </header>

        <section className="content">
          <div className="content-header">
            <div>
              <h1 className="page-title">My Upcoming Calls</h1>
              <p className="page-subtitle">
                Manage your Google Meet schedule and automated communications.
              </p>
            </div>
            <div className="content-header-actions">
              <button
                className="btn btn-secondary"
                onClick={handleSyncClick}
                disabled={isSyncing}
              >
                {isSyncing ? 'Syncing…' : 'Sync Now'}
              </button>
              <button className="btn btn-primary">+ New Meeting</button>
            </div>
          </div>

          <div className="stats-row">
            <div className="stat-card">
              <div className="stat-label">Total Calls Today</div>
              <div className="stat-value">{meetings.length}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Automated Reminders</div>
              <div className="stat-value">0</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Next Sync</div>
              <div className="stat-value">—</div>
            </div>
          </div>

          <div className="layout-row">
            <section className="card calendar-card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Calendar Schedule</h2>
                  <p className="card-subtitle">
                    Live from Google Calendar
                  </p>
                </div>
              </div>

              <div className="table">
                <div className="table-header">
                  <div>Meeting Details</div>
                  <div>Participants</div>
                  <div>Automation Status</div>
                  <div className="table-actions-header">Actions</div>
                </div>
                <div className="table-body">
                  {meetings.length === 0 ? (
                    <div className="table-row table-row--empty">
                      <div className="meeting-cell">
                        <div className="meeting-title">
                          Aucune réunion à venir.
                        </div>
                        <div className="meeting-meta">
                          Cliquez sur « Sync Now » une fois la connexion
                          Google configurée.
                        </div>
                      </div>
                      <div />
                      <div />
                      <div className="actions-cell" />
                    </div>
                  ) : (
                    meetings.map((meeting) => (
                      <div key={meeting.id} className="table-row">
                        <div className="meeting-cell">
                          <div className="meeting-title">{meeting.title}</div>
                          <div className="meeting-meta">
                            <span>{meeting.dateLabel}</span>
                            <span className="dot">•</span>
                            <span>{meeting.timeRange}</span>
                          </div>
                          {meeting.statusDetail && (
                            <div className="meeting-submeta">
                              {meeting.statusDetail}
                            </div>
                          )}
                        </div>
                        <div className="participants-cell">
                          <div className="avatar-stack">
                            {meeting.participants.map((initials) => (
                              <div key={initials} className="avatar">
                                {initials}
                              </div>
                            ))}
                            {meeting.extraParticipants && (
                              <div className="avatar avatar--more">
                                {meeting.extraParticipants}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="status-cell">
                          <span
                            className={`status-pill status-pill--${meeting.status}`}
                          >
                            {meeting.statusLabel}
                          </span>
                        </div>
                        <div className="actions-cell">
                          <button
                            className="icon-button"
                            aria-label="Send email"
                          >
                            ✉️
                          </button>
                          <button className="btn btn-small btn-outline">
                            Join Meet
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <button className="link-button">View All Upcoming Calls</button>
            </section>

            <section className="side-column">
              <div className="card automation-card">
                <h2 className="card-title">Automation Rules Status</h2>
                <div className="automation-item">
                  <div className="automation-icon">⏰</div>
                  <div>
                    <div className="automation-title">
                      Reminder 24h Before
                    </div>
                    <div className="automation-subtitle">
                      Sends an email reminder with agenda link 1 day prior.
                    </div>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="switch-slider" />
                  </label>
                </div>
              </div>

              <div className="card promo-card">
                <h2 className="promo-title">Automate more tasks</h2>
                <p className="promo-text">
                  Unlock AI-powered meeting summaries and CRM auto-sync.
                </p>
                <button className="btn btn-light">Explore Pro Features</button>
              </div>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
};

