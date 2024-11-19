import "./appointment.css"

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAppointments } from '../features/appointments/appointmentSlice';
import AppointmentForm from "./AppointmentForm"

const Calendar = () => {
  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state) => state.appointments);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchAppointments());
    }
  }, [status, dispatch]);

  // יצירת מערך של ימי החודש
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();
    
    const days = [];
    // ימים ריקים מהחודש הקודם
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    // ימי החודש הנוכחי
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  // מציאת התורים ליום מסוים
  const getAppointmentsForDate = (date) => {
    if (!date) return [];
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return (
        appointmentDate.getDate() === date.getDate() &&
        appointmentDate.getMonth() === date.getMonth() &&
        appointmentDate.getFullYear() === date.getFullYear()
      );
    });
  };

  // מעבר לחודש הבא/קודם
  const changeMonth = (increment) => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + increment, 1));
    setSelectedDate(null);
  };

  const weekDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
  const months = [
    'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
    'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
  ];

  return (
    <div className="calendar-wrapper">
      <AppointmentForm/>
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)}>&lt;</button>
        <h2>{months[currentDate.getMonth()]} {currentDate.getFullYear()}</h2>
        <button onClick={() => changeMonth(1)}>&gt;</button>
      </div>

      <div className="calendar-grid">
        {weekDays.map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}

        {getDaysInMonth(currentDate).map((date, index) => (
          <div
            key={index}
            className={`calendar-day ${date && selectedDate && date.getTime() === selectedDate.getTime() ? 'selected' : ''} 
                       ${date && getAppointmentsForDate(date).length > 0 ? 'has-appointments' : ''}`}
            onClick={() => date && setSelectedDate(date)}
          >
            {date && (
              <>
                <span className="day-number">{date.getDate()}</span>
                {getAppointmentsForDate(date).length > 0 && (
                  <div className="appointment-dot"></div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {selectedDate && (
        <div className="appointments-list">
          <h3>תורים ל-{selectedDate.toLocaleDateString('he-IL')}</h3>
          {getAppointmentsForDate(selectedDate).length > 0 ? (
            getAppointmentsForDate(selectedDate).map((appointment) => (
              <div key={appointment._id} className="appointment-card">
                <div className="appointment-time">
                  {new Date(appointment.date).toLocaleTimeString('he-IL', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="appointment-details">
                  <p className="client-name">{appointment.clientName}</p>
                  <p className="client-email">{appointment.email}</p>
                </div>
                <div className={`appointment-status ${appointment.status}`}>
                  {appointment.status}
                </div>
              </div>
            ))
          ) : (
            <p className="no-appointments">אין תורים להיום</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Calendar;