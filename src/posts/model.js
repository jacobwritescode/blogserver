const global = require("../helpers/global")

const schema =global.mongoose.Schema;

const BlogPostSchema = new schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String,commentedBy:String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
})

const BlogPostModel = global.mongoose.model('Post',BlogPostSchema)
module.exports = { BlogPostModel }