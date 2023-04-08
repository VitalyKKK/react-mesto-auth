import { useState } from 'react';
import AuthForm from './AuthForm';

function Login({ onSignin }) {
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
    onSignin({ email, password });
  }

  return (
    <AuthForm title="Вход" onSubmit={handleSubmt}>
      <input
        className="authform__input"
        type="email"
        placeholder="Email"
        onChange={handleChangeEmail}
      />
      <input
        className="authform__input"
        type="password"
        placeholder="Пароль"
        onChange={handleChangePassword}
      />
      <button className="authform__button">Войти</button>
    </AuthForm>
  );
}

export default Login;