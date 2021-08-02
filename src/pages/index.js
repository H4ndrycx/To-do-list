import React, {useState} from 'react'
import '../styles/index.css'
import Tasks from '../components/tasks'
import AddTask from '../components/addTask.js'

export default () => {
    const [tasks, setTasks] = useState([])
    
    const handleTaskAdd = (taskName) => {
        if(taskName === "") return;
        const newId = (Math.random() * 100).toString(36).substring(3)

        const newTask = [
            ...tasks,
            {
                id: newId,
                name: taskName,
                completed: false

            }
        ]
        
        setTasks(newTask)

    }
    const handleTaskClick = (taskId) => {
        const newTasks = tasks.map(task => {
            if(task.id === taskId) return {...task, completed: !task.completed }
            return task;
        })
        setTasks(newTasks)
        
    }
    const handleTaskDeletion = (taskId) => {
        const newTasks = tasks.filter(task => task.id !== taskId)
        setTasks(newTasks)
        
    }
    return(
        <div className="container">
            <h1 style={{color: "#eee"}}>My Tasks</h1>
            <AddTask handleTaskAdd={handleTaskAdd}/>
            <Tasks
                tasks={tasks}
                handleTaskClick={handleTaskClick}
                handleTaskDeletion={handleTaskDeletion}
            />

        </div>
    )
}
