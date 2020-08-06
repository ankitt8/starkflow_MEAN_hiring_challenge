const express = require('express')
const router = express.Router()
const Todo = require('../../models/Todo')

// get the todos
router.get('/todos', (req, res) => {
    Todo.find((err, todos) => {
        if (err) {
            console.log(err)
        } else {
            res.json(todos);
        }
    })
})

// add the todo
router.post('/add', (req, res) => {
    let todo = new Todo(req.body);
    console.log(todo)
    todo.save()
        .then(todo => {
            res.status(200).json({ 'todo': `todo with title ${todo.todo_title} added succesfully` });
        })
        .catch(err => {
            res.status(400).send('adding todo failed');
        })
})

// update todo by id
router.post('/update/:id', (req, res) => {
    let id = req.params.id;
    console.log(id)
    let todo = Todo.findById(id, (err, todo) => {
        if (!todo) {
            res.status(404).send(`Todo with title ${todo.todo_title} not found!`)
        } else {
            console.log(req.body)
            console.log(typeof req.body)
            todo.todo_title = req.body.todo_title;
            todo.todo_description = req.body.todo_description;
            todo.save()
                .then(todo => {
                    res.json(`Todo with id ${id} updated successfully`)
                })
                .catch(err => {
                    res.status(400).send("Update not possible");
                });
        }
    })
})

// delete todo by id
router.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    Todo.findByIdAndRemove(id, (err, todo) => {
        if(err) {
            res.status(400).send('Bad Request')
        } else {
            res.status(200).send('Delete Successfull')
        }
    })
})
// router.get('update/:id')

module.exports = router