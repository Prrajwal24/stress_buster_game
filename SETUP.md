# 🚀 Quick Setup Guide

## Prerequisites

1. **Node.js** (v14 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: Open terminal and run `node --version`

2. **MongoDB** (Optional - for high scores)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

## Quick Start

### Option 1: Using the Batch File (Windows)
1. Double-click `START_SERVER.bat`
2. Wait for server to start
3. Open browser to `http://localhost:3000`

### Option 2: Manual Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the server:**
   ```bash
   npm start
   ```

3. **Open your browser:**
   - Navigate to: `http://localhost:3000`

## MongoDB Setup (Optional)

The game works without MongoDB, but high scores won't be saved.

### Local MongoDB:
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Server will connect automatically to `mongodb://localhost:27017/seahorse-game`

### MongoDB Atlas (Cloud):
1. Create free account at https://www.mongodb.com/cloud/atlas
2. Create a cluster and get connection string
3. Set environment variable:
   ```bash
   set MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/seahorse-game
   npm start
   ```

## Troubleshooting

### "npm is not recognized"
- Node.js is not installed or not in PATH
- Reinstall Node.js and make sure to check "Add to PATH" during installation

### "Cannot connect to MongoDB"
- Game will still work, but high scores feature will be disabled
- Check MongoDB is running (if using local)
- Verify connection string (if using Atlas)

### Port 3000 already in use
- Change port: `set PORT=8080` then `npm start`
- Or stop the process using port 3000

## Game Controls

- **Arrow Up**: Move seahorse up
- **Arrow Down**: Move seahorse down  
- **Spacebar**: Shoot fireballs

Enjoy the game! 🎮

