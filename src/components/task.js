import React from 'react'
import '../styles/task.css'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

export default ({task, handleTaskClick, handleTaskDeletion}) => {
    return(
        <div 
            className='task-container'
            style={task.completed ? {borderLeft: "10px solid #FF0032"} : {}}
        >                                                               
            <div 
                className='task-title'
                onClick={() => handleTaskClick(task.id)}
            >
                {task.name}
            </div>
            <button 
                className='remove-task-button'
                onClick={() => handleTaskDeletion(task.id)}
            >
                <HighlightOffIcon fontSize="large"/>
            </button>
        </div>
    )

}
