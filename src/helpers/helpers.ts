// Is active path
export const checkIsActive = (path: string, pathname: string) => {
  return path === pathname;
};

// Is current user creator
export const isCurrentUserCreator = (
  userId: string,
  postUserId: string
): boolean => {
  return userId === postUserId;
};
