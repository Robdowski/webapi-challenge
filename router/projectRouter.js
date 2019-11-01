const express = 'express';
const router = require("express").Router();

const projectdb = require('../data/helpers/projectModel')

const { validateProjectId } = require('../middleware')

// GET PROJECTS
router.get('/', (req, res) => {
    projectdb.get()
    .then(projects => {
        res.status(200).json(projects)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an error retrieving projects from the database."})
    })
})

// GET PROJECT BY ID
router.get('/:id', validateProjectId, (req, res) => {
    projectdb.get(req.params.id)
    .then(project => {
        res.status(200).json(project) 
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was a problem retrieving project by ID."})
    })
})

//GET PROJECT ACTIONS
router.get('/:id/actions', validateProjectId, (req, res) => {
    projectdb.getProjectActions(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was a problem getting project actions."})
    })
})

//ADD PROJECT
router.post('/', (req, res) => {
    projectdb.insert(req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an error creating the project."})
    })
})

//UPDATE A PROJECT
router.put('/:id', validateProjectId, (req, res) => {
    projectdb.update(req.params.id, req.body)
    .then(project => {
        res.status(201).json(project)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an error updating that project."})
    })
})

//DELETE A PROJECT
router.delete('/:id', validateProjectId, (req, res) => {
    projectdb.remove(req.params.id)
    .then(message => {
        res.status(200).json({message: `The item with ID ${req.params.id} was successfully deleted.`})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was a problem deleting the project from the server."})
    })
})


module.exports = router