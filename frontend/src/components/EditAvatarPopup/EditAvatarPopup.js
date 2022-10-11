import { useRef } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm.js";

function EditAvatarPopup(props) {
const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({avatar: avatarRef.current.value});
  }

return (
  <PopupWithForm
    type="avatar"
    title="Обновить аватар"
    isOpen={props.isOpen}
    onClose={props.onClose}
    onSubmit={handleSubmit}
    isLoading={props.isLoading}
    buttonText="Сохранить"
  >
    <input
      type="url"
      className="popup__style"
      id="avatar-input"
      placeholder="Ссылка на картинку"
      name="avatar-url"
      ref={avatarRef}
      required
    />
    <span className="popup__error avatar-error"></span>
  </PopupWithForm>
);
}

export default EditAvatarPopup;