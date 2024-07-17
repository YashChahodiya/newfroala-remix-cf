import React from "react";
import "./Popup.css";

interface PopupProps {
  show: boolean;
  onClose: () => void;
  content: React.ReactNode;
}

const Popup: React.FC<PopupProps> = ({ show, onClose, content }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="popup-close" onClick={onClose}>
          X
        </button>
        {content}
      </div>
    </div>
  );
};

export default Popup;
