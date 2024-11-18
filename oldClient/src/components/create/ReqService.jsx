import { OpenModel, Form } from "..";
import { useReqService } from "./utilsCreate";

//TODO: to fix the bug of double click for send req the first click is an undefined
const ReqService = ({ handelClick, car, isOpen }) => {
  
  const { setFormData,onSubmit} =useReqService(handelClick, car) 

  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Request Service"
          inputs={[
            { name: "title", value: car?.numberPlate.toString() },
            { name: "description" },
          ]}
          handelClick={handelClick}
          onSubmit={onSubmit}
        />
      }
      isOpen={isOpen}
    />
  );
};

export default ReqService;
