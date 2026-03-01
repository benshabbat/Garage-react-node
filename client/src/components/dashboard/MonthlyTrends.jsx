import PropTypes from "prop-types";
import { useDashboardContext } from "../../pages/dashboard/DashboardContext";

/**
 * Renders a single bar chart for a trend dataset.
 */
const TrendChart = ({ title, data }) => {
  const max = Math.max(...data.map((i) => i.count));
  return (
    <div className="trend-chart">
      <h3>{title}</h3>
      <div className="chart-bars">
        {data.map((item, index) => (
          <div key={index} className="chart-bar-item">
            <div
              className="chart-bar"
              style={{ height: `${(item.count / max) * 100}%` }}
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
  );
};

TrendChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number.isRequired,
      _id: PropTypes.shape({
        month: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

/**
 * MonthlyTrends displays monthly trend charts for appointments and cars
 * Uses dashboard context to access data without props drilling
 */
const MonthlyTrends = () => {
  const { stats } = useDashboardContext();
  const { trends } = stats;

  const hasAppointments = trends.monthlyAppointments?.length > 0;
  const hasCars = trends.monthlyCars?.length > 0;

  if (!hasAppointments && !hasCars) return null;

  return (
    <section className="section">
      <h2>Monthly Trends (Last 6 Months)</h2>
      <div className="trends-grid">
        {hasAppointments && <TrendChart title="New Appointments" data={trends.monthlyAppointments} />}
        {hasCars && <TrendChart title="New Cars" data={trends.monthlyCars} />}
      </div>
    </section>
  );
};

export default MonthlyTrends;
