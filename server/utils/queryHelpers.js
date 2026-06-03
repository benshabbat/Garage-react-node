const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 500;

export const getPaginationParams = (req) => ({
  limit: Math.min(parseInt(req.query.limit) || DEFAULT_LIMIT, MAX_LIMIT),
  page: Math.max(parseInt(req.query.page) || 1, 1),
});

export const pickAllowed = (body, allowedFields) =>
  Object.fromEntries(Object.entries(body).filter(([k]) => allowedFields.includes(k)));
