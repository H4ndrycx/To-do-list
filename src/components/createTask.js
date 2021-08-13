import React, {useState} from 'react'

// -- Material

//components
import {
    TextField,
    Grid,
    Button,
    Typography,
    makeStyles

} from '@material-ui/core'

//icons
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import BackspaceSharpIcon from '@material-ui/icons/BackspaceSharp';

const useStyles = makeStyles({

    labelInput: { 
        backgroundColor: "#eee",
        maxWidth: '100%',
    },
    gridText : {
        padding: "10px",
        margin: '10px',
        textAlign: 'center',
        alignItems: 'center'
    },
    gridButton: {
        padding: "10px",
        textAlign: 'center',
        alignItems: 'center'
    },
    button: {
        padding: '10px',
        margin: '10px',
        textAlign: 'center',
    }

})



export default function CreateTask(props) {
    
    const classes = useStyles()
    const [inputData, setInputData] = useState('')
    const [inputState, setInputState] = useState()

    const handleClickAdd = () => {

        const re = /\d/g
        let noJustNumber = true
        if(inputData.match(re)){
            noJustNumber = inputData.match(re).length !== inputData.length
        }

        if(inputData.length >= 3 && inputData.length < 30 && noJustNumber){
            let newTask = inputData.toUpperCase()

            props.handleTaskAdd(newTask)
            props.handleChangeComponent()
        }
        else{
            setInputState('you must enter a task of 3 to 30 characters')
        }
    }

    const handleEnterInput = (e) => {
        if(e.keyCode === 13) return handleClickAdd()
    }
    
    return (
        <Grid
            container spacing={3}
            alignItems='center'
        >
            <Grid item xs={12} className={classes.gridText}>
                <TextField
                    fullWidth
                    placeholder='Input new task'
                    inputProps={{
                        disableUnderline: true,
                        className: classes.labelInput
                    }}
                    variant='outlined'
                    color='secondary'
                    margin='normal'
                    value={inputData}
                    helperText={
                        <Typography style={{color: '#fff'}} variant='subtitle1'>
                            {inputState}
                        </Typography>
                    }
                    onKeyDown={(e) => handleEnterInput(e)}
                    onChange={(e) => setInputData(e.target.value)}
                />
                <Grid
                    item
                    xs={12}
                    className={classes.gridButton}
                >

                    <Button
                        variant='contained'
                        color='secondary'
                        startIcon={<CreateSharpIcon />}
                        className={classes.button}
                        onClick={handleClickAdd}
                    >
                        Add
                    </Button>
                    <Button
                        variant='contained'
                        color='secondary'
                        startIcon={<BackspaceSharpIcon />}
                        className={classes.button}
                        onClick={props.handleChangeComponent}
                    >
                        Cancel
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )

}
