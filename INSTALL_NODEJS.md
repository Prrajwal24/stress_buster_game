# 📦 Install Node.js - Step by Step Guide

## Quick Installation

1. **Download Node.js:**
   - Go to: https://nodejs.org/
   - Click the **LTS (Long Term Support)** version button
   - This will download the Windows installer

2. **Run the Installer:**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installation wizard
   - **IMPORTANT:** Make sure "Add to PATH" is checked (it should be by default)
   - Click "Install" and wait for it to complete

3. **Verify Installation:**
   - Close and reopen your terminal/command prompt
   - Run these commands to verify:
     ```bash
     node --version
     npm --version
     ```
   - You should see version numbers (e.g., v18.17.0 and 9.6.7)

4. **Install Dependencies:**
   ```bash
   npm install
   ```

5. **Start the Server:**
   ```bash
   npm start
   ```

6. **Open the Game:**
   - Open your browser
   - Go to: http://localhost:8000

## Alternative: Using Chocolatey (if you have it)

If you have Chocolatey package manager installed:
```bash
choco install nodejs
```

## Alternative: Using Winget (Windows 10/11)

If you have Windows Package Manager:
```bash
winget install OpenJS.NodeJS.LTS
```

## Troubleshooting

### "npm is not recognized" after installation
- **Restart your terminal/command prompt** (close and reopen)
- If still not working, restart your computer
- Check if Node.js is in PATH:
  ```powershell
  $env:PATH -split ';' | Select-String node
  ```

### Still having issues?
- Make sure you downloaded the **Windows Installer (.msi)** version
- During installation, ensure "Add to PATH" option is checked
- Try installing as Administrator

## After Installation

Once Node.js is installed, come back to this folder and run:
```bash
npm install
npm start
```

Then open http://localhost:8000 in your browser! 🎮

