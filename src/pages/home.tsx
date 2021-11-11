import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { VscSignOut } from 'react-icons/vsc';
import { auth, database } from '../services/firebase';

import meTaskLogo from "../assets/images/meTaskLogo.png";

import '../styles/home.scss'

import { useHistory } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useTask } from '../hooks/useTask';
import { CardList } from '../components/CardList';


export function Home(){
  const history = useHistory();
  const {user} = useAuth();
  const {myTasks} = useTask();

  function handleNewTask() {
    history.push('/new-task')
  }

  async function handleLikeQuestion(taskId: string, doneId: string | undefined) {
    if (doneId) {
      await database.ref(`tasks/${taskId}/done/${doneId}`).remove()
    } else {
      await database.ref(`tasks/${taskId}/done`).push({
        authorId: user?.id,
      })
    }
  }

  async function SignOutGoogle() {
    await auth.signOut().then(() => {
      window.caches.delete('user');
      history.push('/')
    })
  }

  return (
    <div id="home-page">
      <div className="header">
        <img src={meTaskLogo} alt="Me Task Logo" />
        <div className="user-info">
          <p>{user?.name}</p>
          <img src={user?.avatar} alt="user avatar" className="profile-image" />
            <VscSignOut size={25} className="signOut" onClick={SignOutGoogle} />
        </div>
      </div>

      <div className="card-list">
        {myTasks.map((task) => {
          if(user?.id === task.authorId /* && !task.doneId */) {
            return (
              <CardList
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                authorId={task.author.id}
              >
                <button className={`checkBtn ${task.doneId ? 'doned' : ''}`} onClick={() => handleLikeQuestion(task.id, task.doneId)}>
                <svg width="75" height="75" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12.0003" cy="11.9998" r="9.00375" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M8.44287 12.3391L10.6108 14.507L10.5968 14.493L15.4878 9.60193" stroke="#737380" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>

                </button>
              </CardList>
            )
          }
          
        })}
      </div>

      <div className="plus-btn" onClick={handleNewTask}>
        <FontAwesomeIcon icon={faPlus} className="new-task" />
      </div>
    </div>
  )
}

