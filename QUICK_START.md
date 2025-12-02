# 🚀 Quick Start Guide

## Start the Server

### Method 1: Double-click the batch file
- Double-click `START_SERVER.bat`
- Wait for "Server running on http://localhost:8000"
- Open your browser to `http://localhost:8000`

### Method 2: Command Line
```bash
npm install    # First time only
npm start      # Start server
```

## Access the Game

Once the server is running:
- Open your browser
- Go to: **http://localhost:8000**

## Troubleshooting

### Port 8000 already in use?
Change the port in `server/index.js`:
```javascript
const PORT = process.env.PORT || 8000;  // Change 8000 to another port
```

### MongoDB Connection Error?
- **This is OK!** The game works without MongoDB
- High scores just won't be saved
- To enable: Install MongoDB or use MongoDB Atlas

### "npm is not recognized"
- Install Node.js from https://nodejs.org/
- Make sure to check "Add to PATH" during installation
- Restart your terminal after installation

## Game Controls

- **Arrow Up**: Move seahorse up
- **Arrow Down**: Move seahorse down
- **Spacebar**: Shoot fireballs

Enjoy! 🎮

