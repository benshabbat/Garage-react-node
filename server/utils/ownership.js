import Car from "../models/Car.js";
import { createError } from "./error.js";

const FORBIDDEN = "You are not authorized to access this resource";

/**
 * Normalises an ObjectId, a populated document or a string into a plain id string.
 */
export const toId = (ref) => (ref ? (ref._id ?? ref).toString() : null);

/**
 * Throws 403 unless the caller is an admin or is the referenced owner.
 * Use this for resources keyed by their own id, where the route param says
 * nothing about who owns the record.
 */
export const assertOwnerOrAdmin = (ownerRef, user) => {
  if (user?.isAdmin) return;
  if (!user?.id || toId(ownerRef) !== user.id) {
    throw createError(403, FORBIDDEN);
  }
};

/**
 * Same check, for resources that belong to a car rather than directly to a user.
 */
export const assertCarOwnerOrAdmin = async (carRef, user) => {
  if (user?.isAdmin) return;
  const car = await Car.findById(toId(carRef)).select("owner").lean();
  if (!car) throw createError(404, "Car not found");
  assertOwnerOrAdmin(car.owner, user);
};
