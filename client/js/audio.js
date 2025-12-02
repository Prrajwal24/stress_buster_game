// Audio manager for game sounds and music
export class AudioManager {
    constructor() {
        this.bgMusic = document.getElementById('bg-music');
        this.shootSound = document.getElementById('shoot-sound');
        this.hitSound = document.getElementById('hit-sound');
        this.musicEnabled = true;
        this.soundEnabled = true;
    }

    playBackgroundMusic() {
        if (this.musicEnabled && this.bgMusic) {
            this.bgMusic.volume = 0.3;
            this.bgMusic.play().catch(err => {
                console.log('Background music play failed:', err);
            });
        }
    }

    stopBackgroundMusic() {
        if (this.bgMusic) {
            this.bgMusic.pause();
            this.bgMusic.currentTime = 0;
        }
    }

    playShootSound() {
        if (this.soundEnabled && this.shootSound) {
            this.shootSound.volume = 0.5;
            this.shootSound.currentTime = 0;
            this.shootSound.play().catch(err => {
                console.log('Shoot sound play failed:', err);
            });
        }
    }

    playHitSound() {
        if (this.soundEnabled && this.hitSound) {
            this.hitSound.volume = 0.4;
            this.hitSound.currentTime = 0;
            this.hitSound.play().catch(err => {
                console.log('Hit sound play failed:', err);
            });
        }
    }

    setMusicEnabled(enabled) {
        this.musicEnabled = enabled;
        if (!enabled) {
            this.stopBackgroundMusic();
        } else {
            this.playBackgroundMusic();
        }
    }

    setSoundEnabled(enabled) {
        this.soundEnabled = enabled;
    }
}

