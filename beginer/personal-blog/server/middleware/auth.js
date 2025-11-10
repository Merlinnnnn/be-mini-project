// Simple authentication middleware
// For production, use proper authentication

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123'; // Change this in production!

function requireAuth(req, res, next) {
    if (req.session && req.session.isAdmin) {
        return next();
    }
    res.redirect('/admin/login');
}

function isAuthenticated(req, res, next) {
    if (req.session && req.session.isAdmin) {
        return res.redirect('/admin');
    }
    next();
}

function checkCredentials(username, password) {
    return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

module.exports = {
    requireAuth,
    isAuthenticated,
    checkCredentials
};

