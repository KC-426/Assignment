const { validationResult } = require("express-validator/check");
const mongoose = require('mongoose')
const User = require("../models/user");

exports.users = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    const error = new Error("Validation Failed");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
 User.find()
 .then(user => {
  console.log(user)
  let data = user.map(element => {
    return {id: element.id, 
      name: element.name
    }
  })
  res.status(200).json({message: 'Users fetched', user: data})
 })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode == 500;
        throw err;
      }
      next(err);
    });
};


exports.getUser = (req, res, next) => {
  const userId = req.params.userId;
  console.log(req.params)

  User.find({id: userId})
    .then(user => {
      let data = user.map(element => {
        return {id: element.id, 
          name: element.name
        }
      })

      if (!user) {
        const error = new Error('User not found');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'User fetched', user: data });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

