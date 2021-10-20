import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import '../styles/cardList.scss'

import checkImg from "../assets/images/check.svg";
import deleteImg from "../assets/images/delete.svg";
import { database } from '../services/firebase';

type CardListProps = {
  id: string,
  title: string,
  description: string,
  authorId: string
}

export function CardList(props: CardListProps) {

  async function handleDeleteTask(taskId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`tasks/${taskId}`).remove();
    }
  }
  
  return (
    <div className="card-list">
        <div className="card">
          <img src={checkImg} alt="Task Done" className="checkBtn" />
          <div className="card-info">
            <strong>{props.title}</strong>
            <p>{props.description}</p>
          </div>
          <div className="card-buttons">
            <FontAwesomeIcon icon={faPencilAlt} color="#737380" className="editBtn" />
            <button
                  type="button"
                  onClick={() => handleDeleteTask(props.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
          </div>
        </div>
    </div>
  )
}