module.exports = (app) => {

    // routes api
    app.get('/api/tasks', (req, res) => {

        if (req.session.tasks) {
            res.status(200).json(req.session.tasks)
        }
        else {
            req.session.tasks = []
            res.status(200).json(req.session.tasks)
        }


    })
    app.post('/api/tasks', (req, res) => {

        if (req.session.tasks) {
            const newTask = req.body
            req.session.tasks.push(newTask)
            res.status(200).json(req.session.tasks)

        }
        else {
            res.send(500)
        }


    })
    app.put('/api/tasks', (req, res) => {

        if (req.session.tasks) {
            const {id} = req.body
            const currentTasks = req.session.tasks
            const updateTask = currentTasks.findIndex(item => item.id === id)

            currentTasks[updateTask] = {
                ...currentTasks[updateTask],
                completed: !currentTasks[updateTask].completed
            }

            res.status(200).json(currentTasks[updateTask])
        }
        else {
            res.send(500)
        }


    })
    app.delete('/api/tasks', async (req, res) => {

        if (req.session.tasks) {
            const {id} = req.body
            const newTasks = req.session.tasks.filter((task) => task.id !== id)
            req.session.tasks = await newTasks
            res.status(200).json(req.session.tasks)

        }
        else {
            res.send(500)
        }

    })

}
