import React from 'react';
import unsuccess from '../images/unsuccess.svg';
import success from '../images/success.svg';

function InfoTooltip({ 
  isOpen,
  containerName,
  onClose,
  isSuccess }) {
  return (
    <div className={`popup ${isOpen ? 'popup_open' : ''}`}>
      <div className={`popup__container ${containerName}`}>
        <button
          className={`popup__btn-close popup__btn-close_remove`}
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <img
          className="popup__image-info"
          src={isSuccess ? success : unsuccess}
          alt="#"
        />
        <h2 className="popup__title-info">
          {isSuccess
            ? 'Вы успешно зарегестрировались!'
            : 'Что-то пошло не так! Порпробуйте еще раз.'}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;