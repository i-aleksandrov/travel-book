/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useReducer } from 'react';
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { app } from '../config';
import { AuthActionTypes } from '../models/auth-actions.model';
import type { User } from '../models/user.model';
import { useNavigate } from 'react-router-dom';

const auth = getAuth(app);

interface AuthContextType {
  user: User;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({
  user: {} as User,
  isLoggedIn: false,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

interface AuthState {
  user: User;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: {
    accessToken: '',
    email: '',
    emailVerified: false,
    uid: '',
    displayName: '',
    photoURL: '',
  },
  isLoggedIn: false,
};

function reducer(
  state: AuthState,
  action: { type: AuthActionTypes; payload: any }
) {
  switch (action.type) {
    case AuthActionTypes.signInSuccess:
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
      };
    case AuthActionTypes.signOutSuccess:
      return {
        ...state,
        user: {},
        isLoggedIn: false,
      };
    default:
      return state;
  }
}

function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [{ user, isLoggedIn }, dispatch] = useReducer<AuthState, any>(
    reducer,
    initialState
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({
          type: AuthActionTypes.signInSuccess,
          payload: user,
        });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  async function login(username: string, password: string) {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );
      dispatch({
        type: AuthActionTypes.signInSuccess,
        payload: credentials.user,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function logout() {
    try {
      await signOut(auth);
      dispatch({ type: AuthActionTypes.signOutSuccess });
      navigate('/', { replace: true });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthProvider, AuthContext };
