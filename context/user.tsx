import { CredentialResponse, useGoogleLogin } from '@react-oauth/google';
import {
  createContext,
  ReactNode,
  useEffect,
  useState
} from "react";
import jwtDecode from 'jwt-decode'
import { useRouter } from 'next/router';


type User = {
  aud: string;
  azp: string;
  email: string;
  email_verified: boolean;
  exp: number;
  family_name: string;
  given_name: string;
  iat: number;
  iss: string;
  jti: string;
  name: string;
  nbf: number;
  picture: string;
  sub: string;
}


type UserContextDefaultType = {
  user: null | User;
  credential: null | CredentialResponse;
  setUser: (res: CredentialResponse) => any;
  clearUser: () => any;
}

const UserContextDefault: UserContextDefaultType = {
  user: null,
  credential: null,
  clearUser() { },
  setUser() { }
}

export const UserContext = createContext(UserContextDefault);

export const UserProvider = ({ children }: { children: ReactNode }) => {

  const [state, setState] = useState<UserContextDefaultType>(UserContextDefault);

  const setUser = (res: CredentialResponse) => {
    setState((current) => ({
      ...current,
      credential: res,
      user: jwtDecode(res.credential as string)
    }))
  }

  const clearUser = () => {
    setState((current) => ({
      ...current,
      credential: null,
      user: null
    }))
  }

  return <UserContext.Provider value={{
    ...state,
    setUser,
    clearUser,
  }} >{children}</UserContext.Provider>
}