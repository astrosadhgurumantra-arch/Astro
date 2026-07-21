import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
}

export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Generate stars with 3D coordinates (x, y, z)
    const starCount = 300;
    const stars: Star[] = [];
    
    const colors = [
      "rgba(255, 255, 255,",      // Pure white
      "rgba(173, 216, 230,",      // Light blue
      "rgba(255, 223, 186,",      // Solar amber
      "rgba(224, 186, 255,",      // Soft violet
    ];

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 2,
        y: (Math.random() - 0.5) * height * 2,
        z: Math.random() * width,
        size: Math.random() * 1.5 + 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse to -0.5 to 0.5 range
      mouseRef.current.targetX = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.targetY = (e.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(document.body);

    const draw = () => {
      ctx.fillStyle = "rgba(4, 4, 12, 0.2)"; // Deep celestial background with trail
      ctx.fillRect(0, 0, width, height);

      // Smoothly interpolate mouse coordinate for high-end cinematic inertia
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const fov = 400; // Field of view focal length
      const centerX = width / 2;
      const centerY = height / 2;

      // Adjust star projection center slightly based on mouse
      const offsetX = mouseRef.current.x * 200;
      const offsetY = mouseRef.current.y * 200;

      for (let i = 0; i < starCount; i++) {
        const star = stars[i];

        // Move star closer in Z depth to simulate forward flight
        star.z -= 0.8;

        // If star goes past screen focal point, reset Z to back
        if (star.z <= 0) {
          star.z = width;
          star.x = (Math.random() - 0.5) * width * 2;
          star.y = (Math.random() - 0.5) * height * 2;
        }

        // Standard 3D perspective projection formula
        const px = (star.x - offsetX) * (fov / star.z) + centerX;
        const py = (star.y - offsetY) * (fov / star.z) + centerY;

        // Calculate opacity based on Z depth (fade in from back, fade out on edges)
        const depthPercent = (width - star.z) / width;
        const alpha = Math.sin(depthPercent * Math.PI) * 0.8;

        if (px >= 0 && px < width && py >= 0 && py < height) {
          // Draw projected star
          const sizeProj = star.size * (fov / star.z);
          ctx.beginPath();
          ctx.arc(px, py, Math.max(0.1, sizeProj), 0, Math.PI * 2);
          ctx.fillStyle = `${star.color}${alpha})`;
          ctx.fill();

          // Add a very subtle halo glow to closer stars
          if (sizeProj > 2.2) {
            ctx.beginPath();
            ctx.arc(px, py, sizeProj * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `${star.color}${alpha * 0.25})`;
            ctx.fill();
          }
        }
      }

      // Draw a cosmic glow nebula in the center
      const gradient = ctx.createRadialGradient(
        centerX - offsetX,
        centerY - offsetY,
        50,
        centerX - offsetX,
        centerY - offsetY,
        height * 0.8
      );
      gradient.addColorStop(0, "rgba(59, 130, 246, 0.05)");  // Deep cosmic indigo
      gradient.addColorStop(0.5, "rgba(147, 51, 234, 0.03)"); // Deep purple
      gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="starfield-canvas"
      className="fixed inset-0 w-full h-full -z-10 bg-[#020208]"
    />
  );
}
