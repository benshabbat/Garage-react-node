import { useRef } from "react";

export default function ModalDialog() {
  const dialog = useRef();

  dialog.current.showModal();

  return (
    <dialog ref={dialog}>
      <h1>Dialog</h1>

      <button>Close</button>
    </dialog>
  );
}
