import { Routes, Route, NavLink } from 'react-router-dom';

function NavBar() {
  return (
    <nav className="auth">
      <Routes>
        <Route
          path="/sign-up"
          element={
            <NavLink className="auth__link" to="/sign-in">
              Войти
            </NavLink>
          }
        >
          {' '}
        </Route>
        <Route
          path="/sign-in"
          element={
            <NavLink className="auth__link" to="/sign-up">
              Регестрация
            </NavLink>
          }
        >
          {' '}
        </Route>
        <Route
          path="/"
          element={
            <>
              <p className="auth__email">email</p>
              <button className="auth__button">Выйти</button>
            </>
          }
        >
          {' '}
        </Route>
      </Routes>
    </nav>
  );
}

export default NavBar;