import { useState } from "react";

const useOpenModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handelOpenModal = () => {
    setIsOpenModal(!isOpenModal);
};
  // return { handelOpenModal, isOpenModal };
  return [handelOpenModal, isOpenModal];
};
export default useOpenModal;