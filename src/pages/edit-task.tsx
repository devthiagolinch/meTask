import { useHistory } from "react-router";
import { FormEvent, useEffect, useState } from "react";

import { Button } from "../components/Button";

import meTaskLogo from '../assets/images/meTaskLogo.png'
import deleteImg from '../assets/images/delete.svg';
import arrowImg from '../assets/images/arrow.svg';

import '../styles/new-task.scss'

import { database } from "../services/firebase";
import { useAuth } from '../hooks/useAuth';
import { useTask } from "../hooks/useTask";

type TaskInfo = [
  id: string,
  title: string,
  description: string,
  authorId: string
]

type EditTaskProps = {
  id: string,
  title: string,
  description: string,
  authorId: string
}

export function EditTask(props: EditTaskProps) {
  const history = useHistory();
  const { user } = useAuth();

  const [taskTitle, setTasktitle] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const { myTasks } = useTask();

  function handleBackHome() {
    history.push('/home')
  }

  
  
  async function handleUpdateTask(event: FormEvent) {
    event.preventDefault();

    if(taskTitle.trim() === '') {
      return;
    }

    const task = {
      title: taskTitle,
      description: taskDescription,
      author: {
        authorId: user?.id,
        name: user?.name,
        avatar: user?.avatar
      },
      createdAt: Date.now(),
    }

    await database.ref(`tasks/${props.id}`).update(task);

    setTasktitle('');
    setTaskDescription('');

    history.push(`/home`)
  }

  return (
    <div id="new-task-page">
      <div className="header">
        <img src={arrowImg} alt="voltar" className="arrowBack" onClick={handleBackHome} />
        <p>Edit Task</p>
        <img src={meTaskLogo} alt="metask Logo" className="logo" />
      </div>

      <div className="main">
          <form className="input-area" onSubmit={handleUpdateTask} >
            <input type="text"
            placeholder='Task'
            className="task-input" 
            onChange={event => setTasktitle(event.target.value)}
            value={taskTitle} />

            <input type="text"
            placeholder="Descreva a Task"
            className="task-description"
            onChange={event => setTaskDescription(event.target.value)}
            value={taskDescription}  />
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