import meTaskLogo from "../assets/images/meTaskLogo.png";
import googleLogo from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import '../styles/landing.scss';
import { useAuth } from "../hooks/useAuth";
import { useHistory } from "react-router";
import { useEffect } from "react";

export function Landing(){
  const history = useHistory();
  const {user, signInWithGoogle} = useAuth();

  async function handleLoginWithGoogle(){
    if(!user){
      await signInWithGoogle()
    }
    history.push('/home');
  }

  // Depois do logout esta pagina sera regarregada para apagar os dados
  useEffect(() => {
    const timer = setInterval(() => {
      if (user) {
        window.location.reload();
      }
    }, 100);
    return () => clearInterval(timer);
  }, []);

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