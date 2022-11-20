import GoogleSignInButton from "../components/GoogleSignInButton";

export default function Login() {
  return <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }} >
    <span>
      <GoogleSignInButton redirectUrl={'/profile'} />
    </span>
  </div>
}