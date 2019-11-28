const { UserModel } = require('./model')
const globalfunctions = require('../helpers/globalFunctions')
const global = require('../helpers/global')
const config = require('../helpers/config')


exports.userLogin = (req, res) => {
    console.log("request--->", req.body)
    UserModel.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            console.log("user found->",user)
            user.comparePassword(req.body.password, (err, status) => {
                if (status) {
                    console.log("status is ---->",status)
                    let token = global.jwt.sign({ email: user.email },
                        config.secret,
                        {
                            expiresIn: 86400 // expires in 24 hours
                        }
                    );
                    // return the JWT token for the future API calls
                    res.json({
                        success: true,
                        message: 'Authentication successful!',
                        token: token
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Incorrect username or password',
                        Error: err
                    });
                }
            })
        } else res.json({
            success: false,
            message: 'User not found'
        })

    }).catch(err => res.json({
        success: false,
        message: 'Internal Server Error !' + err
    }))
}


exports.register = (req, res) => {
    var fields = {}
    fields.name = globalfunctions.haveValue(req.body.name)
    fields.email = globalfunctions.haveValue(req.body.email).toLowerCase()
    fields.token = global.jwt.sign({ email: req.body.email },config.secret,{ expiresIn: 86400})
    fields.password = globalfunctions.haveValue(req.body.password)
    var User = new UserModel(fields)
    User.save(function (err, doc) {
        if (err) {
            res.json({ 'status': false, "message": "Registration Failed", "Error": err })
        } else {
            res.json({ 'status': true, "message": "Registration Successful", "User": doc })
        }
    });
}


// exports.getUser = (req, res) => {
//     UserModel.findOne({ email: req.decoded.email }).then((user) => {
//         res.json({ 'status': true, "message": "Successful login", "User": user })
//     }).catch(err => res.json({ 'status': false, "message": "Login Failed", "Error": err }))
// }


exports.updatePassword = (req, res) => {
    var userEmail = req.query.email ? req.query.email : (req.body.email ? req.body.email : "")
    UserModel.findOne({ email: userEmail }).then(user => {
        user.comparePassword(req.body.password, (err, status) => {
            console.log(status)
            if (!status) {
                console.log("Before Save", user, req.body.password)
                user.password = req.body.password
                user.save()
                    .then(user => res.json({ 'status': true, "message": "Successfully updated password", "User": user }))
                    .catch(err => res.json({ 'status': false, "message": "password reset failed", "Error": err }))
            } else {
                res.json({ 'status': true, "message": "New password and current password are same" })
            }
        })
    }).catch(err => res.json({ 'status': false, "message": "password reset failed", "Error": err }))
}
