import { Routes, Route, NavLink } from 'react-router-dom';

function NavBar({ userEmail, handleLogout }) {
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
              <p className="auth__email">{userEmail}</p>
              <button className="auth__button" onClick={handleLogout}>
                Выйти
              </button>
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