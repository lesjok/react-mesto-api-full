import { useState, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    setName("");
    setLink("");
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({name, link})
  }
  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm
      name="add-card"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Создать"
    >
      <input
        type="text"
        className="popup__style popup__style_type_name popup-add-card__input popup-add-card__input_type_name"
        id="mesto-input"
        name="name"
        placeholder="Название"
        required
        onChange={handleChangeName}
        value={name}
      />
      <span className="popup__error mesto-input-error"></span>
      <input
        type="url"
        className="popup__style popup__style_type_link popup-add-card__input popup-add-card__input_type_link"
        id="link-input"
        name="link"
        placeholder="Ссылка на картинку"
        onChange={handleChangeLink}
        value={link}
        required
      />
      <span className="popup__error link-input-error"></span>
    </PopupWithForm>
  );
}
export default AddPlacePopup;
