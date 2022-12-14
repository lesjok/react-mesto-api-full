import { useState, useEffect } from "react";
import "../index.css";
import Main from "./Main/Main.js";
import ImagePopup from "./ImagePopup/ImagePopup.js";
import api from "../utils/Api.js";
import {CurrentUserContext} from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.js";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "./Login/Login.js";
import Register from "./Register/Register.js";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute.js";
import InfoTooltip from "./InfoTooltip/InfoTooltip.js";
import registerApi from "../utils/ApiAuth.js";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = useState(false);
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
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
    registerApi
    .authorize(data)
    .then((res) => {
      setLoggedIn(true);
      history.push("/");
    })
    .catch((err) => {  
      console.log(err);
      handlePopupSuccess(false);
    });
  }

  function checkToken() {
    registerApi
    .getContent('')
    .then((data) => {
      if (data) {
        console.log(data);
        const userData = {
          'email': data.email,
        };
        setUserData(userData);
        setLoggedIn(true);
        history.push("/");
      }
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    checkToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleRegister(data) {
    registerApi.register(data)
    .then((res) => {
      handlePopupSuccess(true);
      history.push('/sign-in');
      return res;   
    })
    .catch((err) => {
      handlePopupSuccess(false);
      console.log(err.name);
    })
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

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
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
    .deleteCard(card._id)
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

  function onSignOut() {  
    registerApi
    .signOut()
    history.push('/sign-in');
    setLoggedIn(false);
  }

  //???????????????? ???????? ?????????????? ???? esc
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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