import { Outlet } from 'react-router-dom';
import AppNav from './AppNav';
import Logo from './Logo';
import classes from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={classes.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={classes.footer}>
        <p className={classes.copyright}>
          &copy; Copyright {new Date().getFullYear()} TravelBook
        </p>
      </footer>
    </div>
  );
}
