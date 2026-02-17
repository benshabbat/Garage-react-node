import { ModalForm } from "..";
import { useAccountContext } from "../../pages/account/AccountContext";

const ReqService = () => {
  const { selectedCar, isOpenReqService, handleReqService, useReqService } =
    useAccountContext();
  const { setFormData, onSubmit } = useReqService();

  return (
    <ModalForm
      isOpen={isOpenReqService}
      onClose={handleReqService}
      onSubmit={onSubmit}
      setFormData={setFormData}
      title="Request Service"
      inputs={[
        { name: "title", type: "text", value: selectedCar?.numberPlate.toString() },
        { name: "description", type: "text" },
      ]}
    />
  );
};

export default ReqService;
