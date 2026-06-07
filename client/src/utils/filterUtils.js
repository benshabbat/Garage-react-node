/**
 * Car filter function for search — shared by admin Cars table and user My Cars table.
 * Includes owner.username so admins can filter by owner name.
 */
export const carFilterFn = (item, value) =>
  item.owner?.username?.includes(value) ||
  item.numberPlate?.includes(value) ||
  item.km?.toString().includes(value) ||
  item.brand?.includes(value);
