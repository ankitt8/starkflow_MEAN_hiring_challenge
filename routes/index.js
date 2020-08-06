const express = require('express')
const router = express.Router()

// 
router.get('/', (req, res) => {
    
    res.render('login.html');
})

router.get('/home', (req, res) => {
    res.render('home.html');
})

module.exports = router;