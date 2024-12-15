const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

const validPass = (data) => {
  return PASS_REGEX.test(data);
};

export default validPass;