const projectdb = require('./data/helpers/projectModel')
const actiondb = require('./data/helpers/actionModel')

function validateProjectId(req, res, next) {
    const { id } = req.params
    projectdb.get(id)
    .then(project => {
        if(!project){
            res.status(404).json({message: "There is no project with that ID."})
        } else {
            next()
        }
    })
    .catch(err => {
        console.log(err)
    })
}

function validateActionId(req, res, next) {
    const { id } = req.params
    actiondb.get(id)
    .then(action =>{
        if(!action){
            res.status(404).json({message: "There is no action with that ID."})
        } else {
            next()
        }
    })
    .catch(err => {
        console.log(err)
    })
}

module.exports = { validateProjectId, validateActionId }