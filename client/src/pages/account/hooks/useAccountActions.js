import { createReqService } from "../../../api/services/messageApi";

const extractErrorMessage = (err) => err?.response?.data?.message ?? err?.message ?? String(err);

/**
 * Custom hook for account service operations
 * @param {Object} selectedCar - Currently selected car
 * @param {Object} user - Current user
 * @returns {Object} Service operation functions
 */
export const useAccountActions = (selectedCar, user) => {
  
  /**
   * Create a service request
   */
  const onSubmitReqService = async (e, formData, handleReqService) => {
    e.preventDefault();
    try {
      const requestData = {
        ...formData,
        title: selectedCar?.numberPlate.toString(),
        from: user?._id,
      };
      await createReqService(requestData);
      handleReqService();
    } catch (err) {
      throw new Error(extractErrorMessage(err));
    }
  };

  return {
    onSubmitReqService,
  };
};
