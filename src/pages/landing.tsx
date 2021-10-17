import meTaskLogo from "../assets/images/meTaskLogo.png";
import googleLogo from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import '../styles/landing.scss';
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router";

export function Landing(){
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();

  async function handleLoginWithGoogle(){
    if(!user){
      await signInWithGoogle()
    }
    history.push('/home');
  }

  return (
    <div id="lading-page">
      <div className="login-content">
        <img src={meTaskLogo} alt="" />
        <Button onClick={handleLoginWithGoogle}>
          <img src={googleLogo} alt="Google Logo" />
          Faça login com a Google
        </Button>
      </div>
    </div>
  );
};