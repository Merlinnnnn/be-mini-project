const fs = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname, '../../data/articles');

// Ensure articles directory exists
if (!fs.existsSync(ARTICLES_DIR)) {
    fs.mkdirSync(ARTICLES_DIR, { recursive: true });
}

// Get all articles
function getAllArticles() {
    try {
        const files = fs.readdirSync(ARTICLES_DIR);
        const articles = files
            .filter(file => file.endsWith('.json'))
            .map(file => {
                const filePath = path.join(ARTICLES_DIR, file);
                const data = fs.readFileSync(filePath, 'utf8');
                const article = JSON.parse(data);
                article.id = path.basename(file, '.json');
                return article;
            })
            .sort((a, b) => {
                // Sort by date descending (newest first)
                return new Date(b.date) - new Date(a.date);
            });
        return articles;
    } catch (error) {
        console.error('Error reading articles:', error);
        return [];
    }
}

// Get article by ID
function getArticleById(id) {
    try {
        const filePath = path.join(ARTICLES_DIR, `${id}.json`);
        if (!fs.existsSync(filePath)) {
            return null;
        }
        const data = fs.readFileSync(filePath, 'utf8');
        const article = JSON.parse(data);
        article.id = id;
        return article;
    } catch (error) {
        console.error('Error reading article:', error);
        return null;
    }
}

// Create new article
function createArticle(title, content, date) {
    try {
        const id = Date.now().toString(); // Simple ID generation
        const article = {
            title,
            content,
            date: formatDate(date)
        };
        
        const filePath = path.join(ARTICLES_DIR, `${id}.json`);
        fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf8');
        return id;
    } catch (error) {
        console.error('Error creating article:', error);
        throw error;
    }
}

// Update article
function updateArticle(id, title, content, date) {
    try {
        const filePath = path.join(ARTICLES_DIR, `${id}.json`);
        if (!fs.existsSync(filePath)) {
            return false;
        }
        
        const article = {
            title,
            content,
            date: formatDate(date)
        };
        
        fs.writeFileSync(filePath, JSON.stringify(article, null, 2), 'utf8');
        return true;
    } catch (error) {
        console.error('Error updating article:', error);
        throw error;
    }
}

// Delete article
function deleteArticle(id) {
    try {
        const filePath = path.join(ARTICLES_DIR, `${id}.json`);
        if (!fs.existsSync(filePath)) {
            return false;
        }
        fs.unlinkSync(filePath);
        return true;
    } catch (error) {
        console.error('Error deleting article:', error);
        throw error;
    }
}

// Format date from YYYY-MM-DD to "Month Day, Year"
function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

// Convert formatted date back to YYYY-MM-DD for input fields
function dateToInputFormat(dateString) {
    // If already in YYYY-MM-DD format, return as is
    if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
        return dateString;
    }
    
    // Parse formatted date like "August 7, 2024"
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const parts = dateString.split(' ');
    if (parts.length === 3) {
        const month = months.indexOf(parts[0]);
        const day = parseInt(parts[1].replace(',', ''));
        const year = parseInt(parts[2]);
        
        if (month !== -1) {
            return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        }
    }
    
    // Fallback: try to parse as Date
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
        return date.toISOString().split('T')[0];
    }
    
    return dateString;
}

module.exports = {
    getAllArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticle,
    formatDate,
    dateToInputFormat
};

