
import { useRouter } from "next/router"
import useUser from "../hooks/useUser"
import { GoogleLogin, CredentialResponse } from '@react-oauth/google';
export default function GoogleSignInButton({ redirectUrl = "" }) {

  const router = useRouter()
  const { setUser } = useUser()

  const onSuccess = (res: CredentialResponse) => {
    setUser(res);
    router.push(redirectUrl)
  }

  const onError = () => {
    alert('Login Failed');
  }

  return <div>
    <GoogleLogin
      onSuccess={onSuccess}
      onError={onError}
      login_uri={"/login"}
    />
  </div>
}