function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  containerName,
  btnText,
  onSubmit, }) {

  return (
    <div className={`popup popup_${name} ${isOpen ? 'popup_open' : ''}`}>
      <div className={`popup__container ${containerName}`}>
        <button
          className={`popup__btn-close popup__btn-close_${name}`}
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        />
        <h2 className="popup__title-name">{title}</h2>
        <form
          className={`popup__form popup__form_${name}`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__btn" type="submit">
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;