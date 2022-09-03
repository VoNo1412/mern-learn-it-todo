const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: "String",
    desc: "String",
    status: {
        type: "String",
        process: ["TO LEARN", "LEARNING", "LEARNED"]
    },
    url: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
})

module.exports = mongoose.model("Posts", PostSchema);