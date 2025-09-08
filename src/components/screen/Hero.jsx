import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import "../../App.css";


function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const points = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: 2.5,
      dx: (Math.random() - 0.5) * 0.6,
      dy: (Math.random() - 0.5) * 0.6,
    }));

    let mouse = { x: null, y: null };

    canvas.addEventListener("mousemove", (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      points.forEach((p) => {
       
        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        
        if (mouse.x && mouse.y) {
          const dist = Math.hypot(p.x - mouse.x, p.y - mouse.y);
          if (dist < 100) {
            const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x);
            p.x += Math.cos(angle) * 1.5;
            p.y += Math.sin(angle) * 1.5;
          }
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "#111"; 
        ctx.fill();
      });

     
      ctx.strokeStyle = "rgba(100,100,100,0.25)";
      points.forEach((a) => {
        points.forEach((b) => {
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full -z-10 hero-canvas"
    />
  );
}


export default function Hero() {
  const headingVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: (i) => ({
      y: 0,
      opacity: 1,
      transition: { delay: i * 0.3, duration: 0.8, type: "spring" },
    }),
  };

  return (
    <section className="relative flex flex-col items-center justify-center min-h-screen px-6 lg:px-20 bg-white dark:bg-gray-900 overflow-hidden transition-colors duration-300">
      <AnimatedBackground />

     
      <div className="text-center max-w-3xl mt-20 relative z-10">
        {["Design", "Transform", "Accelerate"].map((word, i) => (
          <motion.h1
            key={i}
            custom={i}
            variants={headingVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight"
          >
            {word}
          </motion.h1>
        ))}

        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-6 text-lg text-gray-600 dark:text-gray-300"
        >
          Redefining user experiences through Behavioral Science & AI
        </motion.p>

        
        <motion.a
          href="#work"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-8 inline-flex items-center px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-md text-lg font-semibold shadow-lg hover:shadow-2xl hover:bg-gray-800 dark:hover:bg-gray-200 transition relative overflow-hidden group"
        >
          <span className="relative z-10">Explore Our Work</span>
          <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.a>
      </div>
    </section>
  );
}
