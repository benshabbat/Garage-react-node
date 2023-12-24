import { useState } from "react";

const useOpenModel = () => {
  const [isOpenModel, setIsOpenModel] = useState(false);
  const handelOpenModel = (e) => {
    setIsOpenModel(!isOpenModel);
};
  // return { handelOpenModel, isOpenModel };
  return [handelOpenModel, isOpenModel];
};
export default useOpenModel;