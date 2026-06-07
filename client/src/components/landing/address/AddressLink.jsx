import "./address.css";

const AddressLink = ({ address }) => {
  return (
    <a className="address" target="_blank" rel="noopener noreferrer" href={"https://maps.google.com/?q=" + address}>
      {address}
    </a>
  );
};

export default AddressLink;
