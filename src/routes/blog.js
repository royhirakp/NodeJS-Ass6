const router = require('express').Router();
const Blog = require('../models/Blog')


// Your routing code goes here

router.get('/allblog',async (req,res)=>{
    let blog = await Blog.find()
    console.log('from allblog===> total arr length', blog.length)
    res.json(blog)
})
router.get('/blog',async (req,res)=>{
    // console.log(req.query)
    try {
        const {page, search} = req.query;
        console.log(page,"page " ,search)
        let us = await Blog.find({topic : search}).skip(page*5 - 5).limit(5)
        // console.log(us.length)
        res.json({
            status:"success",
            result: us
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})
//POST
router.post('/blog',async (req,res)=>{
    try {        
       const new_blog = await Blog.create(req.body)
       console.log(new_blog)
        res.json({
            status:"success",
            result: new_blog
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})
//PUT
router.put("/blog/:blog_ID",async (req,res)=>{   
    try {   
       
        const update_blog = await Blog.updateOne({_id : req.params.blog_ID},{$set:{
            topic: req.body.topic,
            description:  req.body.description,
            posted_at:  req.body.posted_at,
            posted_by:  req.body.posted_by
        }})
    //    const new_blog = await Blog.create(req.body)
        res.json({
            status:"success",
            result: {
                id:req.params.blog_ID,
                topic: req.body.topic,
                description: req.body.description,
                posted_at: req.body.posted_at,
                posted_by: req.body.posted_by
            }
        })
    } catch (e) {
        res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})
//DELETE
router.delete('/blog/:blog_ID',async (req,res)=>{
    const blog = await Blog.find({_id:req.params.blog_ID})
    await Blog.deleteOne({_id: req.params.blog_ID})
    res.json({
        status: "success",
        result: blog
    })
})

//404
router.get('*',async (req,res)=>{
    
    res.status(404).json({
        status: "page not found: 404"
    })
})
module.exports = router;