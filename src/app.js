import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types';
import {Form, FormikProvider, useFormik} from 'formik';

// components
import CreateTask from './components/createTask.js'
import Tasks from './components/Tasks.js'

// material

import {
    Paper,
    Box,
    Button,
    Card,
    Checkbox,
    CardHeader,
    Grid,
    Typography,
    TextField,
    FormControlLabel,
    makeStyles,
    createStyles,
    ThemeProvider,
    createMuiTheme,

} from '@material-ui/core';

import CreateSharpIcon from '@material-ui/icons/CreateSharp';

//import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({

    root: {
        fontFamily: 'Open Sans',
        backgroundColor: '#222',
        color: "#222"
    },
    card: {
        backgroundColor: '#4791db',
    },
    container: {
        maxWidth: '500px',
        margin: 'auto',
        minHeight: '100px',
        overflow: 'hidden',
    },
    searchInput: {
        backgroundColor: "#eee",
        borderRadius: 5,
        maxWidth: '100%',
    },

})


export default function AppTasks() {

    const classes = useStyles()
    

    const [tasks, setTasks] = useState([])
    const [Component, setComponent] = useState(1)

    useEffect(() => {
        const getTasks = async () => {

            const response = await fetch('/api/tasks')
                .then( res => {
                    return res.json()
                })
                .then(res => {
                    return res
                })
                .catch(err => {
                    console.log(err)
                })

            setTasks(response);
        }
        getTasks()
    }, [])

    const handleTaskAdd = async (taskName) => {

        if(taskName === "") return;
        const newId = await (Math.random() * 100).toString(36).substring(3)
        const newTask = {
            name: taskName,
            id: newId,
            completed: false
        }

        const newTasks = [
            ...tasks, newTask
        ]
        // api add task session
        fetch('api/tasks', 
            {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(newTask)
            },
        )
        setTasks(newTasks)
    }

    const handleTaskDelete = (taskID) => {
        const newTasks = tasks.filter((task) => task.id !== taskID)

        fetch('api/tasks', 
            {
                method: 'DELETE',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({id: taskID})
            },
        )
        
        setTasks(newTasks)
    }

    const handleTaskClick = (taskID) => {
        const newTasks = tasks.map((task) => {
            if(taskID === task.id){
                return {...task, completed: !task.completed}
            }
            return task;
        })
        fetch('api/tasks', 
            {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({id: taskID})
            },
        )
        setTasks(newTasks)

    }                  
    
    const handleChangeComponent = () => {

        if(Component === 1){
            setComponent(2)
        }
        else{
            setComponent(1)
        }
    }


    const ShowComponent = () => {
        if (Component === 1) {
            return (
                <>
                    <Tasks
                        tasks={tasks}
                        handleTaskClick={handleTaskClick}
                        handleTaskDelete={handleTaskDelete}
                    />
                    <div
                        style={{
                            textAlign: 'center',
                        }}
                    >
                        <Button
                            variant='contained'
                            color='secondary'
                            startIcon={<CreateSharpIcon />}
                            onClick={handleChangeComponent}
                            style={{
                                padding: '10px',

                            }}
                        >
                            To Create
                        </Button>
                    </div>
                </>
            )
        }
        else if(Component === 2){
            return(
                <>
                    <CreateTask 
                        handleTaskAdd={handleTaskAdd} 
                        handleChangeComponent={handleChangeComponent}
                    />
                </>
            )
        }

    }


    return (
        <div>
            <Typography
                style={{
                    textAlign: 'center',
                    color: '#fff',
                }}
            >
                <h1>My Tasks</h1>
            </Typography>
            <div className={classes.container}>
                <ShowComponent />
                <Typography 
                    variant='subtitle1'
                    style={{
                        color: '#fff',
                        bottom: 0,
                        left: 0,
                        margin: '50px 0px',
                        width: '100%',
                        height: '50px',
                        textAlign: 'center',
                    }}
                >
                    {"Created by "}
                    <a 
                        style={{color: '#dc004e', fontWeight: 'bolder'}}
                        href="https://github.com/H4ndrycx"
                    >
                        Handryc 
                    </a>
                </Typography>
            </div>
        </div>
    );
}
