import { AppointmentsContext } from "./AppointmentsContext";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAppointments,
  createAppointment as createAppointmentAction,
  updateAppointment as updateAppointmentAction,
  deleteAppointment,
  updateAppointmentStatus,
} from "../../features/appointments/appointmentSlice";
import { getUser } from "../../features/user/userSlice";
import { getUsers } from "../../features/admin/adminSlice";
import useOpenModal from "../../hooks/useOpenModal";
import useFilteredData from "../../hooks/useFilteredData";
import axiosConfig from "../../axiosConfig";
import PropTypes from "prop-types";

export default function AppointmentsProvider({ children }) {
  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state) => state.appointments);
  const { user } = useSelector((state) => state.auth);
  const { cars: userCars } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.admin);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [formData, setFormData] = useState(null);
  const [services, setServices] = useState([]);
  const [availableCars, setAvailableCars] = useState([]);
  const [loadingCars, setLoadingCars] = useState(false);

  const [handleManageAppointment, isOpenManageAppointment] = useOpenModal();
  const [handleCreateAppointment, isOpenCreateAppointment] = useOpenModal();
  const [handleEditAppointment, isOpenEditAppointment] = useOpenModal();
  const [handleDeleteAppointment, isOpenDeleteAppointment] = useOpenModal();

  // Filter appointments
  const appointmentFilterFn = useCallback(
    (item, value) =>
      item.user?.firstName?.toLowerCase().includes(value.toLowerCase()) ||
      item.user?.lastName?.toLowerCase().includes(value.toLowerCase()) ||
      item.car?.numberPlate?.toLowerCase().includes(value.toLowerCase()) ||
      item.car?.brand?.toLowerCase().includes(value.toLowerCase()) ||
      item.service?.name?.toLowerCase().includes(value.toLowerCase()) ||
      item.status?.toLowerCase().includes(value.toLowerCase()),
    []
  );

  const {
    displayData: displayAppointments,
    handleSearch,
    setFilteredData: setFilteredAppointments,
  } = useFilteredData(appointments, appointmentFilterFn);

  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch, isOpenManageAppointment, isOpenCreateAppointment, isOpenEditAppointment, isOpenDeleteAppointment]);

  // Fetch services and users/cars on mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axiosConfig.get('/services');
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();

    // Fetch users or user cars based on role
    if (user?.isAdmin) {
      dispatch(getUsers());
    } else {
      dispatch(getUser());
    }
  }, [dispatch, user]);

  // Update available cars when formData.user changes (for admin) or use userCars for regular users
  useEffect(() => {
    if (user?.isAdmin && formData?.user) {
      const fetchUserCars = async () => {
        setLoadingCars(true);
        try {
          const response = await axiosConfig.get(`/cars/user/${formData.user}`);
          setAvailableCars(response.data);
        } catch (error) {
          console.error('Error fetching user cars:', error);
          setAvailableCars([]);
        } finally {
          setLoadingCars(false);
        }
      };
      fetchUserCars();
    } else if (!user?.isAdmin && userCars) {
      setAvailableCars(userCars);
    } else if (!user?.isAdmin) {
      setAvailableCars([]);
    }
  }, [formData?.user, user, userCars]);

  const handleAppointmentAction = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    const appointment = appointments.find((app) => app._id === value);
    setSelectedAppointment(appointment);

    switch (name) {
      case "editAppointment":
        handleEditAppointment();
        break;
      case "deleteAppointment":
        handleDeleteAppointment();
        break;
      default:
        handleManageAppointment();
    }
  };

  const useCreateAppointment = () => {
    useEffect(() => {
      if (isOpenCreateAppointment) {
        setFormData({
          user: user?.isAdmin ? '' : user?._id,
          car: '',
          service: '',
          appointmentDate: '',
          notes: ''
        });
      }
    }, [isOpenCreateAppointment]);

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        await dispatch(createAppointmentAction(formData)).unwrap();
        alert('Appointment created successfully!');
        handleCreateAppointment();
      } catch (error) {
        alert(error || 'Error creating appointment');
      }
    };
    
    return { onSubmit, setFormData, formData };
  };

  const useEditAppointment = () => {
    useEffect(() => {
      if (isOpenEditAppointment && selectedAppointment) {
        setFormData({
          appointmentDate: selectedAppointment.appointmentDate
            ? new Date(selectedAppointment.appointmentDate).toISOString().slice(0, 16)
            : "",
          notes: selectedAppointment.notes || "",
          status: selectedAppointment.status || "scheduled",
        });
      }
    }, [isOpenEditAppointment, selectedAppointment]);

    const onSubmit = async (e) => {
      e.preventDefault();
      try {
        await dispatch(updateAppointmentAction({ 
          id: selectedAppointment._id, 
          data: formData 
        })).unwrap();
        alert('Appointment updated successfully!');
        handleEditAppointment();
      } catch (error) {
        alert(error || 'Error updating appointment');
      }
    };
    
    return { onSubmit, setFormData, formData };
  };

  const useDeleteAppointment = async (e) => {
    e.preventDefault();
    const { name } = e.target;
    if (name === "deleteAppointment" && selectedAppointment) {
      await dispatch(deleteAppointment(selectedAppointment._id));
      handleDeleteAppointment();
      setFilteredAppointments((appointments) =>
        appointments.filter((app) => app._id !== selectedAppointment._id)
      );
    }
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    dispatch(updateAppointmentStatus({ id: appointmentId, status: newStatus }));
  };

  const value = {
    useDeleteAppointment,
    useEditAppointment,
    useCreateAppointment,
    appointments,
    displayAppointments,
    selectedAppointment,
    handleAppointmentAction,
    handleSearch,
    handleStatusChange,
    status,
    user,
    users,
    services,
    availableCars,
    loadingCars,
    modals: {
      manageAppointment: {
        isOpen: isOpenManageAppointment,
        handle: handleManageAppointment,
      },
      createAppointment: {
        isOpen: isOpenCreateAppointment,
        handle: handleCreateAppointment,
      },
      editAppointment: {
        isOpen: isOpenEditAppointment,
        handle: handleEditAppointment,
      },
      deleteAppointment: {
        isOpen: isOpenDeleteAppointment,
        handle: handleDeleteAppointment,
      },
    },
  };

  return (
    <AppointmentsContext.Provider value={value}>
      {children}
    </AppointmentsContext.Provider>
  );
}

AppointmentsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
