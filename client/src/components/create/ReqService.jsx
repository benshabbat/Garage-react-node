import { ModalForm } from "..";
import { useAccountUIStore } from "../../stores/uiStores";
import { useAccountHandlers } from "../../pages/account/hooks/useAccountHandlers";

const ReqService = () => {
  const selectedCar = useAccountUIStore((s) => s.selectedCar);
  const reqServiceOpen = useAccountUIStore((s) => s.reqServiceOpen);
  const toggleReqService = useAccountUIStore((s) => s.toggleReqService);
  const { useReqService } = useAccountHandlers();
  const { setFormData, onSubmit } = useReqService();

  return (
    <ModalForm
      isOpen={reqServiceOpen}
      onClose={toggleReqService}
      onSubmit={onSubmit}
      setFormData={setFormData}
      title="Request Service"
      inputs={[
        { name: "title", type: "text", value: selectedCar?.numberPlate?.toString() },
        { name: "description", type: "text" },
      ]}
    />
  );
};

export default ReqService;
