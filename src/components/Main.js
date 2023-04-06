import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({
  cards,
  onCardClick,
  onCardDelete,
  onCardLike,
  onEditAvatar,
  onEditProfile,
  onAddPlace, }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__edit-avatar" onClick={onEditAvatar} />
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="Аватар профиля"
          />
          <div className="profile__info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__editor"
              type="button"
              aria-label="Редактировать"
              onClick={onEditProfile}
            />
            <p className="profile__description">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-mesto"
            type="button"
            aria-label="Добавить место"
            onClick={onAddPlace}
          />
        </div>
      </section>
      <section className="cards">
        <ul className="cards__container">
          {cards.map((card) => {
            return (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardDelete={onCardDelete}
                onCardLike={onCardLike}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;