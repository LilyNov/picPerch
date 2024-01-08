export const checkIsActive = (path: string, pathname: string) => {
  return path === pathname;
};

export const isCurrentUserCreator = (
  userId: string,
  postUserId: string
): boolean => {
  return userId === postUserId;
};
