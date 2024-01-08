const express = require('express')
const mongoose = require('mongoose')
const Task = require('../models/task')
const router = express.Router()

router.post('/', (req, res, next) => {

    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        date: new Date().toDateString()
    });

    task.save()
        .then(result => {
            res.status(201).json({
                message: "Task Added Successfully",
                task: {
                    _id: result._id,
                    title: result.title,
                    description: result.description
                },
                completed: result.complete,
                date: result.date
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})

router.get('/', (req, res, next) => {

    const query = req.query;

    if (JSON.stringify(query) === '{}') {
        // get all tasks(complete + incomplete)

        Task.find()
            .select('_id title description date complete')
            .exec()
            .then(tasks => {

                const response = {
                    status: "All Tasks",
                    numberOfTasks: tasks.length,
                    tasks: tasks.map(task => {
                        return {
                            _id: task._id,
                            title: task.title,
                            description: task.description,
                            date: task.date,
                            completed: task.complete
                        }
                    })
                }
                res.status(200).json(response);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                });
            })
    } else {

        if (!query.hasOwnProperty('status')) {
            res.status(404).json({
                error: "Not found"
            });
        }

        if (query.status === 'complete') {
            //get all completed tasks 

            Task.find({ complete: true })
                .select('_id title description date complete')
                .exec()
                .then(tasks => {

                    const response = {
                        status: "Complete Tasks",
                        numberOfTasks: tasks.length,
                        tasks: tasks.map(task => {
                            return {
                                _id: task._id,
                                title: task.title,
                                description: task.description,
                                date: task.date,
                                completed: task.complete
                            }
                        })
                    }
                    res.status(200).json(response);
                })
                .catch(err => {
                    console.log(err)
                    res.status(500).json({
                        error: err
                    });
                })

        } else if (query.status === 'incomplete') {
            // get all incomplete tasks

            Task.find({ complete: false })
                .select('_id title description date complete')
                .exec()
                .then(tasks => {

                    const response = {
                        status: "Incomplete Tasks",
                        numberOfTasks: tasks.length,
                        tasks: tasks.map(task => {
                            return {
                                _id: task._id,
                                title: task.title,
                                description: task.description,
                                date: task.date,
                                completed: task.complete
                            }
                        })
                    }
                    res.status(200).json(response);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    });
                })
        } else {
            res.status(404).json({
                error: "Not found",
                queriesAllowed: {
                    getAllTasks: "http://localhost:23450/tasks",
                    getCompleteTasks: "http://localhost:23450/tasks?status=complete",
                    getIncompleteTasks: "http://localhost:23450/tasks?status=incomplete"
                }
            });
        }
    }
})

router.get('/:taskId', (req, res, next) => {
    const id = req.params.taskId;

    Task
        .findById(id)
        .select('title description date complete')
        .exec()
        .then(result => {

            res.status(200).json({
                message: `Task with id: ${id}`,
                task: {
                    title: result.title,
                    description: result.description,
                    date: result.date,
                    completed: result.complete
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })

})

router.patch('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    const updateOps = {};

    for (let i = 0; i < req.body.length; i++) {
        const propName = Object.keys(req.body[i])[0];
        const value = req.body[i][propName];
        updateOps[propName] = value;
    }

    console.log(updateOps)

    Task.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Task Updated",
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })

})

router.delete('/:taskId', (req, res, next) => {
    const id = req.params.taskId;

    Task.deleteOne({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Task Deleted"
            });
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        })


})

router.delete('/', (req, res, next) => {
    Task.deleteMany({})
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Deleted All Tasks"
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
})
module.exports = router;