const global = require('./src/helpers/global')

const { userRoutes } = require('./src/users')
const { postsRoutes } = require("./src/posts")

const router = global.express.Router()

router.use('/user', userRoutes)
router.use("/post",postsRoutes)

module.exports = router
