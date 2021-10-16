import { Button } from "../components/Button";

import meTaskLogo from '../assets/images/meTaskLogo.png'
import deleteImg from '../assets/images/delete.svg';
import arrowImg from '../assets/images/arrow.svg';

import '../styles/new-task.scss'
import { useHistory } from "react-router";

export function NewTask() {
  const history = useHistory();

  function handleBackHome() {
    history.push('/home')
  }

  return (
    <div id="new-task-page">
      <div className="header">
        <img src={arrowImg} alt="voltar" className="arrowBack" onClick={handleBackHome} />
        <p>Nova Task</p>
        <img src={meTaskLogo} alt="metask Logo" className="logo" />
      </div>

      <div className="main">
        <div className="input-area">
          <input type="text" placeholder="Nova Task" className="task-input" />
          <input type="text" placeholder="Descreva a Task" className="task-description" />
        </div>
        <div className="card">
          <p> Para adicionar uma nova Task
              Digite as informações ao lado
          </p>
          <div className="buttons">
            <Button>Salvar</Button>
            <img src={deleteImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}