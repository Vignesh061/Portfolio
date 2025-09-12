// Background Animation
        const canvas = document.getElementById("bgCanvas");
        const ctx = canvas.getContext("2d");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let balls = [];

        // Color palette for the balls
        const colors = [
            '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7',
            '#dda0dd', '#98d8c8', '#f7dc6f', '#bb8fce', '#85c1e9',
            '#f8c471', '#82e0aa', '#f1948a', '#85929e', '#a9cce3'
        ];

        // Create Ball Objects with different colors
        for (let i = 0; i < 100; i++) {
            balls.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                dx: (Math.random() - 0.5) * 1.5,
                dy: (Math.random() - 0.5) * 1.5,
                opacity: Math.random() * 0.7 + 0.3
            });
        }

        // Draw Balls
        function drawBalls() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            balls.forEach(ball => {
                ctx.globalAlpha = ball.opacity;
                ctx.beginPath();
                ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
                
                // Create gradient for each ball
                const gradient = ctx.createRadialGradient(ball.x, ball.y, 0, ball.x, ball.y, ball.radius);
                gradient.addColorStop(0, ball.color);
                gradient.addColorStop(1, ball.color + '40');
                
                ctx.fillStyle = gradient;
                ctx.fill();
                
                // Add subtle glow effect
                ctx.shadowColor = ball.color;
                ctx.shadowBlur = 10;
                ctx.fill();
                ctx.shadowBlur = 0;

                ball.x += ball.dx;
                ball.y += ball.dy;

                // Bounce from edges
                if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) {
                    ball.dx *= -1;
                }
                if (ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0) {
                    ball.dy *= -1;
                }
            });

            ctx.globalAlpha = 1;
            requestAnimationFrame(drawBalls);
        }

        drawBalls();

        // Adjust canvas on resize
        window.addEventListener("resize", () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });