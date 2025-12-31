import { useEffect, useRef } from 'react';

interface Exchange {
  name: string;
  country: string;
  x: number;
  y: number;
  label: string;
}

const exchanges: Exchange[] = [
  { name: 'NYSE', country: 'USA', x: 51.5, y: 35, label: 'New York' },
  { name: 'LSE', country: 'UK', x: 71.5, y: 45, label: 'London' },
  { name: 'JPX', country: 'Japan', x: 81.5, y: 65, label: 'Tokyo' },
  { name: 'HKEX', country: 'Hong Kong', x: 71.5, y: 85, label: 'Hong Kong' },
  { name: 'BSE', country: 'India', x: 51.5, y: 95, label: 'Mumbai' },
  { name: 'Tadawul', country: 'Saudi Arabia', x: 31.5, y: 85, label: 'Riyadh' },
  { name: 'Euronext', country: 'Europe', x: 21.5, y: 65, label: 'Europe' },
  { name: 'NASDAQ', country: 'USA', x: 31.5, y: 45, label: 'NASDAQ' },
];

export default function GlobalTradingAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let startTime = Date.now();

    const drawGlowingPoint = (x: number, y: number, size: number, color: string, glow: number) => {
      ctx.shadowBlur = glow;
      ctx.shadowColor = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const drawLine = (x1: number, y1: number, x2: number, y2: number, progress: number, color: string) => {
      const currentX = x1 + (x2 - x1) * progress;
      const currentY = y1 + (y2 - y1) * progress;

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 15;
      ctx.shadowColor = color;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(currentX, currentY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      if (progress < 1) {
        drawGlowingPoint(currentX, currentY, 6, color, 25);
        drawJetFighter(currentX, currentY, x2, y2);
      }
    };

    const drawJetFighter = (x: number, y: number, targetX: number, targetY: number) => {
      const angle = Math.atan2(targetY - y, targetX - x);
      const jetSize = canvas.width < 768 ? 25 : 50;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);

      ctx.shadowBlur = 20;
      ctx.shadowColor = '#00D8FF';

      ctx.fillStyle = '#00D8FF';
      ctx.beginPath();
      ctx.moveTo(jetSize * 0.6, 0);
      ctx.lineTo(-jetSize * 0.4, jetSize * 0.15);
      ctx.lineTo(-jetSize * 0.2, 0);
      ctx.lineTo(-jetSize * 0.4, -jetSize * 0.15);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.moveTo(jetSize * 0.3, 0);
      ctx.lineTo(jetSize * 0.1, jetSize * 0.08);
      ctx.lineTo(jetSize * 0.1, -jetSize * 0.08);
      ctx.closePath();
      ctx.fill();

      ctx.shadowBlur = 0;
      ctx.restore();
    };

    const drawText = (text: string, x: number, y: number, size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.font = `bold ${size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.fillText(text, x, y);
      ctx.shadowBlur = 0;
    };

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isMobile = canvas.width < 768;
      const centerX = isMobile ? canvas.width / 2 : canvas.width * 0.7;
      const centerY = isMobile ? canvas.height / 2 : canvas.height * 0.35;
      const maxWidth = isMobile ? canvas.width * 0.85 : canvas.width * 0.35;
      const maxHeight = canvas.height * 0.6;
      const scale = Math.min(maxWidth, maxHeight) / 190;

      if (elapsed < 2) {
        const alpha = Math.min(elapsed / 2, 1);
        const fontSize = isMobile ? 14 : 18;
        const titleY = isMobile ? centerY - canvas.height * 0.35 : centerY - canvas.height * 0.25;
        drawText(
          'Global Trading Infrastructure',
          centerX,
          titleY,
          fontSize,
          `rgba(0, 216, 255, ${alpha * 0.8})`
        );
      }

      exchanges.forEach((exchange, index) => {
        const phaseStart = 2 + index * 0.8;
        const x = centerX + (exchange.x - 50) * scale * 5;
        const y = centerY + (exchange.y - 50) * scale * 3.5;

        if (elapsed >= phaseStart) {
          const phaseProgress = Math.min((elapsed - phaseStart) / 2, 1);
          const pulseSize = 4 + Math.sin(elapsed * 3 + index) * 2;
          const glowSize = 20 + Math.sin(elapsed * 2 + index) * 10;

          if (phaseProgress > 0.3) {
            const textAlpha = Math.min((phaseProgress - 0.3) / 0.7, 1);
            const nameFontSize = canvas.width < 768 ? 13 : 16;
            const labelFontSize = canvas.width < 768 ? 11 : 13;

            ctx.fillStyle = `rgba(255, 255, 255, ${textAlpha})`;
            ctx.font = `bold ${nameFontSize}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.shadowBlur = 8;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            ctx.fillText(exchange.name, x, y - 22);

            ctx.fillStyle = `rgba(0, 216, 255, ${textAlpha * 0.9})`;
            ctx.font = `${labelFontSize}px sans-serif`;
            ctx.shadowBlur = 6;
            ctx.shadowColor = 'rgba(0, 216, 255, 0.5)';
            ctx.fillText(exchange.label, x, y - 8);
            ctx.shadowBlur = 0;
          }

          drawGlowingPoint(x, y, pulseSize, '#00D8FF', glowSize);
        }
      });

      if (elapsed >= 10) {
        const jetPhase = elapsed - 10;
        const connectionSpeed = 1.8;

        exchanges.forEach((_, index) => {
          const nextIndex = (index + 1) % exchanges.length;
          const connectionStart = index * connectionSpeed;

          if (jetPhase >= connectionStart) {
            const progress = Math.min((jetPhase - connectionStart) / connectionSpeed, 1);
            const fromX = centerX + (exchanges[index].x - 50) * scale * 5;
            const fromY = centerY + (exchanges[index].y - 50) * scale * 3.5;
            const toX = centerX + (exchanges[nextIndex].x - 50) * scale * 5;
            const toY = centerY + (exchanges[nextIndex].y - 50) * scale * 3.5;

            drawLine(fromX, fromY, toX, toY, progress, '#00D8FF');
          }
        });
      }

      if (elapsed >= 28) {
        const fadeIn = Math.min((elapsed - 28) / 1.5, 1);
        const logoSize = isMobile ? 24 : 36;
        const logoY = isMobile ? centerY + canvas.height * 0.25 : centerY + canvas.height * 0.18;

        drawText(
          'JetFyX',
          centerX,
          logoY,
          logoSize,
          `rgba(0, 216, 255, ${fadeIn})`
        );

        if (elapsed >= 29.5) {
          const taglineAlpha = Math.min((elapsed - 29.5) / 1, 1);
          const taglineFontSize = isMobile ? 11 : 15;
          const subtitleFontSize = isMobile ? 10 : 13;

          ctx.fillStyle = `rgba(255, 255, 255, ${taglineAlpha})`;
          ctx.font = `${taglineFontSize}px sans-serif`;
          ctx.textAlign = 'center';
          ctx.fillText('Powering Brokers Worldwide', centerX, logoY + 28);
          ctx.fillStyle = `rgba(0, 216, 255, ${taglineAlpha * 0.8})`;
          ctx.font = `bold ${subtitleFontSize}px sans-serif`;
          ctx.fillText('One Platform. All Markets.', centerX, logoY + 48);
        }
      }

      if (elapsed >= 32) {
        startTime = Date.now();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
      style={{ background: 'transparent' }}
    />
  );
}
