const express = require('express');
const Posts = require('../data/db')
const bodyParser = require('body-parser');

const router = express.Router();
router.use(bodyParser.json());
// router.use(bodyParser.urlencoded());
router.post('/', (req, res) => {
    console.log(req.body);
    Posts.insert(req.body)
    .then(posts => {
        res.status(201).json(posts)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json({
            message: `{ errorMessage: "Please provide title and contents for the post." }`
        })
    })
});

router.post('/:id/comments', (req, res) => {
    Posts.findById(req.params.id)
    .then(posts => {
        if(posts) {
            res.status(201).json(posts);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "There was an error while saving the comment to the database"
        })
    })
});

router.get('/', (req, res) => {
    Posts.find(req.query)
    .then(posts => {
    res.status(200).json(posts);
})
    .catch(err => {
    console.log(err);
    res.status(500).json({
        message: 'The posts information could not be retrieved.',
    })
  })
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
    .then(posts => {
        if(posts) {
            res.status(200).json(posts);
        } else{
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "The post information could not be retrieved."
        })
    })
});

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(posts => {
        if(posts) {
            res.status(201).json(posts);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "The comments information could not be retrieved."
        })
    })
});

router.delete("/:id", (req, res) => {
    Posts.remove(req.params.id)
    .then(count => {
        if(count > 0){
            res.status(200).json({ message: "the posts are here"})
        } else{
            res.status(404)({ message:"The post with the specified ID does not exist."})
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "he post could not be removed"
        })
    })
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
    .then(posts => {
        if(posts) {
            res.status(200).json(posts);
        } else{
            res.status(400).json({
                message:  "Please provide title and contents for the post."
            })
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            message: "The post information could not be modified."
        })
    })
});

module.exports = router;