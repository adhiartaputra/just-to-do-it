const User = require('../models/user');

module.exports = {
    getUserDetail: (req, res) => {
        User.findOne({_id: req.params.id})
            .exec()
            .then(data => {
                res.status(200).json({
                    message: 'Success',
                    data: data
                })
            })
    },
    getUser: (req, res) => {
        User.find()
            .exec()
            .then(data => {
                res.status(200).json({
                    message: 'Success',
                    data: data
                })
            })
    },
    deleteUser: (req, res) => {
        User.remove({_id: req.params.id}, (err, data)=>{
            res.status(200).json({
                message: 'Item deleted',
            })
        })
    },
    verifyUser: (req, res, next) => {
        console.log(req.decoded)
        const email = req.decoded.email;
        User.findOne({email : email})
          .exec().then(foundUser => {
            if (foundUser) {
                console.log('verify succesful')
                req.user = foundUser
              next()
            } else {
              res.status(401).json({
                message: 'User is not authorized to post here.'
              })
            }
          })
          .catch(err => {
            res.status(500).json({
              message: 'Server Error',
              err: err
            })
          })
    }
}
