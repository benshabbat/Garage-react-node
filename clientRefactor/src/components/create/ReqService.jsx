import { OpenModal, Form } from "..";
import { useReqService } from "./utilsCreate";

//TODO: to fix the bug of double click for send req the first click is an undefined
//TODO: Incorporate the related context
const ReqService = ({ handleClick, car, isOpen }) => {
  
  const { setFormData,onSubmit} =useReqService(handleClick, car) 

  return (
    <OpenModal
      comp={
        <Form
          setData={setFormData}
          title="Request Service"
          inputs={[
            { name: "title", value: car?.numberPlate.toString() },
            { name: "description" },
          ]}
          handleClick={handleClick}
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default ReqService;
