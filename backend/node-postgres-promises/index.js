var express = require('express');
var router = express.Router();

var db = require('../queries');


router.get('/api/terrific_thrasher2', db.getAllTasks);
// router.get('/api/terrific_thrasher2/:id', db.getSingleTask);
router.post('/api/terrific_thrasher2', db.createTask);
// router.put('/api/terrific_thrasher2/:id', db.updateTask);
router.delete('/api/terrific_thrasher2', db.removeTask);


module.exports = router;
