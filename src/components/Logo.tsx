import { Link } from 'react-router-dom';
import classes from './Logo.module.css';

function Logo() {
  return (
    <Link to="/">
      <img
        src="/travel-book-logo.png"
        alt="TravelBook logo"
        className={classes.logo}
      />
    </Link>
  );
}

export default Logo;
