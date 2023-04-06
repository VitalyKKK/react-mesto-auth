import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { name, link, likes } = card;
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `card__like ${isLiked && 'card__like_active'}`;

  function handleClick() {
    onCardClick(name, link);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <li className="card">
      <img
        className="card__image"
        onClick={handleClick}
        src={link}
        alt={name}
      />
      {isOwn && (
        <button
          className="card__remove"
          onClick={handleDeleteClick}
          type="button"
          aria-label="Удалить"
        ></button>
      )}
      <div className="card__info">
        <h2 className="card__description">{name}</h2>
        <div className="card__container">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
            aria-label="Нравится"
          ></button>
          <span className="card__like-counter">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;