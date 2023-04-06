function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_look ${card.isOpen ? 'popup_open' : ''}`}>
      <div className="popup__look-container">
        <button
          className="popup__btn-close popup__btn-close_image"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img className="popup__image" src={card.link} alt={card.name} />
        <p className="popup__caption">{card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;