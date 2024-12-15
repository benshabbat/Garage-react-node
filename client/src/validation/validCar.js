const CAR_REGEX =
  /^[0-9]{3}[-][0-9]{2}[-][0-9]{3}|[0-9]{2}[-][0-9]{3}[-][0-9]{2}|[0-9]{7,8}$/;

const validCar = (data) => {
  if (
    ((data?.length === 8 || data?.length === 7) && +data) ||
    (data?.length === 10 && data.at(3) === "-" && data.at(6) === "-") ||
    (data?.length === 9 && data.at(2) === "-" && data.at(6) === "-")
  ) {
    return CAR_REGEX.test(data);
  } else return false;
};

export default validCar;
