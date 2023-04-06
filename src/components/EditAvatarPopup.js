import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const refAvatar = React.useRef()

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: refAvatar.current.value,
    });
  }

  React.useEffect(() => {
    if(isOpen) {
      refAvatar.current.value = '';
    }
  }, [isOpen]); 
  
  return (
    <PopupWithForm
      name={'avatar'}
      title={'Обновить аватар'}
      btnText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={refAvatar}
        className="popup__input popup__input_avatar"
        type="url"
        id="avatar"
        name="avatar"
        placeholder="Ссылка на картинку"
        required 
        autoComplete="off"
      />
      <span className="popup__error" id="avatar-error" />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;