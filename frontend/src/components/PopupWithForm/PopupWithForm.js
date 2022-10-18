function PopupWithForm({
  isOpen,
  onClose,
  name,
  title,
  children,
  onSubmit,
  isLoading,
  buttonText,
}) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__text">{title}</h2>
        <form
          name={name}
          className={`form popup-${name}__form`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__submit popup__save-button" type="submit">
            {isLoading ? "Сохранение..." : buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
