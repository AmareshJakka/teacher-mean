const express = require('express');
const app = express();
const techerRoute = express.Router();

// Teacher model
let Teacher = require('../model/teacher');

// Add Teacher
techerRoute.route('/add-teacher').post((req, res, next) => {
  Teacher.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
});

// Get all teachers
techerRoute.route('/').get((req, res) => {
  Teacher.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single teacher
techerRoute.route('/read-Teacher/:id').get((req, res) => {
  Teacher.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update teacher
techerRoute.route('/update-teacher/:id').put((req, res, next) => {
  Teacher.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('teacher successfully updated!')
    }
  })
})

// Delete teacher
techerRoute.route('/delete-teacher/:id').delete((req, res, next) => {
  Teacher.findByIdAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = techerRoute;
