export function templatePhone(phone) {
  if (phone.length === 10) {
    phone = phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6);
  }
  if (phone.length === 11 && phone[4] === "-") {
    phone = phone.slice(0, 3) + "-" + phone.slice(4, 7) + "-" + phone.slice(7);
  }

  return phone;
}

export function templateCar(car) {
  if (car.length === 8) {
    return car.slice(0, 3) + "-" + car.slice(3, 5) + "-" + car.slice(5);
  } else if (car.length === 7) {
    return car.slice(0, 2) + "-" + car.slice(2, 5) + "-" + car.slice(5);
  }
}
