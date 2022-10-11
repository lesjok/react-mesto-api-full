import trash from "../../images/Trash.svg";
import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.elem.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `gallery-item__trash ${
    isOwn ? " " : "invisible"
  }`;
  const isLiked = props.elem.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = (`gallery-item__like ${isLiked ? "gallery-item__like-active" : ""}`);
  
  function handleCardClick() {
    props.onCardClick(props.elem);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.elem);
  }
  function handleLikeClick() {
    props.onCardLike(props.elem);
  }

  return (
    <li className="gallery-item">
      <img
        src={props.link}
        alt={props.name}
        className="gallery-item__img"
        onClick={handleCardClick}
      />
      <img
        src={trash}
        alt="корзина"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
      />
      <div className="gallery-item__text">
        <h2 className="gallery-item__name">{props.name}</h2>
        <button
          className={cardLikeButtonClassName}
          type="button"
          aria-label="Нравится"
          onClick={handleLikeClick}
        >
          <span className="gallery-item__count-of-likes">
            {props.elem.likes.length}
          </span>
        </button>
      </div>
    </li>
  );
}

export default Card;
