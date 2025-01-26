const PHONE_REGEX = /^[0-9]{3}-[0-9]{3}-[0-9]{4}|[0-9]{3}[-][0-9]{7}|[0-9]{10}$/;
const validPhone = (data) => {
    if (
      (data?.length === 10 && +data) ||
      (data?.length === 11 && data.at(3) === "-")||
      (data?.length === 12 && data.at(3) === "-" && data.at(7) === "-")
    ) {
      return PHONE_REGEX.test(data);
    } else return false;
  };
export default validPhone;