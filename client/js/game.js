import { InputHandler } from './input.js';
import { AudioManager } from './audio.js';
import { Seahorse } from './seahorse.js';
import { Monster } from './monster.js';
import { Fireball } from './fireball.js';

class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        
        this.input = new InputHandler();
        this.audio = new AudioManager();
        
        this.seahorse = null;
        this.monsters = [];
        this.fireballs = [];
        
        this.score = 0;
        this.gameState = 'start'; // start, playing, gameOver
        this.lastMonsterSpawn = 0;
        this.monsterSpawnInterval = 2000; // Spawn every 2 seconds
        this.lastFireballTime = 0;
        this.fireballCooldown = 300; // 300ms between shots
        
        this.setupEventListeners();
        this.setupScreens();
    }

    setupCanvas() {
        // Set canvas size
        this.canvas.width = 1000;
        this.canvas.height = 600;
        
        // Handle window resize
        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
        this.resizeCanvas();
    }

    resizeCanvas() {
        const container = document.getElementById('game-container');
        const maxWidth = Math.min(1200, window.innerWidth - 40);
        const maxHeight = window.innerHeight - 40;
        
        const scale = Math.min(
            maxWidth / this.canvas.width,
            maxHeight / this.canvas.height
        );
        
        this.canvas.style.width = (this.canvas.width * scale) + 'px';
        this.canvas.style.height = (this.canvas.height * scale) + 'px';
    }

    setupEventListeners() {
        document.getElementById('start-btn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('restart-btn').addEventListener('click', () => {
            this.startGame();
        });

        document.getElementById('menu-btn').addEventListener('click', () => {
            this.showStartScreen();
        });

        document.getElementById('save-score-btn').addEventListener('click', () => {
            this.saveScore();
        });

        // Prevent default behavior for game keys
        this.input.preventDefault(['ArrowUp', 'ArrowDown', 'Space']);
    }

    setupScreens() {
        this.showStartScreen();
        this.loadHighScores();
    }

    showStartScreen() {
        this.gameState = 'start';
        document.getElementById('start-screen').classList.remove('hidden');
        document.getElementById('game-screen').classList.add('hidden');
        document.getElementById('game-over-screen').classList.add('hidden');
        this.audio.stopBackgroundMusic();
    }

    startGame() {
        this.gameState = 'playing';
        this.score = 0;
        this.monsters = [];
        this.fireballs = [];
        this.lastMonsterSpawn = Date.now();
        this.lastFireballTime = 0;
        
        // Initialize seahorse at left side
        this.seahorse = new Seahorse(50, this.canvas.height / 2 - 30, this.canvas.height);
        
        // Show game screen
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('game-over-screen').classList.add('hidden');
        document.getElementById('game-screen').classList.remove('hidden');
        
        // Start audio
        this.audio.playBackgroundMusic();
        
        // Start game loop
        this.gameLoop();
    }

    gameLoop() {
        if (this.gameState !== 'playing') return;

        this.update();
        this.draw();
        
        requestAnimationFrame(() => this.gameLoop());
    }

    update() {
        // Update seahorse
        this.seahorse.update(this.input);

        // Spawn monsters
        const now = Date.now();
        if (now - this.lastMonsterSpawn > this.monsterSpawnInterval) {
            this.spawnMonster();
            this.lastMonsterSpawn = now;
        }

        // Handle shooting
        if (this.input.isKeyPressed('Space')) {
            const now = Date.now();
            if (now - this.lastFireballTime > this.fireballCooldown) {
                this.shootFireball();
                this.lastFireballTime = now;
            }
        }

        // Update fireballs
        this.fireballs.forEach(fireball => {
            fireball.update();
        });
        this.fireballs = this.fireballs.filter(fireball => {
            return fireball.active && !fireball.isOffScreen(this.canvas.width);
        });

        // Update monsters
        this.monsters.forEach(monster => {
            monster.update();
        });
        this.monsters = this.monsters.filter(monster => {
            return monster.active && !monster.isOffScreen();
        });

        // Collision detection: Fireballs vs Monsters
        this.fireballs.forEach((fireball, fireballIndex) => {
            if (!fireball.active) return;

            this.monsters.forEach((monster, monsterIndex) => {
                if (!monster.active) return;

                if (this.checkCollision(fireball.getBounds(), monster.getBounds())) {
                    // Hit!
                    fireball.active = false;
                    const destroyed = monster.takeDamage();
                    
                    if (destroyed) {
                        this.score += 10;
                        this.audio.playHitSound();
                        this.updateScore();
                    }
                }
            });
        });

        // Collision detection: Seahorse vs Monsters
        this.monsters.forEach(monster => {
            if (!monster.active) return;

            if (this.checkCollision(this.seahorse.getBounds(), monster.getBounds())) {
                this.gameOver();
            }
        });

        // Check if seahorse went off screen
        if (this.seahorse.x > this.canvas.width) {
            this.gameOver();
        }
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background elements (bubbles)
        this.drawBubbles();

        // Draw seahorse
        this.seahorse.draw(this.ctx);

        // Draw monsters
        this.monsters.forEach(monster => {
            monster.draw(this.ctx);
        });

        // Draw fireballs
        this.fireballs.forEach(fireball => {
            fireball.draw(this.ctx);
        });
    }

    drawBubbles() {
        // Simple bubble effect
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        for (let i = 0; i < 5; i++) {
            const x = (Date.now() / 100 + i * 200) % this.canvas.width;
            const y = (Date.now() / 50 + i * 100) % this.canvas.height;
            const size = 10 + (i % 3) * 5;
            this.ctx.beginPath();
            this.ctx.arc(x, y, size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    spawnMonster() {
        const y = Math.random() * (this.canvas.height - 60);
        const monster = new Monster(this.canvas.width, y);
        this.monsters.push(monster);
    }

    shootFireball() {
        const spawnPos = this.seahorse.getFireballSpawnPosition();
        const fireball = new Fireball(spawnPos.x, spawnPos.y);
        this.fireballs.push(fireball);
        this.audio.playShootSound();
    }

    checkCollision(rect1, rect2) {
        return (
            rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y
        );
    }

    updateScore() {
        document.getElementById('score-value').textContent = this.score;
    }

    gameOver() {
        this.gameState = 'gameOver';
        this.audio.stopBackgroundMusic();
        
        document.getElementById('final-score').textContent = this.score;
        document.getElementById('game-screen').classList.add('hidden');
        document.getElementById('game-over-screen').classList.remove('hidden');
    }

    getApiUrl() {
        // Use current host and port, or default to localhost:8000
        const protocol = window.location.protocol;
        const host = window.location.host;
        return `${protocol}//${host}/api`;
    }

    async saveScore() {
        const playerName = document.getElementById('player-name').value.trim() || 'Anonymous';
        
        try {
            const response = await fetch(`${this.getApiUrl()}/scores`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: playerName,
                    score: this.score
                })
            });

            if (response.ok) {
                alert('Score saved!');
                this.loadHighScores();
            } else {
                const errorData = await response.json().catch(() => ({}));
                console.error('Failed to save score:', errorData);
                alert('Failed to save score. High scores feature may not be available.');
            }
        } catch (error) {
            console.error('Error saving score:', error);
            alert('Failed to save score. Make sure the server is running.');
        }
    }

    async loadHighScores() {
        try {
            const response = await fetch(`${this.getApiUrl()}/scores`);
            if (response.ok) {
                const scores = await response.json();
                const scoresList = document.getElementById('high-scores-list');
                scoresList.innerHTML = '';
                
                if (scores.length === 0) {
                    const li = document.createElement('li');
                    li.textContent = 'No scores yet. Be the first!';
                    scoresList.appendChild(li);
                } else {
                    scores.slice(0, 10).forEach((score, index) => {
                        const li = document.createElement('li');
                        li.textContent = `${index + 1}. ${score.name}: ${score.score}`;
                        scoresList.appendChild(li);
                    });
                }
            }
        } catch (error) {
            console.error('Error loading high scores:', error);
            const scoresList = document.getElementById('high-scores-list');
            if (scoresList) {
                scoresList.innerHTML = '<li>Unable to load scores</li>';
            }
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Game();
});

