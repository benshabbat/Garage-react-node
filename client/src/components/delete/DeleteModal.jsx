import Delete from "./Delete";

const DeleteModal = ({
  useStore,
  selectedKey,
  isOpenKey,
  toggleKey,
  useHandlers,
  handlerKey,
  displayField,
  nameData,
}) => {
  const item = useStore((s) => s[selectedKey]);
  const isOpen = useStore((s) => s[isOpenKey]);
  const toggle = useStore((s) => s[toggleKey]);
  const handler = useHandlers()[handlerKey];
  return (
    <Delete
      deleteData={item?.[displayField]}
      handle={toggle}
      nameData={nameData}
      isOpen={isOpen}
      handleDelete={handler}
    />
  );
};

export default DeleteModal;
