# Presentation Generator

This repository combines a Python slide generator and a Node/Express frontend-backend scaffold.

## Project structure

- `backend/` - Node/Express backend
  - `server.js` - Express server
  - `package.json` - Node project manifest
- `frontend/` - static web client
  - `index.html` - user interface
  - `styles.css` - styling
  - `script.js` - client-side behavior
- `ppt.py` - Python presentation generator
- `.env` - local environment keys (not committed)
- `.gitignore` - ignores Python, Node, and generated files

## Run the Node app

1. Change into the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Start the server:

```bash
npm start
```

4. Open `http://localhost:4000` in your browser.

## API endpoints

- `GET /api/health` - health check
- `POST /api/generate` - generate slide outline
