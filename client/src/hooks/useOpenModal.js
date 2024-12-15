import { useState } from "react";

const useOpenModal = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
};
  return [handleOpenModal, isOpenModal];
};
export default useOpenModal;