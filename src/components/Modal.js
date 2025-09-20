import React from "react";
import "./Modal.css"; // スタイル用

function Modal({ children, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="close-btn" onClick={onClose}>
          ✕ 閉じる
        </button>
      </div>
    </div>
  );
}

export default Modal;
