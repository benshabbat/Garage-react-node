import { OpenModel, Form } from "..";
import { useReqService } from "./utilsCreate";
const ReqService = ({ handelClick, car, isOpen, user }) => {
  
  const { setFormData,onSubmit} =useReqService(handelClick, car, user) 

  return (
    <OpenModel
      comp={
        <Form
          setData={setFormData}
          title="Request Service"
          inputs={[
            // { name: "title", value: car?.numberPlate.toString() },
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
