const Posts = require("../models/PostModel");

class PostController {
    async index(req, res) {
        try {
            const posts = await Posts.find({ user: req.userID }).populate("user", ["username"]);
            if (!posts) {
                return res.status(400).json({
                    status: "failure",
                    msg: "Post not found!"
                })
            }
            return res.status(200).json({
                status: "success!",
                msg: "Posts ALL",
                posts
            })

        } catch (error) {
            return res.status(404).json({
                status: "failure",
                msg: "Invalid Posts",
                error
            })
        }
    }

    async insert(req, res) {
        try {
            const { title, desc, url, status } = req.body;
            if (!title) {
                return res.status(400).json({
                    status: "failure",
                    msg: "Please check field title!"
                })
            }

            const newPost = new Posts({
                title,
                desc,
                url: url || "http://localhost:5000/api/posts",
                status: status || "TO LEARN",
                user: req.userID
            });

            await newPost.save();

            return res.status(200).json({
                status: "success",
                msg: "Post new success!",
                post: newPost
            })
        } catch (error) {
            return res.status(404).json({
                status: "failure",
                msg: "Invalid Posts",
                error
            })
        }
    }

    async update(req, res) {
        try {
            const { title, desc, status, url } = req.body;
            if (!title) {
                return res.status(400).json({
                    status: "failure",
                    msg: "Please check field title!"
                })
            }

            const newUpdate = {
                title,
                desc,
                url: url || "http://localhost:5000/api/posts",
                status: status || "TO LEARN"
            }

           const update =  await Posts.findOneAndUpdate({ user: req.userID, _id: req.params.id }, newUpdate, { new: true });

            return res.status(200).json({
                status: "success",
                post: update
            })
        } catch (error) {
            return res.status(400).json({
                status: "failure",
                error
            })
        }
    }

    async delete(req, res) {
        try {
            const deletePost = await Posts.findOneAndDelete({_id: req.params.id});

            if(!deletePost) {
                return res.status(404).json({
                    status: "failure",
                    msg: "Not found post!"
                })
            }

            return res.status(200).json({
                status: "success",
                msg: "deleted success!"
            })
        } catch (error) {
            
        }
    }
}

module.exports = new PostController;