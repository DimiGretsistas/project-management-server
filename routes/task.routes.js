const router = require('express').Router();
const mongoose = require('mongoose');
const Task = require('../models/Task.model');
const Project = require('../models/Project.model');

//Post route to create a new Task!
router.post('/tasks', (req, res, next) => {
    const { title, description, projectId } = req.body;
//Creates a task and update an existing project!
    Task.create({ title, description, projectId })
    .then(newTask => {
        return Project.findByIdAndUpdate(projectId, { $push: { tasks: newTask._id} } );
    })
    .then(response => res.json(response))
    .catch(err => res.json(err));
});

module.exports = router;
