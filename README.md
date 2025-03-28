# Web Manga/Novel Platform

A full-stack web application for reading and managing manga/novels, built using React.js, Express.js, MongoDB, and TailwindCSS.

## Features

- User authentication (signup/login/logout)
- Browse, search, and filter manga/novels
- Read manga/novels online
- Bookmark favorite manga/novels
- Admin panel for managing content
- Responsive UI with TailwindCSS

## Tech Stack

- **Frontend**: React.js, TailwindCSS
- **Backend**: Express.js, Node.js
- **Database**: MongoDB
- **API**: MangaDex API (or custom API)

## Installation

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Clone the repository
```sh
git clone https://github.com/yourusername/web-manga-novel.git
cd web-manga-novel
```

### Backend Setup
```sh
cd backend
npm install
npm start
```

### Frontend Setup
```sh
cd frontend
npm install
npm start
```

## Environment Variables
Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

## Usage
- Run `npm start` in both `backend` and `frontend` directories.
- Open `http://localhost:3000` in the browser.

## License
This project is licensed under the MIT License.

## Contributions
Feel free to submit pull requests or report issues!

## Contact
For questions, reach out via GitHub issues or email me at [your-email@example.com].
