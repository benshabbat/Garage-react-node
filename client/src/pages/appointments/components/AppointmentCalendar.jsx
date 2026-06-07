import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useAppointmentCalendar } from "../hooks/useAppointmentCalendar";

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
  getDay,
  locales: { "en-US": enUS },
});

const STATUS_COLORS = {
  confirmed: "#22c55e",
  pending: "#f59e0b",
  cancelled: "#ef4444",
};

const eventStyleGetter = (event) => ({
  style: {
    backgroundColor: STATUS_COLORS[event.resource?.status] ?? "#6b7280",
    borderRadius: "4px",
    border: "none",
    color: "#fff",
    fontSize: "0.8rem",
  },
});

const AppointmentCalendar = ({ appointments }) => {
  const { events } = useAppointmentCalendar(appointments);

  return (
    <div className="apt-calendar-wrapper">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        eventPropGetter={eventStyleGetter}
        views={["month", "week", "day"]}
        defaultView="month"
        popup
        tooltipAccessor={(e) => {
          const a = e.resource;
          return `${a.clientName} — ${a.email} — ${a.time} (${a.status})`;
        }}
      />
    </div>
  );
};

export default AppointmentCalendar;
