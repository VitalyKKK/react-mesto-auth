import { useState } from 'react';
import AuthForm from './AuthForm';
import { Link } from 'react-router-dom';

function Register({ onSignup }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmt(e) {
    e.preventDefault();
    onSignup({ email, password });
  }

  return (
    <AuthForm title="Регистрация" onSubmit={handleSubmt}>
      <input
        className="authform__input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={handleChangeEmail}
      />
      <input
        className="authform__input"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={handleChangePassword}
      />
      <button className="authform__button">Зарегестрироваться</button>
      <p className="authform__text">
        Уже зарегистрированы?{' '}
        <Link to="/sign-in" className="authform__link">
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}

export default Register;