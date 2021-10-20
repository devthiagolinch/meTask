import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { VscSignOut } from 'react-icons/vsc';
import { auth } from '../services/firebase';

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
        {myTasks.map(task => {
          return (
            <CardList
              key={task.id}
              id={task.id}
              title={task.title}
              description={task.description}
              authorId={task.author.id}
            />
          )
        })}
      </div>

      <div className="plus-btn" onClick={handleNewTask}>
        <FontAwesomeIcon icon={faPlus} className="new-task" />
      </div>
    </div>
  )
}

