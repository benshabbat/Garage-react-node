const validUserIsExist = (data, users) => {
  const isExist = users?.some((user) => user?.username === data);
  return isExist
};
export default validUserIsExist;
