'use client';

import { useEffect, useRef } from 'react';
import AiLunaWidget from '@/components/AiLunaWidget';

// Composant pour le ciel étoilé animé
function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const stars: { x: number; y: number; radius: number; alpha: number; alphaChange: number }[] = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        alphaChange: Math.random() * 0.02 + 0.005
      });
    }

    const shootingStars: { x: number; y: number; length: number; speed: number; angle: number; alpha: number }[] = [];

    let animationId: number;
    const animate = () => {
      ctx.fillStyle = '#0B1F3A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(43, 15, 58, 0.3)');
      gradient.addColorStop(1, 'rgba(11, 31, 58, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        star.alpha += star.alphaChange;
        if (star.alpha >= 1 || star.alpha <= 0.2) {
          star.alphaChange = -star.alphaChange;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 177, 90, ${star.alpha})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 177, 90, ${star.alpha * 0.3})`;
        ctx.fill();
      });

      if (Math.random() < 0.003) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 10 + 5,
          angle: Math.PI / 4,
          alpha: 1
        });
      }

      shootingStars.forEach((star, index) => {
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - star.length * Math.cos(star.angle),
          star.y - star.length * Math.sin(star.angle)
        );
        ctx.strokeStyle = `rgba(216, 177, 90, ${star.alpha})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        star.x += star.speed * Math.cos(star.angle);
        star.y += star.speed * Math.sin(star.angle);
        star.alpha -= 0.01;

        if (star.alpha <= 0 || star.y > canvas.height || star.x > canvas.width) {
          shootingStars.splice(index, 1);
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
}

export default function Home() {
  return (
    <div className="min-h-screen text-white" style={{ fontFamily: 'Georgia, serif' }}>
      <StarryBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo - Déesse Lunaire */}
          <div className="mb-8 flex justify-center">
            <div 
              className="w-40 h-40 rounded-full flex items-center justify-center overflow-hidden"
              style={{ 
                background: 'linear-gradient(135deg, #D8B15A 0%, #B8963A 100%)',
                boxShadow: '0 0 60px rgba(216, 177, 90, 0.5)'
              }}
            >
              <img 
                src="/deesse-lunaire.png" 
                alt="Luna - Déesse Lunaire" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Titre */}
          <h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            style={{ color: '#D8B15A', textShadow: '0 0 40px rgba(216, 177, 90, 0.5)' }}
          >
            AI Luna
          </h1>
          
          <p className="text-xl md:text-2xl text-[#D8B15A]/80 mb-4">
            Découvrez votre signe lunaire
          </p>
          
          <p className="text-lg text-white/70 mb-12 max-w-2xl mx-auto">
            Un widget conversationnel mystique pour révéler les secrets de votre Lune natale. 
            Basé sur le livre &quot;Sous quelle lune êtes-vous née?&quot; de Diane Boyer.
          </p>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div 
              className="p-6 rounded-2xl border border-[#D8B15A]/30 backdrop-blur-sm"
              style={{ background: 'rgba(43, 15, 58, 0.5)' }}
            >
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-[#D8B15A] text-lg font-semibold mb-2">Conversation IA</h3>
              <p className="text-white/70 text-sm">
                Discutez avec Luna pour découvrir votre signe lunaire et obtenir des insights personnalisés.
              </p>
            </div>
            
            <div 
              className="p-6 rounded-2xl border border-[#D8B15A]/30 backdrop-blur-sm"
              style={{ background: 'rgba(43, 15, 58, 0.5)' }}
            >
              <div className="text-4xl mb-4">🔮</div>
              <h3 className="text-[#D8B15A] text-lg font-semibold mb-2">Calcul Précis</h3>
              <p className="text-white/70 text-sm">
                Calcul basé sur les tables éphémérides simplifiées de votre date de naissance.
              </p>
            </div>
            
            <div 
              className="p-6 rounded-2xl border border-[#D8B15A]/30 backdrop-blur-sm"
              style={{ background: 'rgba(43, 15, 58, 0.5)' }}
            >
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-[#D8B15A] text-lg font-semibold mb-2">Facile à Intégrer</h3>
              <p className="text-white/70 text-sm">
                Widget en pastille ou iframe pour Systeme.io et autres plateformes.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.oznya.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #D8B15A 0%, #B8963A 100%)',
                color: '#0B1F3A',
                boxShadow: '0 0 30px rgba(216, 177, 90, 0.4)'
              }}
            >
              ✨ Visitez le site Oznya
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-8 px-4 border-t border-[#D8B15A]/20">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#D8B15A]/60 text-sm">
            🌙 AI Luna - Inspiré du livre &quot;Sous quelle lune êtes-vous née?&quot; de Diane Boyer
          </p>
        </div>
      </footer>

      {/* Widget Luna - bouton flottant */}
      <AiLunaWidget />
    </div>
  );
}
