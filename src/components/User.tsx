import { useAuth } from '../hooks/use-auth';
import Button from './Button';
import classes from './User.module.css';

function User() {
  const { user, logout } = useAuth();

  return (
    <div className={classes.user}>
      {user.photoURL && <img src={user.photoURL} alt={user.displayName} />}
      <span>Welcome, {user.displayName}</span>
      <Button classType="primary" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default User;
