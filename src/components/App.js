import React, { useCallback } from 'react';
import Header from './Header.js';
import Footer from './Footer.js';
import Main from './Main.js';
import ImagePopup from './ImagePopup.js';
import '../index.css';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditAvatarPopup from './EditAvatarPopup';
import EditProfilePopup from './EditProfilePopup';
import AddPlacePopup from './AddPlacePopup ';
import api from '../utils/Api';
import { Route, Routes } from 'react-router-dom';
import Login from './Login.js';
import Register from './Register.js';
import ProtectedRouteElement from './ProtectedRoute';
import { useNavigate } from "react-router-dom";
import { authApi } from '../utils/authApi.js';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = React.useState('');
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [isInfoTooltipSuccess, setIsInfoTooltipSuccess] = React.useState(false);
 
  const tokenCheck = useCallback(() => {
    const token = localStorage.getItem('token');

    if (token) {
      authApi
        .checkToken(token)
        .then(({ data }) => {
          setLoggedIn(true);
          setUserEmail(data.email);
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(false);
    }
  }, []);

  React.useEffect(() => {
    tokenCheck();
    loggedIn && Promise.all([api.getUserInfo(), api.getInitialCards()])
      .then(([userData, cardsData]) => {
        setCurrentUser(userData);
        setCards(cardsData);
      })
      .catch((err) => {
        console.log(err);
      });
    }, [loggedIn])

    function handleLogout() {
      setLoggedIn(false);
      setUserEmail('');
      localStorage.removeItem('token');
      navigate('/sign-in', { replace: true });
    }

    function handleRegister(data) {
      authApi
        .registerUser(data)
        .then(() => {
          setIsInfoTooltipOpen(true);
          setIsInfoTooltipSuccess(true);
          navigate('/sign-in', { replace: true });
        })
        .catch((err) => {
          console.log(err);
          setIsInfoTooltipOpen(true);
          setIsInfoTooltipSuccess(false);
        });
    }

    function handleLogin(data) {
      authApi
        .loginUser(data)
        .then(({ token }) => {
          localStorage.setItem('token', token);
          setLoggedIn(true);
          setUserEmail(data.email);
          navigate('/', { replace: true });
        })
        .catch((err) => {
          console.log(err);
          setIsInfoTooltipOpen(true);
          setIsInfoTooltipSuccess(false);
        });
    }

  function handleUpdateAvatar(avatar) {
    api
      .setAvatar(avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .toggleLikeCard(card._id, isLiked)
      .then((newCard) => {
        setCards(cards.map((c) => (c._id === newCard._id ? newCard : c)));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .addNewCard(data)
      .then((dataPlace) => {
        setCards([dataPlace, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleCardClick(name, link) {
    setSelectedCard({ name, link, isOpen: true });
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({ ...selectedCard, isOpen: false });
    setIsInfoTooltipOpen(false);
  }

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.isOpen ||
    isInfoTooltipOpen;

  React.useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header userEmail={userEmail} handleLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRouteElement
              element={Main}
              loggedIn={loggedIn}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardDelete={handleCardDelete}
              onCardLike={handleCardLike}
              cards={cards}
            />
          }
        />
        <Route
          path="/sign-up"
          element={<Register onSignup={handleRegister} />}
        />
        <Route path="/sign-in" element={<Login onSignin={handleLogin} />} />
      </Routes>

      <Footer />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar}
      />
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit}
      />
      <PopupWithForm
        title={'Вы уверены?'}
        name={'remove'}
        btnText={'Да'}
        isOpen={''}
      ></PopupWithForm>
      <InfoTooltip
        name
        isOpen={isInfoTooltipOpen}
        isSuccess={isInfoTooltipSuccess}
        onClose={closeAllPopups}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;