// Simplified Aurora - Single Canvas for Performance
const SharedAuroraGrid = {
    chars: ['.', ':', '-', '=', '*', '#', '@', '$'],
    waveOffset: 0,
    lastTime: 0,

    updateWaveOffset(currentTime) {
        const deltaTime = currentTime - this.lastTime;
        this.lastTime = currentTime;
        this.waveOffset += (deltaTime / 1000) * 1.2;
    }
};

class SimpleAurora {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d', { alpha: true, desynchronized: true });
        this.fontSize = 16;
        this.gridSize = this.fontSize;
        this.rows = 0;
        this.cols = 0;

        // Default color (green)
        this.setColor(0, 255, 136);

        this.init();
    }

    setColor(r, g, b) {
        this.colorR = r;
        this.colorG = g;
        this.colorB = b;
        this.color = `rgba(${r}, ${g}, ${b}, 1)`;
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize());
        requestAnimationFrame((time) => this.animate(time));
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.rows = Math.floor(this.canvas.height / this.gridSize);
        this.cols = Math.floor(this.canvas.width / this.gridSize);
    }

    animate(currentTime) {
        SharedAuroraGrid.updateWaveOffset(currentTime);

        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const centerY = this.canvas.height / 2;
        const maxDistance = this.canvas.height / 2;
        this.ctx.font = `bold ${this.fontSize}px monospace`;

        const waveOffset = SharedAuroraGrid.waveOffset;
        const chars = SharedAuroraGrid.chars;
        const charsLength = chars.length - 1;

        // Draw all characters for full density
        for (let row = 0; row < this.rows; row++) {
            const y = row * this.gridSize + this.gridSize;
            const distanceFromCenter = Math.abs(y - centerY);
            const centerGradient = 1 - (distanceFromCenter / maxDistance) * 0.7;

            for (let col = 0; col < this.cols; col++) {
                const x = col * this.gridSize;
                const colRatio = col / this.cols;

                // Three overlapping waves
                const wave1Phase = colRatio * 12.566370614359172 + waveOffset;
                const wave1Row = ((Math.sin(wave1Phase) * 0.35) + 0.5) * this.rows;
                const intensity1 = Math.max(0, 1 - Math.abs(row - wave1Row) * 0.02);

                const wave2Phase = colRatio * 9.42477796076938 + waveOffset * 0.7;
                const wave2Row = ((Math.sin(wave2Phase) * 0.3) + 0.5) * this.rows;
                const intensity2 = Math.max(0, 1 - Math.abs(row - wave2Row) * 0.02);

                const wave3Phase = colRatio * 15.707963267948966 + waveOffset * 1.3;
                const wave3Row = ((Math.sin(wave3Phase) * 0.25) + 0.5) * this.rows;
                const intensity3 = Math.max(0, 1 - Math.abs(row - wave3Row) * 0.02);

                const waveIntensity = Math.max(intensity1, intensity2, intensity3);
                let intensity = waveIntensity * centerGradient * (0.85 + ((row * 7 + col * 13) % 100) * 0.0015015015);

                if (intensity > 0.05) {
                    const charIndex = Math.floor(Math.pow(intensity, 0.7) * charsLength);
                    const char = chars[charIndex];

                    if (intensity > 0.8) {
                        const blendToWhite = (intensity - 0.8) * 5;
                        const blendedR = Math.round(this.colorR + (255 - this.colorR) * blendToWhite * 0.9);
                        const blendedG = Math.round(this.colorG + (255 - this.colorG) * blendToWhite * 0.9);
                        const blendedB = Math.round(this.colorB + (255 - this.colorB) * blendToWhite * 0.9);
                        this.ctx.fillStyle = `rgba(${blendedR}, ${blendedG}, ${blendedB}, ${intensity * 0.2})`;
                        this.ctx.fillText(char, x, y);
                    } else if (intensity > 0.65) {
                        const lightenAmount = (intensity - 0.65) / 0.15;
                        const lightR = Math.round(this.colorR + (255 - this.colorR) * lightenAmount * 0.4);
                        const lightG = Math.round(this.colorG + (255 - this.colorG) * lightenAmount * 0.4);
                        const lightB = Math.round(this.colorB + (255 - this.colorB) * lightenAmount * 0.4);
                        this.ctx.fillStyle = `rgba(${lightR}, ${lightG}, ${lightB}, ${intensity * 0.2})`;
                        this.ctx.fillText(char, x, y);
                    } else if (intensity > 0.5) {
                        this.ctx.fillStyle = `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, ${intensity * 0.2})`;
                        this.ctx.fillText(char, x, y);
                    } else if (intensity > 0.25) {
                        this.ctx.fillStyle = `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, ${intensity * 0.16})`;
                        this.ctx.fillText(char, x, y);
                    } else {
                        this.ctx.fillStyle = `rgba(${this.colorR}, ${this.colorG}, ${this.colorB}, ${intensity * 0.1})`;
                        this.ctx.fillText(char, x, y);
                    }
                }
            }
        }

        requestAnimationFrame((time) => this.animate(time));
    }
}

// Initialize when page loads
let auroraInstance = null;

window.addEventListener('load', () => {
    const canvas = document.getElementById('aurora-canvas');
    if (canvas) {
        auroraInstance = new SimpleAurora(canvas);
    }
});

// Expose function to change aurora color
window.setAuroraColor = (r, g, b) => {
    if (auroraInstance) {
        auroraInstance.setColor(r, g, b);
    }
};
