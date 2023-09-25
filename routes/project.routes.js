const router = require('express').Router();
const mongoose = require('mongoose');
const Project = require('../models/Project.model');
const Task = require('../models/Task.model');


//POST Route to create a new Project!
router.post('/projects', (req, res, next) => {
    const { title, description } = req.body;
    //Use the create method for the creation and save of the new projet into the DB.
    Project.create({ title, description, tasks: [] })
        .then(response => res.json(response))
        .catch(err => res.json(err));
});

//GET Route to retrieve all of the projects! | find() method to retrieve all of the docs.
router.get('/projects', (req, res, next) => {
    Project.find()
        .populate('task')
        .then(allProjects => res.json(allProjects))
        .catch(err => res.json(err));
});

//GET Route for retrieving specific project by ID
router.get('/projects/:projectId', (req, res, next) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Project.findById(projectId)
        .populate('task')
        .then(project => res.status(200).json(project))
        .catch(error => res.json(error));
});
//PUT Route updates a specific project by ID
router.put('/projects/:projectId', (req, res, next) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid' });
        return;
    }

    Project.findByIdAndUpdate(projectId, req.body, { new: true })
        .then((updatedProject) => res.json(updatedProject))
        .catch(error => req.json(error));
});

//DELETE Route to delete a specific project by ID
router.delete('/projects/:projectId', (req, res, next) => {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        res.status(400).json({ message: 'Specified id is not valid ' });
        return;
    }

    Project.findByIdAndRemove(projectId)
        .then(() => res.json({ message: `Project with ${projectI} is removed succesfully.` }))
        .catch(error => res.json(error));
});

module.exports = router;
