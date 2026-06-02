import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
import adminReducer from "../features/admin/adminSlice";
import appointmentReducer from "../features/appointments/appointmentSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
    appointments: appointmentReducer,
    dashboard: dashboardReducer,
  },
});
