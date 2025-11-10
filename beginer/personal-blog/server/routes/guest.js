const express = require('express');
const router = express.Router();
const { getAllArticles, getArticleById } = require('../utils/storage');

// Home page - list all articles
router.get('/', (req, res) => {
    const articles = getAllArticles();
    res.render('guest/home', { articles });
});

// Article page - display single article
router.get('/article/:id', (req, res) => {
    const article = getArticleById(req.params.id);
    if (!article) {
        return res.status(404).send('Article not found');
    }
    res.render('guest/article', { article });
});

module.exports = router;

