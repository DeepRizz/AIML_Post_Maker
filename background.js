class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.baseX = x;
        this.baseY = y;
        this.density = (Math.random() * 30) + 1;
        this.color = color;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }

    update(mouse) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX;
                this.x -= dx/10;
            }
            if (this.y !== this.baseY) {
                let dy = this.y - this.baseY;
                this.y -= dy/10;
            }
        }
    }
}

class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = {
            x: undefined,
            y: undefined,
            radius: 150
        };
        
        this.colors = [
            'rgba(0, 200, 255, 0.5)',
            'rgba(0, 155, 255, 0.5)',
            'rgba(0, 100, 255, 0.5)',
            'rgba(100, 0, 255, 0.5)'
        ];

        this.init();
        this.animate();
    }

    init() {
        // Style and append canvas
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.background = 'radial-gradient(circle, #1a1a2e 0%, #16213e 50%, #0d1117 100%)';
        document.body.appendChild(this.canvas);

        // Set canvas size
        this.resize();

        // Create particles
        this.createParticles();

        // Event listeners
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => this.handleMouse(e));
        window.addEventListener('touchmove', (e) => this.handleTouch(e));
        window.addEventListener('touchend', () => {
            this.mouse.x = undefined;
            this.mouse.y = undefined;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.createParticles();
    }

    createParticles() {
        this.particles = [];
        let numberOfParticles = (this.canvas.width * this.canvas.height) / 15000;
        
        for (let i = 0; i < numberOfParticles; i++) {
            let x = Math.random() * this.canvas.width;
            let y = Math.random() * this.canvas.height;
            let color = this.colors[Math.floor(Math.random() * this.colors.length)];
            this.particles.push(new Particle(x, y, color));
        }
    }

    handleMouse(e) {
        this.mouse.x = e.x;
        this.mouse.y = e.y;
    }

    handleTouch(e) {
        e.preventDefault();
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        for (let particle of this.particles) {
            particle.update(this.mouse);
            particle.draw(this.ctx);
        }

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize background when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ParticleBackground();
}); 