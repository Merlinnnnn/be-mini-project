# Personal Blog

A simple personal blog application with guest and admin sections.

## Features

### Guest Section (Public)
- **Home Page** (`/`): Displays a list of all published articles
- **Article Page** (`/article/:id`): Displays individual article content with publication date

### Admin Section (Protected)
- **Login Page** (`/admin/login`): Admin authentication
- **Dashboard** (`/admin`): List all articles with edit/delete options and add new article link
- **Add Article** (`/admin/new`): Form to create new articles
- **Edit Article** (`/admin/edit/:id`): Form to update existing articles
- **Delete Article** (`/admin/delete/:id`): Delete an article

## Technology Stack

- **Backend**: Node.js with Express
- **Template Engine**: EJS
- **Storage**: File system (JSON files)
- **Styling**: Custom CSS with hand-drawn aesthetic
- **Authentication**: Session-based authentication

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create the data directory (will be created automatically on first run):
```bash
mkdir -p data/articles
```

## Running the Application

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The application will be available at:
- Home page: http://localhost:3000/
- Admin login: http://localhost:3000/admin/login

## Default Admin Credentials

- **Username**: `admin`
- **Password**: `admin123`

⚠️ **Important**: Change these credentials in `server/middleware/auth.js` before deploying to production!

## Project Structure

```
personal-blog/
├── client/
│   ├── public/
│   │   └── css/
│   │       └── style.css
│   └── views/
│       ├── guest/
│       │   ├── home.ejs
│       │   └── article.ejs
│       └── admin/
│           ├── dashboard.ejs
│           ├── login.ejs
│           ├── add-article.ejs
│           └── edit-article.ejs
├── server/
│   ├── app.js
│   ├── routes/
│   │   ├── guest.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js
│   └── utils/
│       └── storage.js
├── data/
│   └── articles/          # JSON files storing articles
├── package.json
└── README.md
```

## Storage Format

Articles are stored as JSON files in the `data/articles/` directory. Each article file contains:
```json
{
  "title": "Article Title",
  "content": "Article content...",
  "date": "August 7, 2024"
}
```

## Notes

- Articles are sorted by date (newest first)
- Date format: "Month Day, Year" (e.g., "August 7, 2024")
- The design uses a hand-drawn aesthetic with the Kalam font
- All admin routes require authentication

