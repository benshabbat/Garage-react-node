import { useState } from "react";

const useOpenModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handelOpenModel = () => {
    setIsOpenModal(!isOpenModal);
};
  // return { handelOpenModel, isOpenModel };
  return [handelOpenModel, isOpenModal];
};
export default useOpenModal;