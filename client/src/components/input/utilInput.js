export const useInputType = (i, setInputsType) => {
  switch (i?.name) {
    case "email":
      return setInputsType({
        title: "regex@gmail.com",
        errorMessage: "Your Email is wrong",
      });

    case "password":
      return setInputsType({
        title:
          "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
        errorMessage: "Your password is wrong",
      });

    case "phone":
      return setInputsType({
        title: "Number of phone must 050-1234567",
        errorMessage: "Your phone number is wrong",
      });

    case "numberPlate":
      return setInputsType({
        title: "Number of car must 00-000-00 OR 000-00-000",
        errorMessage: "Your Car number is wrong",
      });

    default:
      return setInputsType({ title: i?.title, errorMessage: i?.errorMessage });
  }
};
