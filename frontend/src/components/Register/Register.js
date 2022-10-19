import Header from "../Header/Header.js";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function Register (props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onRegister({
      email,
      password
    });
  }

  return (
    <>
      <Header linkName="Войти" headerLink="/sign-in" />
      <section className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            placeholder="Email"
            value={email}
            type="email"
            id="email"
            name="email"
            onChange={handleChangeEmail}
          />
          <input
            className="auth__input"
            placeholder="Пароль"
            value={password}
            type="password"
            id="password"
            name="password"
            onChange={handleChangePassword}
          />
          <button className="auth__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <p className="auth__note">
          Уже зарегистрированы?{" "}
          <Link className="auth__link" to="/sign-in">
            Войти
          </Link>
        </p>
      </section>
    </>
  );
  };
export default Register;
