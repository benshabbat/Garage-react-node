import { useDashboardContext } from "../../pages/dashboard/DashboardContext";

/**
 * MonthlyTrends displays monthly trend charts for appointments and cars
 * Uses dashboard context to access data without props drilling
 */
const MonthlyTrends = () => {
  const { stats } = useDashboardContext();
  const { trends } = stats;

  const hasAppointments = trends.monthlyAppointments?.length > 0;
  const hasCars = trends.monthlyCars?.length > 0;

  if (!hasAppointments && !hasCars) {
    return null;
  }

  const getMaxCount = (data) => Math.max(...data.map((i) => i.count));

  return (
    <section className="section">
      <h2>Monthly Trends (Last 6 Months)</h2>
      <div className="trends-grid">
        {hasAppointments && (
          <div className="trend-chart">
            <h3>New Appointments</h3>
            <div className="chart-bars">
              {trends.monthlyAppointments.map((item, index) => (
                <div key={index} className="chart-bar-item">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${(item.count / getMaxCount(trends.monthlyAppointments)) * 100}%`,
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

        {hasCars && (
          <div className="trend-chart">
            <h3>New Cars</h3>
            <div className="chart-bars">
              {trends.monthlyCars.map((item, index) => (
                <div key={index} className="chart-bar-item">
                  <div
                    className="chart-bar"
                    style={{
                      height: `${(item.count / getMaxCount(trends.monthlyCars)) * 100}%`,
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
  );
};

export default MonthlyTrends;
