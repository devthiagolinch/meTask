import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import '../styles/cardList.scss'

import deleteImg from "../assets/images/delete.svg";
import { database } from '../services/firebase';
import { ReactNode } from 'react';

type CardListProps = {
  id: string,
  title: string,
  description: string,
  authorId: string,
  children: ReactNode
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
         {props.children}
          <div className="card-info">
            <strong>{props.title}</strong>
            <p>{props.description}</p>
          </div>
          <div className="card-buttons">
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