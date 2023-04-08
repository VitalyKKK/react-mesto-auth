import logoHeader from '../images/header__logo.svg';
import NavBar from './NavBar';

function Header({ userEmail, handleLogout }) {
  return (
    <header className="header">
      <div className="header__container">
        <a href="#" className="header__logo-link">
          <img src={logoHeader} className="header__logo" alt="Логотип" />
        </a>
        <NavBar userEmail={userEmail} handleLogout={handleLogout} />
      </div>
    </header>
  );
}

export default Header;