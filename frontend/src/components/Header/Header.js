import logo from "../../images/logo.svg";
import { Link } from 'react-router-dom';

function Header(props) {
  return (
    <header className="header">
      <Link to="/">
        <img src={logo} alt="лого" className="header__logo" />
      </Link>
      <nav className="header__nav">
        <p className="header__mail">{props.userData}</p>
        <Link className="header__link" to={props.headerLink || '/'} onClick={props.onClick}>
          {props.linkName}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
