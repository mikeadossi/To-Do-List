var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

// var pg = require('pg');
// var PORT = 3000;
// var pool = new pg.pool(
//   port: 5432,
//   password: 'opensesame',
//   database: 'terrific_thrasher2',
//   max: 10,
//   host: 'localhost',
//   user: 'postgres'
// );
//
// pool.connect((err, db, done) {
//   if(err) {
//     console.log(err);
//   } else {
//     db.query('SELECT * from task_list', function (err, table) {
//       if(err) {
//         return console.log(err)
//       } else {
//         console.llog(table)
//       }
//     })
//   }
// })
var pgp = require('pg-promise')(options);
var connectionString = `postgres://${process.env.USER}@localhost:5432/terrific_thrasher2`;
var db = pgp(connectionString);

//add query functions

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
  console.log(req.body)
  var task = req.body.task
  var is_complete = req.body.isCompleted
  db.any('insert into task_list(task, is_complete)' + ' values(${task}, ${isCompleted})',
    req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one task'
        });
    })
    .catch(function (err) {
      console.log('second log')
      res.send(err)
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
  var id = req.params;
  db.none( `
        BEGIN TRANSACTION;
        DELETE FROM task_lists WHERE id = ${id};
        COMMIT;
        ` )
      .then( response.status( 200 ).json({ status: 'success', message: 'SUCCESSFULLY DELETED' }) )
      .catch( error => next( error ))
}

module.exports = {
  getAllTasks: getAllTasks,
  getSingleTask: getSingleTask,
  createTask: createTask,
  updateTask: updateTask,
  removeTask: removeTask
};
