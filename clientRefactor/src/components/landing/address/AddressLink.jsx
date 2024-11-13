import "./address.css"
// import { BiMap } from "react-icons/bi";
const AddressLink = ({ address }) => {
  return (
    <a
      className="address"
      target="_blank"
      href={"https://maps.google.com/?q=" + address}
    >
      {/* <BiMap className="h-6" /> */}
      {address}
    </a>
  );
};

export default AddressLink;