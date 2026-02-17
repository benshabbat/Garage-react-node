/**
 * Factory function to create standardized controller handlers
 * Reduces code duplication across all controllers
 * 
 * @param {Function} serviceMethod - The service method to call
 * @param {number} statusCode - HTTP status code to return on success (default: 200)
 * @param {string} successMessage - Optional success message instead of data
 * @returns {Function} Express middleware function
 */
export const createHandler = (serviceMethod, statusCode = 200, successMessage = null) => {
  return async (req, res, next) => {
    try {
      const result = await serviceMethod(req);
      
      // If successMessage is provided, return it instead of the result
      if (successMessage) {
        res.status(statusCode).json(successMessage);
      } else {
        res.status(statusCode).json(result);
      }
    } catch (err) {
      next(err);
    }
  };
};

/**
 * Creates a handler with a custom response check (e.g., 404 if not found)
 * 
 * @param {Function} serviceMethod - The service method to call
 * @param {Function} checkResponse - Function to validate the response
 * @param {number} statusCode - HTTP status code to return on success
 * @returns {Function} Express middleware function
 */
export const createHandlerWithCheck = (
  serviceMethod,
  checkResponse,
  statusCode = 200
) => {
  return async (req, res, next) => {
    try {
      const result = await serviceMethod(req);
      
      // Run custom check on the result
      const checkError = checkResponse(result);
      if (checkError) {
        return res.status(checkError.status).json({ message: checkError.message });
      }
      
      res.status(statusCode).json(result);
    } catch (err) {
      next(err);
    }
  };
};
