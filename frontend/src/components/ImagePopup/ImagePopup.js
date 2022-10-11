import React from "react";
function ImagePopup({ card, onClose }) {
  return (
    <div
      className={
        card.opened ? "popup popup-photo popup_opened" : "popup popup-photo"
      }
    >
      <div className="popup-photo__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          src={card.src}
          alt={card.name}
          className="popup-photo__big-photo"
        />
        <p className="popup-photo__text">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
