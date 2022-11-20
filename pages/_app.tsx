import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '../context/user'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useRouter } from 'next/router';
import MainAppLayout from '../layout/MainAppLayout';

export default function App({ Component, pageProps }: AppProps) {


  const router = useRouter()

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_OAUTH_CLIENT_ID as string}>
      <UserProvider>
        {
          router.pathname == "/login"
            ? <Component {...pageProps} />
            : <MainAppLayout>
              <Component {...pageProps} />
            </MainAppLayout>
        }
      </UserProvider>
    </GoogleOAuthProvider>
  )
}
