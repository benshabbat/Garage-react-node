import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../../features/dashboard/dashboardSlice";
import "./Dashboard.css";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { stats, fetchState } = useSelector((state) => state.dashboard);
  const { isLoading, isError, message } = fetchState;

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  if (isLoading) {
    return <div className="dashboard-container">
      <div className="loading">Loading data...</div>
    </div>;
  }

  if (isError) {
    return <div className="dashboard-container">
      <div className="error">Error: {message}</div>
    </div>;
  }

  if (!stats) {
    return <div className="dashboard-container">
      <div className="loading">No data available - loading...</div>
    </div>;
  }

  if (!stats.overview) {
    return <div className="dashboard-container">
      <div className="error">Error: Invalid data structure received</div>
      <div style={{ marginTop: '1rem', fontSize: '0.9rem', color: '#666' }}>
        Please check the server logs or contact support
      </div>
    </div>;
  }

  const { overview, appointments, messages, trends, topServices } = stats;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Overview Stats */}
      <section className="stats-overview">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>Users</h3>
            <p className="stat-number">{overview.totalUsers}</p>
            <small>Admins: {overview.adminCount} | Regular: {overview.regularUserCount}</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <div className="stat-info">
            <h3>Cars</h3>
            <p className="stat-number">{overview.totalCars}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔧</div>
          <div className="stat-info">
            <h3>Services</h3>
            <p className="stat-number">{overview.totalServices}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>Appointments</h3>
            <p className="stat-number">{overview.totalAppointments}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-info">
            <h3>Messages</h3>
            <p className="stat-number">{overview.totalMessages}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>Reviews</h3>
            <p className="stat-number">{overview.totalReviews}</p>
            <small>Average: {overview.averageRating}</small>
          </div>
        </div>
      </section>

      {/* Appointments by Status */}
      {appointments.byStatus && appointments.byStatus.length > 0 ? (
        <section className="section">
          <h2>Appointments by Status</h2>
          <div className="status-grid">
            {appointments.byStatus.map((item) => (
              <div key={item._id} className="status-item">
                <span className="status-label">{item._id || "Not Set"}</span>
                <span className="status-count">{item.count}</span>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="section">
          <h2>Appointments by Status</h2>
          <div className="empty-state">No status data available</div>
        </section>
      )}

      {/* Top Services */}
      {topServices && topServices.length > 0 && (
        <section className="section">
          <h2>Available Services</h2>
          <div className="services-list">
            {topServices.map((service) => (
              <div key={service._id} className="service-item">
                <div className="service-name">{service.name}</div>
                <div className="service-details">
                  <span className="service-price">₪{service.price}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Appointments */}
      {appointments.recent && appointments.recent.length > 0 ? (
        <section className="section">
          <h2>Recent Appointments</h2>
          <div className="table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>Client Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Notes</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.recent.map((appointment) => (
                  <tr key={appointment._id}>
                    <td className="client-name">{appointment.clientName || "Unknown"}</td>
                    <td className="email-cell">{appointment.email || "N/A"}</td>
                    <td className="phone-cell">{appointment.phone || "N/A"}</td>
                    <td>{new Date(appointment.date).toLocaleDateString("en-US", { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                    <td className="time-cell">{appointment.time}</td>
                    <td className="notes-cell">{appointment.notes ? (appointment.notes.length > 40 ? appointment.notes.substring(0, 40) + '...' : appointment.notes) : 'None'}</td>
                    <td>
                      <span className={`status-badge ${appointment.status}`}>
                        {appointment.status || "pending"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="section">
          <h2>Recent Appointments</h2>
          <div className="empty-state">No appointments to display</div>
        </section>
      )}

      {/* Recent Messages */}
      {messages.recent && messages.recent.length > 0 ? (
        <section className="section">
          <h2>Recent Messages</h2>
          <div className="table-container">
            <table className="dashboard-table">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Subject</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {messages.recent.map((message) => (
                  <tr key={message._id}>
                    <td>{message.from?.name || message.from?.email || "System"}</td>
                    <td>{message.to?.name || message.to?.email || "User"}</td>
                    <td className="message-title">{message.title || "No Subject"}</td>
                    <td className="message-desc">{message.description ? (message.description.length > 50 ? message.description.substring(0, 50) + '...' : message.description) : 'N/A'}</td>
                    <td>
                      <span className={`status-badge ${message.read ? 'completed' : 'pending'}`}>
                        {message.read ? 'Read' : 'Unread'}
                      </span>
                    </td>
                    <td>{new Date(message.createdAt).toLocaleDateString("en-US")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ) : (
        <section className="section">
          <h2>Recent Messages</h2>
          <div className="empty-state">No messages to display</div>
        </section>
      )}

      {/* Monthly Trends */}
      {(trends.monthlyAppointments?.length > 0 || trends.monthlyCars?.length > 0) && (
        <section className="section">
          <h2>Monthly Trends (Last 6 Months)</h2>
          <div className="trends-grid">
            {trends.monthlyAppointments?.length > 0 && (
              <div className="trend-chart">
                <h3>New Appointments</h3>
                <div className="chart-bars">
                  {trends.monthlyAppointments.map((item, index) => (
                    <div key={index} className="chart-bar-item">
                      <div
                        className="chart-bar"
                        style={{
                          height: `${(item.count / Math.max(...trends.monthlyAppointments.map(i => i.count))) * 100}%`
                        }}
                      >
                        <span className="bar-value">{item.count}</span>
                      </div>
                      <span className="bar-label">
                        {item._id.month}/{item._id.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {trends.monthlyCars?.length > 0 && (
              <div className="trend-chart">
                <h3>New Cars</h3>
                <div className="chart-bars">
                  {trends.monthlyCars.map((item, index) => (
                    <div key={index} className="chart-bar-item">
                      <div
                        className="chart-bar"
                        style={{
                          height: `${(item.count / Math.max(...trends.monthlyCars.map(i => i.count))) * 100}%`
                        }}
                      >
                        <span className="bar-value">{item.count}</span>
                      </div>
                      <span className="bar-label">
                        {item._id.month}/{item._id.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
