import { useHistory } from "react-router";
import { FormEvent, useState } from "react";

import { Button } from "../components/Button";

import meTaskLogo from '../assets/images/meTaskLogo.png'
import deleteImg from '../assets/images/delete.svg';
import arrowImg from '../assets/images/arrow.svg';

import '../styles/new-task.scss'

import { database } from "../services/firebase";
import { useAuth } from '../hooks/useAuth';

export function NewTask() {
  const history = useHistory();
  const { user } = useAuth();
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');

  function handleBackHome() {
    history.push('/home')
  }
  
  async function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if(newTask.trim() === '') {
      return;
    }

    const task = {
      title: newTask,
      description: newTaskDescription,
      author: {
        id: user?.id,
        name: user?.name,
        avatar: user?.avatar
      }
    }

    await database.ref(`tasks/`).push(task);

    setNewTask('');
    setNewTaskDescription('');

    history.push(`/home`)
  }

  return (
    <div id="new-task-page">
      <div className="header">
        <img src={arrowImg} alt="voltar" className="arrowBack" onClick={handleBackHome} />
        <p>Nova Task</p>
        <img src={meTaskLogo} alt="metask Logo" className="logo" />
      </div>

      <div className="main">
          <form className="input-area" onSubmit={handleCreateNewTask} >
            <input type="text"
            placeholder="Nova Task"
            className="task-input" 
            onChange={event => setNewTask(event.target.value)}
            value={newTask} />

            <input type="text"
            placeholder="Descreva a Task"
            className="task-description"
            onChange={event => setNewTaskDescription(event.target.value)}
            value={newTaskDescription}  />
             <Button type="submit">Salvar</Button> 
          </form>

        <div className="card">
          <p> Para adicionar uma nova Task
              Digite as informações ao lado
          </p>
          <div className="buttons">
           
            <img src={deleteImg} alt="" />
          </div>
        </div>
      </div>
    </div>
  )
}