const mongoose = require("mongoose");

const connectDB = async() => {
    try {
        await mongoose.connect("mongodb+srv://vono1412:1412@mern-learn.wnqvt.mongodb.net/henry-dev?retryWrites=true&w=majority")
        console.log("connect successfully!");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = {connectDB}