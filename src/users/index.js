const global = require('../helpers/global')
const userController = require('./controller')
// const middleware=require('../helper/middleware')
const router = global.express.Router();


router.post('/login', userController.userLogin)
router.post('/register', userController.register)
router.post('/updatepassword',userController.updatePassword)

module.exports = {
    userRoutes:router,
    userController
}
