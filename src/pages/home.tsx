import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt, faPlus } from '@fortawesome/free-solid-svg-icons'

import meTaskLogo from "../assets/images/meTaskLogo.png";
import checkImg from "../assets/images/check.svg";
import delteImg from "../assets/images/delete.svg";

import '../styles/home.scss'
import { useHistory } from 'react-router';

export function Home(){
  const history = useHistory();

  function handleNewTask() {
    history.push('/new-task')
  }

  return (
    <div id="home-page">
      <div className="header">
        <img src={meTaskLogo} alt="Me Task Logo" />
        <div className="user-info">
          <p>Thiago Linchin</p>
          <img src="https://avatars.githubusercontent.com/u/79920937?v=4" alt="user avatar" />
        </div>
      </div>

      <div className="card-list">
        <div className="card">
          <img src={checkImg} alt="Task Done" className="checkBtn" />
          <div className="card-info">
            <strong>Pagar Cartao de credito</strong>
            <p>Nubank</p>
          </div>
          <div className="card-buttons">
            <FontAwesomeIcon icon={faPencilAlt} color="#737380" className="editBtn" />
            <img src={delteImg} alt="delete" />
          </div>
        </div>
      </div>

      <div className="plus-btn" onClick={handleNewTask}>
        <FontAwesomeIcon icon={faPlus} className="new-task" />
      </div>
    </div>
  )
}