import logoHeader from '../images/header__logo.svg';

function Header() {
  return (
    <header className="header">
      <div className="header__container">
        <a href="#" className="header__logo-link">
          <img src={logoHeader} className="header__logo" alt="Логотип" />
        </a>
        <NavBar />
      </div>
    </header>
  );
}

export default Header;