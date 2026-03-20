'use client';

import { useState, useEffect, useRef } from 'react';
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
  const [showCode, setShowCode] = useState(false);
  
  const embedCode = `<!-- AI Luna Widget - Version Pastille -->
<script>
  (function() {
    var script = document.createElement('script');
    script.src = 'https://votre-domaine.com/widget.js';
    script.async = true;
    document.head.appendChild(script);
  })();
</script>

<!-- OU Version iframe plein écran -->
<iframe 
  src="https://votre-domaine.com/embed" 
  width="100%" 
  height="600px" 
  frameborder="0"
  style="border-radius: 16px; overflow: hidden;">
</iframe>`;

  return (
    <div className="min-h-screen text-white" style={{ fontFamily: 'Georgia, serif' }}>
      <StarryBackground />
      
      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 flex justify-center">
            <div 
              className="w-32 h-32 rounded-full flex items-center justify-center text-6xl animate-pulse"
              style={{ 
                background: 'linear-gradient(135deg, #D8B15A 0%, #B8963A 100%)',
                boxShadow: '0 0 60px rgba(216, 177, 90, 0.5)'
              }}
            >
              🌙
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
            <button
              onClick={() => setShowCode(!showCode)}
              className="px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105"
              style={{ 
                background: 'linear-gradient(135deg, #D8B15A 0%, #B8963A 100%)',
                color: '#0B1F3A',
                boxShadow: '0 0 30px rgba(216, 177, 90, 0.4)'
              }}
            >
              🔧 Obtenir le code d&apos;intégration
            </button>
            
            <a
              href="/embed"
              target="_blank"
              className="px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 border-2"
              style={{ 
                borderColor: '#D8B15A',
                color: '#D8B15A'
              }}
            >
              👁️ Voir la démo plein écran
            </a>
          </div>
        </div>
      </section>

      {/* Code Integration Section */}
      {showCode && (
        <section className="relative z-10 py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <div 
              className="p-8 rounded-2xl border border-[#D8B15A]/30"
              style={{ background: 'rgba(11, 31, 58, 0.9)' }}
            >
              <h2 className="text-2xl font-semibold text-[#D8B15A] mb-6">
                📋 Code d&apos;intégration pour Systeme.io
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg text-[#D8B15A]/80 mb-2">Option 1: Widget en Pastille (bouton flottant)</h3>
                  <p className="text-white/60 text-sm mb-3">
                    Ajoutez ce code avant la balise &lt;/body&gt; de votre page. Un bouton lune apparaîtra en bas à droite.
                  </p>
                  <div className="bg-[#0B1F3A] p-4 rounded-lg overflow-x-auto">
                    <pre className="text-[#D8B15A] text-sm whitespace-pre-wrap">{`<script src="https://votre-domaine.com/widget.js" async></script>`}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg text-[#D8B15A]/80 mb-2">Option 2: Iframe Plein Écran</h3>
                  <p className="text-white/60 text-sm mb-3">
                    Intégrez directement dans une page ou un popup Systeme.io.
                  </p>
                  <div className="bg-[#0B1F3A] p-4 rounded-lg overflow-x-auto">
                    <pre className="text-[#D8B15A] text-sm whitespace-pre-wrap">{`<iframe 
  src="https://votre-domaine.com/embed" 
  width="100%" 
  height="600px" 
  frameborder="0"
  style="border-radius: 16px;">
</iframe>`}</pre>
                  </div>
                </div>

                <div className="p-4 rounded-lg border border-[#D8B15A]/30 bg-[#2B0F3A]/50">
                  <h4 className="text-[#D8B15A] font-semibold mb-2">💡 Instructions pour Systeme.io:</h4>
                  <ol className="text-white/70 text-sm space-y-2 list-decimal list-inside">
                    <li>Allez dans votre funnel ou site Systeme.io</li>
                    <li>Ajoutez un bloc &quot;HTML/Script&quot; ou &quot;Embed&quot;</li>
                    <li>Collez le code de votre choix</li>
                    <li>Remplacez &quot;votre-domaine.com&quot; par l&apos;URL de votre widget</li>
                  </ol>
                </div>
              </div>

              <button
                onClick={() => setShowCode(false)}
                className="mt-6 text-[#D8B15A]/70 hover:text-[#D8B15A] transition-colors"
              >
                ✕ Fermer
              </button>
            </div>
          </div>
        </section>
      )}

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
