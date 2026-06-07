import { createError } from "./error.js";

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 5000;

export const getPaginationParams = (req) => ({
  limit: Math.min(parseInt(req.query.limit) || DEFAULT_LIMIT, MAX_LIMIT),
  page: Math.max(parseInt(req.query.page) || 1, 1),
});

export const pickAllowed = (body, allowedFields) =>
  Object.fromEntries(Object.entries(body).filter(([k]) => allowedFields.includes(k)));

/**
 * Validates the populate param, then returns a paginated query result.
 * @param {import("mongoose").Model} Model
 * @param {import("express").Request} req
 * @param {string[]} allowedFields - Accepted populate values
 * @param {{ baseQuery?: object, selectFields?: string, populateSelect?: string }} opts
 */
export const getPaginatedWithPopulate = async (
  Model, req, allowedFields,
  { baseQuery = {}, selectFields = '', populateSelect = '' } = {}
) => {
  const type = req.query.populate;
  if (!allowedFields.includes(type))
    throw createError(400, `Invalid populate field. Allowed: ${allowedFields.join(', ')}`);
  const { limit, page } = getPaginationParams(req);
  const q = Model.find(baseQuery);
  if (selectFields) q.select(selectFields);
  if (populateSelect) q.populate(type, populateSelect);
  else q.populate(type);
  return q.skip((page - 1) * limit).limit(limit);
};
