import { OpenModal, Form } from "..";
import { useAccountContext } from "../../pages/account/AccountContext";

const ReqService = () => {
  const { selectedCar, isOpenReqService, handleReqService, useReqService } =
    useAccountContext();
  const { setFormData, onSubmit } = useReqService();

  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Request Service"
          inputs={[
            { name: "title", value: selectedCar?.numberPlate.toString() },
            { name: "description" },
          ]}
          handleClick={handleReqService}
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpenReqService}
    />
  );
};

export default ReqService;
