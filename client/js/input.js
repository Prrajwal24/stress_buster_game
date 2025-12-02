// Input handler for keyboard controls
export class InputHandler {
    constructor() {
        this.keys = {};
        this.setupEventListeners();
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.code] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.code] = false;
        });
    }

    isKeyPressed(keyCode) {
        return this.keys[keyCode] || false;
    }

    // Prevent default behavior for game keys
    preventDefault(keys) {
        window.addEventListener('keydown', (e) => {
            if (keys.includes(e.code)) {
                e.preventDefault();
            }
        });
    }
}

