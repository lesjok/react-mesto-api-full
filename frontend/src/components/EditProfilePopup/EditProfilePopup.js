import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = useContext(CurrentUserContext);

  function handleChangeName(e) {
    setName(e.target.value);
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
      buttonText="Сохранить"
    >
      <input
        type="text"
        minLength="2"
        maxLength="40"
        className="popup__style popup__style_type_name"
        id="name-input"
        name="name"
        value={name || ""}
        onChange={handleChangeName}
        required
      />
      <span className="popup__error name-input-error"></span>
      <input
        type="text"
        minLength="2"
        maxLength="200"
        className="popup__style popup__style_type_about"
        id="about-input"
        name="about"
        value={description || ""}
        onChange={handleChangeDescription}
        required
      />
      <span className="popup__error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
