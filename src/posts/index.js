const global = require("../helpers/global")
const postsController = require("./controller")
const middleware=require('../helpers/middleware')

const router = global.express.Router()

router.post("/create",middleware.checkToken,postsController.createPost)
router.get("/list",middleware.checkToken,postsController.allPost)
router.put("/:postId",middleware.checkToken,postsController.editPost)
router.get("/:postId",middleware.checkToken,postsController.getPost)
router.delete("/:postId",middleware.checkToken,postsController.deletePost)

module.exports = {
    postsRoutes:router,
    postsController
}