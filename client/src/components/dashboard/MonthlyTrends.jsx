import PropTypes from "prop-types";
import { useDashboardContext } from "../../pages/dashboard/DashboardContext";

/**
 * Renders a single bar chart for a trend dataset.
 * @param {string}   valueKey  - key in each data item holding the numeric value (default: "count")
 * @param {function} formatValue - optional formatter for the bar label
 */
const TrendChart = ({ title, data, valueKey = "count", formatValue }) => {
  const getValue = (item) => item[valueKey] ?? 0;
  const max = Math.max(...data.map(getValue), 1);
  return (
    <div className="trend-chart">
      <h3>{title}</h3>
      <div className="chart-bars">
        {data.map((item, index) => {
          const val = getValue(item);
          return (
            <div key={index} className="chart-bar-item">
              <div
                className="chart-bar"
                style={{ height: `${(val / max) * 100}%` }}
              >
                <span className="bar-value">
                  {formatValue ? formatValue(val) : val}
                </span>
              </div>
              <span className="bar-label">
                {item._id.month}/{item._id.year}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

TrendChart.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.shape({
        month: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  valueKey: PropTypes.string,
  formatValue: PropTypes.func,
};

/**
 * MonthlyTrends displays monthly trend charts for appointments, cars, and revenue.
 */
const MonthlyTrends = () => {
  const { stats } = useDashboardContext();
  const { trends } = stats;

  const hasAppointments = trends.monthlyAppointments?.length > 0;
  const hasCars = trends.monthlyCars?.length > 0;
  const hasRevenue = trends.monthlyRevenue?.length > 0;

  if (!hasAppointments && !hasCars && !hasRevenue) return null;

  return (
    <section className="section">
      <h2>Monthly Trends (Last 6 Months)</h2>
      <div className="trends-grid">
        {hasAppointments && (
          <TrendChart title="New Appointments" data={trends.monthlyAppointments} />
        )}
        {hasCars && (
          <TrendChart title="New Cars" data={trends.monthlyCars} />
        )}
        {hasRevenue && (
          <TrendChart
            title="Revenue (₪)"
            data={trends.monthlyRevenue}
            valueKey="revenue"
            formatValue={(v) => `₪${v.toLocaleString()}`}
          />
        )}
      </div>
    </section>
  );
};

export default MonthlyTrends;
