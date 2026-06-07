import { useMemo } from "react";

const appointmentToEvent = (a) => {
  const [hours, minutes] = (a.time || "09:00").split(":").map(Number);
  const start = new Date(a.date);
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start);
  end.setHours(hours + 1, minutes, 0, 0);
  return {
    id: a._id,
    title: `${a.clientName} (${a.status})`,
    start,
    end,
    resource: a,
  };
};

export function useAppointmentCalendar(appointments) {
  const events = useMemo(() => (appointments ?? []).map(appointmentToEvent), [appointments]);
  return { events };
}
