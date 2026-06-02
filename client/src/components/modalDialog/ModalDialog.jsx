import { useRef, useEffect } from "react";

export default function ModalDialog() {
  const dialog = useRef();

  useEffect(() => {
    dialog.current?.showModal();
  }, []);

  return (
    <dialog ref={dialog}>
      <h1>Dialog</h1>
      <button onClick={() => dialog.current?.close()}>Close</button>
    </dialog>
  );
}
