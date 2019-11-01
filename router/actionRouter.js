const express = 'express';
const router = require("express").Router();

const actiondb = require('../data/helpers/actionModel')

const { validateActionId } = require('../middleware')

// GET ACTION BY ID
router.get('/:id', validateActionId, (req, res) => {
    actiondb.get(req.params.id)
    .then(actions => {
        res.status(200).json(actions)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an error retrieving actions for that project."})
    })
})

//POST ACTION
router.post('/', (req, res) => {
    if (!req.body.project_id){
        res.status(404).json({message: "Please include a project ID with your request."})
    } else {
    actiondb.insert(req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an error creating that action."})
    })
}
})

//DELETE ACTION
router.delete('/:id', validateActionId, (req, res) => {
    actiondb.remove(req.params.id)
    .then(message => {
        res.status(200).json({message: `Action with ID ${req.params.id} deleted successfully.`})
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an error deleting that action."})
    })
})

//UPDATE ACTION
router.put('/:id', validateActionId, (req, res) => {
    if(!req.body.project_id){
        res.status(404).json({message: "Please include a project ID with your request."})
    } else {
    actiondb.update(req.params.id, req.body)
    .then(action => {
        res.status(201).json(action)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({message: "There was an error updating that action."})
    })
}   
})

module.exports = router