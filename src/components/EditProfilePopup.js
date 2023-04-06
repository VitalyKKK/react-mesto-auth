import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState('');
  const [about, setAbout] = React.useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeAbout(e) {
    setAbout(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about
    });
  }

  return (
    <PopupWithForm
      name={'profile'}
      title={'Редактировать профиль'}
      btnText={'Сохранить'}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_profile"
        type="text"
        id="name"
        name="name"
        placeholder="Имя"
        required
        autoComplete="off"
        minLength={2}
        maxLength={40}
        onChange={handleChangeName}
        value={name || ''}
      />
      <span className="popup__error" id="name-error"> </span>
      <input
        className="popup__input popup__input_profile"
        type="text"
        id="description"
        name="about"
        placeholder="Вид деятельности"
        required
        autoComplete="off"
        minLength={2}
        maxLength={200}
        onChange={handleChangeAbout}
        value={about || ''}
      />
      <span className="popup__error" id="description-error"></span>
    </PopupWithForm>
  )
}

export default EditProfilePopup;