import { useEffect, useState } from 'react';
import classes from './Login.module.css';
import { useAuth } from '../hooks/use-auth';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoggedIn } = useAuth();

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await login(email, password);
  }

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/app', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <main className={classes.login}>
      <form className={classes.form} onSubmit={handleLogin}>
        <div className={classes.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={classes.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Button onClick={() => {}} type="submit" classType="primary">
            Login
          </Button>
        </div>
      </form>
    </main>
  );
}
