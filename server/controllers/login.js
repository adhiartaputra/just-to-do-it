const User = require('../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    loginFB: (req, res) => {        
        const idFB = req.body.idFB;
        const email = req.body.email;
        const fbToken = req.body.fbToken;
        const imgUrl = req.body.imgUrl;
        const name = req.body.name;
        console.log(req.body,'<<<<<<<');
        
        User.findOne({ 'email': email })
            .exec()
            .then(dataUser => {
                console.log(dataUser,'<<<<<<<<<<<<<<< DATA USER TOT');
                
                if (dataUser) {
                    User.update({'email': email}, { $set: { profilImg:  imgUrl}}, (err, data)=>{
                        if(err){
                            return res.status(500).json({
                                message: 'Server error',
                                err: err
                            })
                        }
                    })
                    const token = jwt.sign({...dataUser._doc, email: dataUser.email, fbToken: fbToken }, process.env.SECRET)
                    res.status(200).json({
                        dataUser,
                        token: token
                    })
                } else {
                    const newUser = new User({
                        email: email,
                        facebookId: idFB,
                        profilImg: imgUrl,
                        name: name
                    })
                    newUser.save((err, data) => {
                        const token = jwt.sign({ email: email, fbToken: fbToken }, process.env.SECRET)
                        res.status(200).json({
                            token: token,
                            dataUser: data
                        })
                    })
                }
            })
    }
}