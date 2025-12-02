// Sea Horse player class
export class Seahorse {
    constructor(x, y, canvasHeight) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 60;
        this.speed = 5;
        this.canvasHeight = canvasHeight;
        this.autoMoveSpeed = 1; // Automatic forward movement
    }

    update(input) {
        // Automatic forward movement
        this.x += this.autoMoveSpeed;

        // Player-controlled vertical movement
        if (input.isKeyPressed('ArrowUp')) {
            this.y = Math.max(0, this.y - this.speed);
        }
        if (input.isKeyPressed('ArrowDown')) {
            this.y = Math.min(this.canvasHeight - this.height, this.y + this.speed);
        }
    }

    draw(ctx) {
        // Draw seahorse body
        ctx.fillStyle = '#FF69B4';
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height / 3);
        ctx.lineTo(this.x + this.width * 0.8, this.y + this.height / 2);
        ctx.lineTo(this.x + this.width, this.y + this.height * 0.7);
        ctx.lineTo(this.x + this.width / 2, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height * 0.7);
        ctx.lineTo(this.x + this.width * 0.2, this.y + this.height / 2);
        ctx.lineTo(this.x, this.y + this.height / 3);
        ctx.closePath();
        ctx.fill();

        // Draw seahorse head
        ctx.fillStyle = '#FF1493';
        ctx.beginPath();
        ctx.ellipse(
            this.x + this.width / 2,
            this.y + this.height / 4,
            this.width / 4,
            this.height / 6,
            0,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Draw eye
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(this.x + this.width / 2 + 5, this.y + this.height / 4, 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw tail (curved)
        ctx.strokeStyle = '#FF69B4';
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y + this.height);
        ctx.quadraticCurveTo(
            this.x + this.width / 2 - 10,
            this.y + this.height + 15,
            this.x + this.width / 2 - 5,
            this.y + this.height + 25
        );
        ctx.stroke();
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }

    getFireballSpawnPosition() {
        return {
            x: this.x + this.width,
            y: this.y + this.height / 2 - 10
        };
    }
}

