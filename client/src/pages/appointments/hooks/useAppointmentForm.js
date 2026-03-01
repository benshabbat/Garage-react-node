import { useState } from "react";

const INITIAL_FORM = {
  user: '',
  clientName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  notes: '',
};

/**
 * Custom hook for managing appointment form state
 * @param {Array} users - List of all users for auto-fill
 * @returns {Object} Form state and handlers
 */
export const useAppointmentForm = (users) => {
  const [formData, setFormData] = useState(INITIAL_FORM);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Auto-fill details when a linked user is selected
    if (name === 'user' && value) {
      const selectedUser = users.find(u => u._id === value);
      if (selectedUser) {
        setFormData(prev => ({
          ...prev,
          user: value,
          clientName: selectedUser.username || prev.clientName,
          email: selectedUser.email || prev.email,
          phone: selectedUser.phone || prev.phone,
        }));
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const resetForm = () => setFormData(INITIAL_FORM);

  const prepareSubmitData = () => {
    const appointmentData = { ...formData };
    // Only include user field if a user is selected
    if (!appointmentData.user) {
      delete appointmentData.user;
    }
    return appointmentData;
  };

  return {
    formData,
    handleChange,
    resetForm,
    prepareSubmitData,
  };
};
