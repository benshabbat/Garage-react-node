import "./address.css";
import React from "react";
import AddressLink from "./AddressLink";
const Address = () => {
  return (
    <div id="address">
      <AddressLink address={"Kfar Habad"} />
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27071.979232534148!2d34.872289022131426!3d31.988085836173862!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b542825c810d%3A0xc5cd04e8eacaac0d!2z15vXpNeoINeX15Ei15M!5e0!3m2!1siw!2sil!4v1683053048773!5m2!1siw!2sil"
        width="600"
        height="450"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        target="_blank" 
      ></iframe>
    </div>
  );
};

export default Address;
