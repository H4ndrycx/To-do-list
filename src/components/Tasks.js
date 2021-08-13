import React, {useState} from 'react'

// --> Material

//components
import {
    makeStyles
} from '@material-ui/core'

//icons
import CancelIcon from '@material-ui/icons/Cancel';



const useStyles = makeStyles({

    ContainerTaskComplete: {
        margin: '30px 10px',
        borderRadius: '10px',
        display: 'flex',
        background: 'linear-gradient(45deg, #2196f3 30%, #21cbf3 90%)',
        boxShadow: '0 3px 5px 2px #2196f3',
        justifyContent: 'space-between',
        alignItems: 'center'

    },
    ContainerTaskUncomplete: {
        margin: '30px 10px',
        borderRadius: '10px',
        display: 'flex',
        background: 'linear-gradient(45deg, #dc004e 30%, #f44336 90%)', 
        boxShadow: '0 3px 5px 2px #dc004e',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    TaskTitle: {
        width: '100%',
        margin: '10px',
        color: '#fff',
        cursor: 'pointer',
        fontSize: '20px'
    },
    RemoveTaskButton: {
        margin: '5px 10px',
        color: '#fff',
        cursor: 'pointer',

    },

})



export default function Tasks(props) {

    const classes = useStyles()

    
    const CompletedTask = (props) => {
        return (
            <div 
                className={classes.TaskTitle}
                onClick={() => props.handleTaskClick(props.task.id)}
            >
                {props.task.name}
            </div>
        )
    }
    const UnCompletedTask = (props) => {
        return (
            <div 
                className={classes.TaskTitle}
                onClick={() => props.handleTaskClick(props.task.id)}

            >
                {props.task.name}
            </div>
        )

    }

    const ListTasks = (props) => {
        if (props.task.completed === false) {
            return (
                <div className={classes.ContainerTaskUncomplete}>
                    <UnCompletedTask
                        handleTaskClick={props.handleTaskClick}
                        task={props.task}
                    />
                    <CancelIcon
                        className={classes.RemoveTaskButton}
                        fontSize='large'
                        onClick={() => props.handleTaskDelete(props.task.id)}
                    />
                </div>
            )
        }
        else {
            return (
                <div className={classes.ContainerTaskComplete}>
                    <CompletedTask
                        handleTaskClick={props.handleTaskClick}
                        task={props.task}
                    />
                    <CancelIcon
                        className={classes.RemoveTaskButton}
                        fontSize='large'
                        onClick={() => props.handleTaskDelete(props.task.id)}
                    />
                </div>
            )
        }
    }

    const ShowTask = (props) => {

        if (props.tasks.length === 0) {
            return (
                <div
                    className={classes.TaskTitle}
                    style={{
                        textAlign: 'center',
                        fontSize: '26px',
                        margin: '50px 10px'
                    }}
                >
                    You don't have new tasks today
                </div>
            )
        }
        else{
            return(
                <>
                    {props.tasks.map((task) => (
                        <>
                            <ListTasks
                                handleTaskClick={props.handleTaskClick}
                                handleTaskDelete={props.handleTaskDelete}
                                task={task}
                            />
                        </>
                    ))}
                    
                </>
            )
        }


    }

    return (
        <>
            <ShowTask 
                tasks={props.tasks}
                handleTaskClick={props.handleTaskClick}
                handleTaskDelete={props.handleTaskDelete}
            />
        </>
    )

}
