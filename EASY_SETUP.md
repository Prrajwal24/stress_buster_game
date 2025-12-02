# 🚀 EASY SETUP - Follow These Steps

## Step 1: Install Node.js (ONE TIME ONLY)

1. **Download Node.js:**
   - Open your browser
   - Go to: **https://nodejs.org/**
   - Click the big green **"LTS"** button
   - This downloads the Windows installer

2. **Install Node.js:**
   - Double-click the downloaded file (e.g., `node-v20.x.x-x64.msi`)
   - Click "Next" → "Next" → "Next" → "Install"
   - Wait for installation to complete
   - Click "Finish"

3. **IMPORTANT: Restart your terminal/PowerShell**
   - Close this window completely
   - Open a NEW PowerShell/Command Prompt window
   - Navigate back to this folder:
     ```bash
     cd "C:\Users\prraj\OneDrive\Desktop\fsd project"
     ```

## Step 2: Install Dependencies

In your terminal, run:
```bash
npm install
```

Wait for it to finish (may take 1-2 minutes)

## Step 3: Start the Server

Run:
```bash
npm start
```

You should see:
```
🚀 Server running on http://localhost:8000
```

## Step 4: Play the Game!

1. Open your web browser
2. Go to: **http://localhost:8000**
3. Click "Start Game"
4. Use Arrow Keys to move, Spacebar to shoot!

---

## Quick Commands Summary

```bash
# Install dependencies (first time only)
npm install

# Start the server
npm start

# Stop the server
Press Ctrl+C
```

---

## Troubleshooting

### "npm is not recognized"
- **Solution:** You didn't restart your terminal after installing Node.js
- Close and reopen your terminal, then try again

### "Port 8000 already in use"
- **Solution:** Another program is using port 8000
- Change port in `server/index.js` (line 8) to 8001 or 3000

### "Cannot find module"
- **Solution:** Run `npm install` again

### MongoDB errors
- **This is OK!** The game works without MongoDB
- High scores just won't be saved

---

## Need Help?

If you're still having issues:
1. Make sure Node.js is installed: `node --version`
2. Make sure npm is installed: `npm --version`
3. If both work, run `npm install` then `npm start`


