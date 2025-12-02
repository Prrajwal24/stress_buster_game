# 🐴 Sea Horse Adventure - 2D Browser Game

A complete 2D browser game built with HTML5 Canvas, vanilla JavaScript, Node.js, Express, and MongoDB.

## 🎮 Game Features

- **Player (Sea Horse)**: Automatically moves forward, controlled with arrow keys
- **Enemies (Sea Monsters)**: Spawn from the right, move toward the player
- **Combat**: Shoot fireballs with spacebar to destroy enemies
- **Score System**: Earn points by destroying monsters
- **High Scores**: Save and view top scores via MongoDB backend
- **Audio**: Background music and sound effects
- **Responsive Design**: Works on desktop and mobile devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas connection string)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start MongoDB:**
   - If using local MongoDB, make sure it's running on `mongodb://localhost:27017`
   - Or set the `MONGODB_URI` environment variable for a remote connection

3. **Start the server:**
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
.
├── client/
│   ├── index.html          # Main HTML file
│   ├── style.css           # Game styling
│   ├── js/
│   │   ├── game.js         # Main game logic
│   │   ├── seahorse.js     # Player class
│   │   ├── monster.js      # Enemy class
│   │   ├── fireball.js     # Projectile class
│   │   ├── input.js        # Input handler
│   │   └── audio.js        # Audio manager
│   └── assets/             # Audio files (create this folder)
│       ├── bg-music.mp3    # Background music
│       ├── shoot.mp3       # Shooting sound
│       └── hit.mp3         # Hit sound
├── server/
│   ├── index.js            # Express server
│   ├── routes/
│   │   └── scores.js       # Score API routes
│   └── models/
│       └── Score.js        # MongoDB score model
├── package.json
└── README.md
```

## 🎯 Controls

- **Arrow Up**: Move seahorse up
- **Arrow Down**: Move seahorse down
- **Spacebar**: Shoot fireballs

## 🔧 Configuration

### MongoDB Connection

Set the `MONGODB_URI` environment variable to use a remote MongoDB instance:

```bash
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/seahorse-game npm start
```

### Server Port

Change the port by setting the `PORT` environment variable:

```bash
PORT=8080 npm start
```

## 📝 API Endpoints

### GET `/api/scores`
Get top scores (default: top 10)

**Query Parameters:**
- `limit` (optional): Number of scores to return

**Response:**
```json
[
  { "name": "Player1", "score": 100, "date": "2024-01-01T00:00:00.000Z" },
  { "name": "Player2", "score": 90, "date": "2024-01-01T00:00:00.000Z" }
]
```

### POST `/api/scores`
Save a new score

**Request Body:**
```json
{
  "name": "Player1",
  "score": 100
}
```

**Response:**
```json
{
  "_id": "...",
  "name": "Player1",
  "score": 100,
  "date": "2024-01-01T00:00:00.000Z"
}
```

## 🎵 Audio Files

The game expects audio files in `client/assets/`:
- `bg-music.mp3` - Background music (looped)
- `shoot.mp3` - Fireball shooting sound
- `hit.mp3` - Monster hit/destruction sound

**Note:** If audio files are not available, the game will still work but without sound. You can add your own audio files or use placeholder files.

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6 Modules)
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Game Engine**: HTML5 Canvas with requestAnimationFrame

## 📄 License

MIT

## 🎨 Customization

Feel free to customize:
- Game speed and difficulty
- Enemy spawn rates
- Visual styles and colors
- Audio files
- Score calculation

Enjoy the game! 🎮

