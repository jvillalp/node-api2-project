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
        res.status(500).json({
            message: 'error adding to the posts'
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
        message: 'Error getting posts',
    })
  })
});


module.exports = router;