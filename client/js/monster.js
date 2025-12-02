// Sea Monster enemy class
export class Monster {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 60;
        this.height = 60;
        this.speed = 2 + Math.random() * 2; // Random speed between 2-4
        this.active = true;
        this.health = 1;
    }

    update() {
        // Move monster to the left
        this.x -= this.speed;
    }

    draw(ctx) {
        if (!this.active) return;

        // Draw sea monster body (simplified octopus-like shape)
        ctx.fillStyle = '#8B4513';
        ctx.beginPath();
        ctx.ellipse(
            this.x + this.width / 2,
            this.y + this.height / 2,
            this.width / 2,
            this.height / 2,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Draw tentacles
        ctx.strokeStyle = '#654321';
        ctx.lineWidth = 3;
        for (let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.moveTo(this.x + this.width / 2, this.y + this.height);
            ctx.quadraticCurveTo(
                this.x + (i - 1.5) * 15,
                this.y + this.height + 20,
                this.x + (i - 1.5) * 15,
                this.y + this.height + 30
            );
            ctx.stroke();
        }

        // Draw eyes
        ctx.fillStyle = '#FF0000';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2 - 10, this.y + this.height / 2 - 5, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2 + 10, this.y + this.height / 2 - 5, 5, 0, Math.PI * 2);
        ctx.fill();
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    isOffScreen() {
        return this.x + this.width < 0;
    }

    takeDamage() {
        this.health--;
        if (this.health <= 0) {
            this.active = false;
            return true; // Monster destroyed
        }
        return false;
    }
}

