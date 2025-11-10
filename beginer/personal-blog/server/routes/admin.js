const express = require('express');
const router = express.Router();
const { requireAuth, isAuthenticated, checkCredentials } = require('../middleware/auth');
const {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    dateToInputFormat
} = require('../utils/storage');

// Login page
router.get('/login', isAuthenticated, (req, res) => {
    res.render('admin/login', { error: null });
});

// Login handler
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    
    if (checkCredentials(username, password)) {
        req.session.isAdmin = true;
        res.redirect('/admin');
    } else {
        res.render('admin/login', { error: 'Invalid username or password' });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/admin/login');
});

// Admin dashboard
router.get('/', requireAuth, (req, res) => {
    const articles = getAllArticles();
    res.render('admin/dashboard', { articles });
});

// New article page
router.get('/new', requireAuth, (req, res) => {
    res.render('admin/add-article');
});

// Create article
router.post('/new', requireAuth, (req, res) => {
    const { title, content, date } = req.body;
    
    if (!title || !content || !date) {
        return res.status(400).send('All fields are required');
    }
    
    try {
        createArticle(title, content, date);
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Error creating article');
    }
});

// Edit article page
router.get('/edit/:id', requireAuth, (req, res) => {
    const article = getArticleById(req.params.id);
    if (!article) {
        return res.status(404).send('Article not found');
    }
    
    // Convert date to input format
    article.dateInput = dateToInputFormat(article.date);
    res.render('admin/edit-article', { article });
});

// Update article
router.post('/edit/:id', requireAuth, (req, res) => {
    const { title, content, date } = req.body;
    const { id } = req.params;
    
    if (!title || !content || !date) {
        return res.status(400).send('All fields are required');
    }
    
    try {
        const success = updateArticle(id, title, content, date);
        if (!success) {
            return res.status(404).send('Article not found');
        }
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Error updating article');
    }
});

// Delete article
router.get('/delete/:id', requireAuth, (req, res) => {
    const { id } = req.params;
    
    try {
        const success = deleteArticle(id);
        if (!success) {
            return res.status(404).send('Article not found');
        }
        res.redirect('/admin');
    } catch (error) {
        res.status(500).send('Error deleting article');
    }
});

module.exports = router;

