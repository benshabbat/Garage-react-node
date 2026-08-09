/**
 * Access decisions for a guarded route, kept separate from the component so the
 * rules can be unit tested without rendering.
 */
export const ACCESS = {
  LOADING: "loading",
  ALLOW: "allow",
  REQUIRE_LOGIN: "requireLogin",
  REQUIRE_ADMIN: "requireAdmin",
};

/**
 * @param {{ user: object|null, isLoading?: boolean, adminOnly?: boolean }} params
 * @returns {string} one of the ACCESS values
 */
export const resolveRouteAccess = ({ user, isLoading = false, adminOnly = false }) => {
  if (isLoading) return ACCESS.LOADING;
  if (!user) return ACCESS.REQUIRE_LOGIN;
  if (adminOnly && !user.isAdmin) return ACCESS.REQUIRE_ADMIN;
  return ACCESS.ALLOW;
};
