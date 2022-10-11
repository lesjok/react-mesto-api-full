import React, { useState, useEffect } from "react";
import "../index.css";
import Main from "./Main/Main.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import api from "../utils/Api";
import * as apiAuth from "../utils/ApiAuth.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext"
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup"
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login/Login.js";
import Register from "./Register/Register.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip/InfoTooltip.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [selectedCard, setSelectedCard] = useState({
    src: "",
    name: "",
    opened: false,
  });

  const [loggedIn, setLoggedIn] = useState(false);
  const [isPopupSuccessOpen, setisPopupSuccessOpen] = useState(false);
  const [isSuccess, setisSuccess] = useState(false);
  const history = useHistory();
  const [userData, setUserData] = useState({});
   
  function handlePopupSuccess(result) {
    setisSuccess(result);
    setisPopupSuccessOpen(true);
  }
  function closePopupSuccess() {
    setisPopupSuccessOpen(false);
  }

  function handleLogin(data) {
    apiAuth
      .authorize(data)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setLoggedIn(true);
          setUserData({
            'email': data.email,
          });
          history.push("/");
        } else {
          handlePopupSuccess(false);
          return;
        }
      })
      .catch((err) => {  
        console.log(err);
      });
  }

  function checkToken() {
    const token = localStorage.getItem("token");
    if (token) {
      apiAuth
        .getContent(token)
        .then((data) => {
          if (data) {
            const userData = {
              'email': data.data.email,
            };
            setUserData(userData);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          handlePopupSuccess(false);
          console.log(err);
        });
    }
  }

  function handleRegister(data) {
    apiAuth.register(data)
    .then((res) => {
      if (res.error) {
        handlePopupSuccess(false);
        history.push("/sign-up");
        return res;
      } else {
        handlePopupSuccess(true);
        history.push("/");
        return res;
      }     
    })
    .catch((err) => {
      handlePopupSuccess(false);
      console.log(err);
    })
  }

  function onSignOut() {
    localStorage.removeItem("token");
    setLoggedIn(false);
  }

  useEffect(() => {
    if (loggedIn) {
      api
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);
  useEffect(() => {
    if (loggedIn) {
      api
        .getUser()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
      checkToken();
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card)
      .then(() => {
        setCards((state) => state.filter((item) => item._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const closeAllPopups = () => {
    setisEditProfilePopupOpen(false);
    setIsAddPlacePopup(false);
    setisEditAvatarPopupOpen(false);
    setisPopupSuccessOpen(false);
    setSelectedCard({
      ...selectedCard,
      opened: false,
    });
  };

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }
  function handleAddPlaceClick() {
    setIsAddPlacePopup(true);
  }
  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard({ src: card.link, name: card.name, opened: true });
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .changeUserAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit(data) {
    setIsLoading(true);
    api
      .addCard(data)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .editUserInfo(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //закрытие всех попапов по esc
  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    selectedCard.opened;
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="container">
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              userData={userData.email}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              cards={cards}
              onClick={onSignOut}
              onCardDelete={handleCardDelete}
            />
            <Route path="/sign-up">
              <Register
                onRegister={handleRegister}
              />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={handleLogin} />
            </Route>
          </Switch>

          <InfoTooltip
            isOpen={isPopupSuccessOpen}
            onClose={closePopupSuccess}
            answer={isSuccess}
          />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
          />
          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;