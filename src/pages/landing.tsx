import meTaskLogo from "../assets/images/meTaskLogo.png";
import googleLogo from "../assets/images/google-icon.svg";

import { Button } from "../components/Button";

import '../styles/landing.scss';

export function Landing(){
  return (
    <div id="lading-page">
      <div className="login-content">
        <img src={meTaskLogo} alt="" />
        <Button>
          <img src={googleLogo} alt="Google Logo" />
          Faça login com a Google
        </Button>
      </div>
    </div>
  );
};