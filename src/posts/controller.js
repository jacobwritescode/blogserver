const { BlogPostModel } = require("./model")

exports.createPost = (req,res)=>{
    console.log("received post")
    // if(!req.body.head){
    //     return res.status(400).send({
    //         messgae:"Post text cannot be empty "
    //     })
    // }
    if( req.body.title && req.body.body && req.body.authorname ){
    const post = new BlogPostModel({
        title:req.body.title,
        author:req.body.authorname,
        body:req.body.body,
        comments: [],
        date: new Date(),
        hidden: false,
        meta: {
            votes: 0,
            favs:  0,
        }
    })
   
    post.save()
    .then(data=>{
        res.send(data)
    }).catch(err =>{
        res.status(500).send({
            message:err.message || "Something went wrong"
        })
    })

    } else{
        return res.status(400).send({
            messgae:"Required fields are missing"
        })
    }
}

exports.allPost = (req,res)=>{
    console.log("allposts===>")
    BlogPostModel.find()
    .then(posts=>{
        res.send(posts)
    }).catch(err => {
        res.status(500).send({
            message:err.message || "Something went wrong!"
        })
    })
}

exports.updatePost = (req, res) => {
    console.log("update post-->", req.params)
    console.log("update body-->", req.body)
    if (req.body) {
        BlogPostModel.findByIdAndUpdate(req.params.postId,
            { $push: { "comments": { body: req.body.body, commentedBy: req.body.by, date: req.body.date } } },
            { safe: true, upsert: true, new: true }
        )
            .then(post => {
                if (!post) {
                    return res.status(404).send({
                        message: "Post Not Found"
                    })
                }
                console.log("found-->", post)
                res.send(post)
            }).catch(err => {
                print(err.kind)
                if(err.kind === 'ObjectId' || err.name === 'NotFound') {
                    return res.status(404).send({
                        message: "Post not found"
                    });                
                }
                return res.status(500).send({
                    message: "Error updating"
                });
            })
    }else{
        return res.status(400).send({
            messgae:"body missing"
        })  
    }
}

exports.deletePost=(req,res)=>{
    console.log("delete posts==>")
    BlogPostModel.findByIdAndRemove(req.params.postId)
    .then(post=>{
        if(!post){
            return res.status(404).send({
                message:"Couldn't find the post"
            })
        }
        res.send({message:"Post deleted successfully!"})
    }).catch(err=>{
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Post not found"
            });                
        }
        return res.status(500).send({
            message: "Could not delete post"
        });
    })
}