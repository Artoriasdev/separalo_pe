import React from "react";
import ReactDOM from "react-dom";
import { Form } from "../Form/Form";
export const Modal = ({
  onKeyDown,
  modalRef,
  buttonRef,
  closeModal,
  history,
}) => {
  return ReactDOM.createPortal(
    <aside
      tag="aside"
      role="dialog"
      tabIndex="-1"
      aria-modal="true"
      className="modal-cover "
      onKeyDown={onKeyDown}
    >
      <div className="mini " ref={modalRef}>
        <div className="mini_content ">
          <button
            ref={buttonRef}
            aria-label="Close Modal"
            aria-labelledby="close-modal"
            className="_modal-close"
            onClick={closeModal}
          >
            <span id="close-modal" className="_hide-visual"></span>
            <svg className="_modal-close-icon" viewBox="0 0 40 40">
              <path d="M 10,10 L 30,30 M 30,10 L 10,30" />
            </svg>
          </button>
          <Form close={closeModal} history={history} />
        </div>
      </div>
    </aside>,
    document.body
  );
};

export default Modal;
