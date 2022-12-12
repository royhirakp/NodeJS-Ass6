const mongooose = require('mongoose');
const Schema = mongooose.Schema;
const ObjectId = Schema.ObjectId;

const blogSchema = new Schema({
    // Your code goes here
    topic: String,
    description: String,
    posted_at: String,
    posted_by: String
})

const Blog = mongooose.model('blog', blogSchema);
module.exports = Blog;