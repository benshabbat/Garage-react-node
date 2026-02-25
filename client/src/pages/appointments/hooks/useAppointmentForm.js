import { useState } from "react";

/**
 * Custom hook for managing appointment form state
 * @param {Array} users - List of all users for auto-fill
 * @returns {Object} Form state and handlers
 */
export const useAppointmentForm = (users) => {
  const [formData, setFormData] = useState({
    user: '',
    clientName: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-fill email and phone if user is selected
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
      }
    }
  };

  const resetForm = () => {
    setFormData({
      user: '',
      clientName: '',
      email: '',
      phone: '',
      date: '',
      time: '',
      notes: ''
    });
  };

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
