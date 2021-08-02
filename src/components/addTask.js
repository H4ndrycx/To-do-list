import React, {useState} from 'react'
import '../styles/addTask.css'

export default ({handleTaskAdd}) => {
    const [inputData, setInputData] = useState()

    function addButonClick(){
        handleTaskAdd(inputData)
        setInputData('')
    }

    return(
        <div className='add-task-container'>
            <input
                onChange={(e) => setInputData(e.target.value)}
                value={inputData}
                className='add-task-input'
                type='text'
            />

            <div className='add-button-container'>
                <button className='button' onClick={addButonClick}>
                    Add
                </button>
            </div>

        </div>
    )

}
