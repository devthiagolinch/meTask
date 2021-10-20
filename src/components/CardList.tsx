import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'

import checkImg from "../assets/images/check.svg";
import delteImg from "../assets/images/delete.svg";

type CardListProps = {
  key: string,
  title: string,
  description: string,
  authorId: string
}

export function CardList(props: CardListProps) {
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
            <img src={delteImg} alt="delete" />
          </div>
        </div>
    </div>
  )
}