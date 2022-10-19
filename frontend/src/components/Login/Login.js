import Header from "../Header/Header.js";
import React, { useState } from "react";


function Login (props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState("");

  function handleChangeEmail(event) {
    setEmail(event.target.value)
  }

  function handleChangePass(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onLogin({
      email,
      password
    })
    setEmail('');
    setPassword('');
  }
  return (
    <>
      <Header linkName="Регистрация" headerLink="/sign-up" />
      <section className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
          <input
            className="auth__input"
            placeholder="Email"
            id="Email"
            required
            name="email"
            type="email"
            value={email}
            onChange={handleChangeEmail}
          />
          <input
            className="auth__input"
            placeholder="Пароль"
            id="password"
            required
            name="password"
            type="password"
            value={password}
            onChange={handleChangePass}
          />
          <button className="auth__button" type="submit">
            Войти
          </button>
        </form>
      </section>
    </>
  );
};
export default Login;
