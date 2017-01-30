var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = `postgres://${process.env.USER}@localhost:5432/terrific_thrasher2`;
var db = pgp(connectionString);

// add query functions

function getAllTasks(req, res, next) {
  db.any('select * from task_list')
  .then(function (data) {
    res.status(200)
      .json({
        status: 'success',
        data: data,
        message: 'Retrieved ALL tasks'
      });
  })
  .catch(function (err) {
    return next(err);
  });
}

function getSingleTask(req, res, next) {
  var taskID = parseInt(req.params.id);
  db.one('select * from task_list where id = $1', taskID)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved ONE task'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createTask(req, res, next) {
  req.body.priority = parseInt(req.body.priority);
  db.none('insert into task_list(task, details, is_complete, priority)' +
      'values(${task}, ${details}, ${is_complete}, ${priority})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one task'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateTask(req, res, next) {
  db.none('update task_list set task=$1, details=$2, is_complete=$3, priority=$4 where id=$5',
    [req.body.task, req.body.details,
      req.body.is_complete, parseInt(req.body.priority), parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated task'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeTask(req, res, next) {
  var taskID = parseInt(req.params.id);
  db.result('delete from task_list where id = $1', taskID)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} task`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

module.exports = {
  getAllTasks: getAllTasks,
  getSingleTask: getSingleTask,
  createTask: createTask,
  updateTask: updateTask,
  removeTask: removeTask
};
