import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  flickerRate: number;
}

interface Meteor {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  width: number;
}

const SpaceBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = (): void => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Star properties
    const stars: Star[] = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2,
      brightness: Math.random(),
      flickerRate: 0.01 + Math.random() * 0.02,
    }));

    // Meteor properties
    const meteors: Meteor[] = [];
    const createMeteor = (): Meteor => ({
      x: Math.random() * canvas.width,
      y: 0,
      length: 50 + Math.random() * 100,
      speed: 15 + Math.random() * 10,
      angle: (70 + Math.random() * 20) * (Math.PI / 180), // Angle in radians (70-90 degrees)
      opacity: 1,
      width: 2 + Math.random() * 2,
    });

    // Meteor shower control
    const maxMeteors = 5;
    const meteorSpawnChance = 0.02; // 2% chance per frame to spawn a new meteor

    // Animation loop
    let animationFrame: number;
    const animate = (): void => {
      // Clear canvas with slight fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animate stars
      stars.forEach((star) => {
        star.brightness += star.flickerRate;
        if (star.brightness >= 1 || star.brightness <= 0) {
          star.flickerRate = -star.flickerRate;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.brightness})`;
        ctx.fill();
      });

      // Manage meteors
      if (meteors.length < maxMeteors && Math.random() < meteorSpawnChance) {
        meteors.push(createMeteor());
      }

      // Animate meteors
      for (let i = meteors.length - 1; i >= 0; i--) {
        const meteor = meteors[i];

        // Calculate meteor movement
        const dx = Math.cos(meteor.angle) * meteor.speed;
        const dy = Math.sin(meteor.angle) * meteor.speed;
        meteor.x += dx;
        meteor.y += dy;

        // Draw meteor
        ctx.beginPath();
        ctx.moveTo(meteor.x, meteor.y);
        const tailX = meteor.x - Math.cos(meteor.angle) * meteor.length;
        const tailY = meteor.y - Math.sin(meteor.angle) * meteor.length;

        // Create gradient for meteor tail
        const gradient = ctx.createLinearGradient(
          meteor.x,
          meteor.y,
          tailX,
          tailY
        );
        gradient.addColorStop(0, `rgba(255, 255, 255, ${meteor.opacity})`);
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.lineCap = "round";
        ctx.lineWidth = meteor.width;
        ctx.strokeStyle = gradient;
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        // Remove meteors that are out of bounds
        if (
          meteor.y > canvas.height ||
          meteor.x < 0 ||
          meteor.x > canvas.width
        ) {
          meteors.splice(i, 1);
        }
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={
        {
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: -1,
        } as const
      }
    />
  );
};

export default SpaceBackground;
