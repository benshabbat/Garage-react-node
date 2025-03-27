import { useSelector } from "react-redux";

const useValidUserIsExist = (data) => {
  const { users } = useSelector((state) => state.admin);
  const isExist = users?.some((user) => user?.username === data);
  return isExist;
};
export default useValidUserIsExist;
