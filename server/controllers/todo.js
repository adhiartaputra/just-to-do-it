const todo = require('../models/todo')
const jwt = require('jsonwebtoken');


module.exports = {
  addTodo: function (req, res) {
    const { title, description, date } = req.body
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    console.log(decoded);
    console.log(req.body);
    const todos = new todo()
      todos.owner = decoded._id
      todos.title = req.body.title
      todos.description = req.body.description
      todos.date = req.body.date
      todos.save().then(data_todo => {
        res.status(201).json({
          message: 'Create new todo success',
          data_todo
        })
      }).catch(err => {
        console.log(err);
        res.status(500).json({
          message: 'error'
        })
      })
  },
  showTodo: function (req, res) {    
    let token = req.headers.token
    let decoded = jwt.verify(token, process.env.SECRET)
    todo.find({owner : decoded._id})
    // .populate('owner')
    .sort({date: 'desc'})
    .exec((err,data_todo) => {
      if(err){
        res.status(404).json({
          message: "data not found",
          err
        })
      } else {
        res.status(201).json({
          message: "here's your data",
          data_todo
        })
      }
    })
  },
  deleteTodo: function (req, res) {
    console.log(req.headers,'HEADERS');
    todo.deleteOne({_id: req.headers.id}).then(() => {
      res.status(200).json({
        message: 'deleted'
      })
    })
  },
  updateTodo: function (req, res) {
    todo.findOneAndUpdate({ _id: req.headers.id }, { $set: req.body }, {new: true}, (err, data) => {
      console.log(data); 
      if(err) {
        res.status(404).json({
          message: 'User not found',
          err
        })
      } else {
        res.status(201).json({
          message: 'Data update success',
          udpated: data
        })
      }
    })
  },
  searchTodo: function (req,res) {
    todo.findOne({
      $or: [
        {title: req.body.tile},
        {description: req.body.description},
        {date: req.body.date}
      ]
    }).then(todo => {
      if(todo){
        res.status(201).json({
          message: 'here \'s your data',
          data: todo
        })
      }
    })
  }
};
