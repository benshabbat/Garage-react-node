
const ValidPhone = (data) => {
    // debugger;
    if (data?.length === 11 ) {
      for (let i = 0; i < data.length; i++) {
       if (data?.length === 11) {
          if (i === 3 && data[i] === "-") {
            i++;
          }
          if (+data[i]) {
            return true;
          }
        } else {
          return false;
        }
      }
    }
  
    if (data?.length === 10 && +data) {
      return true;
    } else {
      return false;
    }
  };
  export default ValidPhone;