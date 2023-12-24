const ValidUser = (data, users) => {
  const isNotUserExist = users?.find((user) => user?.username === data);
  if (isNotUserExist) return true
  return false
};
export default ValidUser;
