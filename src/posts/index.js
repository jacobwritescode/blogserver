const global = require("../helpers/global")
const postsController = require("./controller")

const router = global.express.Router()

router.post("/create",postsController.createPost)
router.get("/list",postsController.allPost)
router.put("/:postId",postsController.updatePost)
router.delete("/:postId",postsController.deletePost)

module.exports = {
    postsRoutes:router,
    postsController
}