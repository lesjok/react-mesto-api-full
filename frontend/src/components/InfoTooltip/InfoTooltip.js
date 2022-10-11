import successIcon from "../../images/success.svg";
import unSuccessIcon from "../../images/unsuccess.svg";

const InfoTooltip = (props) => {
  return (
    <div className={`popup ${props.isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={props.onClose}
        ></button>
        <img
          src={props.answer ? successIcon : unSuccessIcon}
          alt={props.answer ? "Успех" : "Ошибка"}
        />
        <p className="popup__answer">
          {props.answer
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  );
}
export default InfoTooltip;