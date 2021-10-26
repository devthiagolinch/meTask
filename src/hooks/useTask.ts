import { useEffect, useState } from "react";
import { VscLayers } from "react-icons/vsc";

import { database } from "../services/firebase";
import { useAuth } from "./useAuth";

type FirebaseTasks = Record<string, {
  author: {
    name: string;
    avatar: string;
    id: string;
  }
  title: string;
  description: string;
  createdAt: number;
  authorId: string;
}>

type MyTaskType = {
  id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  }
  title: string;
  description: string;
  createdAt: number;
}

export function useTask() {
  const { user } = useAuth();
  const [myTasks, setMyTasks] = useState<MyTaskType[]>([])

  useEffect(() => {
    const taskRef = database.ref("tasks");

    taskRef.on('value', task => {
      const databaseTasks = task.val();
      const firebaseTasks: FirebaseTasks = databaseTasks ?? {};

      const parsedTasks = Object.entries(firebaseTasks).map(([key, value]) => {
        return {
          id: key,
          title: value.title,
          description: value.description,
          author: value.author,
          authorId: value.authorId,
          createdAt: value.createdAt
        }
      })
      
      setMyTasks(parsedTasks);
    })

    return () => {
      taskRef.off('value');
    }
  }, [user?.id]);
  
  return { myTasks }
}