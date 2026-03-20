'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { calculateLunarSign } from '@/lib/lunar-signs';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiLunaWidgetProps {
  isEmbed?: boolean;
}

// URL de l'API Luna - Utiliser directement la fonction Netlify
// En développement local, utiliser l'API route Next.js
const API_URL = typeof window !== 'undefined' && window.location.hostname === 'localhost'
  ? '/api/luna-chat'
  : '/.netlify/functions/luna-chat';

// Extraire le contexte du signe lunaire depuis le message
const extractLunarSignContext = (content: string): string => {
  const monthNames: Record<string, number> = {
    'janvier': 1, 'février': 2, 'mars': 3, 'avril': 4, 'mai': 5, 'juin': 6,
    'juillet': 7, 'août': 8, 'septembre': 9, 'octobre': 10, 'novembre': 11, 'décembre': 12
  };

  const datePatterns = [
    /(\d{1,2})[\/\-\s](\d{1,2})[\/\-\s](\d{4})/,
    /(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/i,
    /(?:le\s+)?(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/i,
    /né(?:e)?\s+(?:le\s+)?(\d{1,2})[\/\-\s](\d{1,2})[\/\-\s](\d{4})/i,
  ];

  for (const pattern of datePatterns) {
    const match = content.toLowerCase().match(pattern);
    if (match) {
      let day: number, month: number, year: number;
      
      if (match[2] && isNaN(parseInt(match[2]))) {
        day = parseInt(match[1]);
        month = monthNames[match[2].toLowerCase()] || 1;
        year = parseInt(match[3]);
      } else {
        day = parseInt(match[1]);
        month = parseInt(match[2]);
        year = parseInt(match[3]);
      }

      const lunarSign = calculateLunarSign(day, month, year);
      if (lunarSign) {
        return `
INFORMATIONS CALCULÉES:
Le signe lunaire calculé pour cette personne est: ${lunarSign.name} (${lunarSign.symbol})

Détails du signe:
- Élément: ${lunarSign.element}
- Planète gouvernante: ${lunarSign.planet}
- Pierre: ${lunarSign.stone}
- Mot-clé: ${lunarSign.keyword}

Description: ${lunarSign.description}

Besoins émotionnels: ${lunarSign.emotionalNeeds}

En amour: ${lunarSign.inLove}

Conseils personnalisés: ${lunarSign.advice}

Donne une interprétation personnalisée et bienveillante de ce signe lunaire à la personne.
`;
      }
      break;
    }
  }
  return '';
};

// Composant pour le ciel étoilé animé AVEC ÉTOILES FILANTES
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

    // Étoiles scintillantes
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

    // Étoiles filantes
    const shootingStars: { x: number; y: number; length: number; speed: number; angle: number; alpha: number }[] = [];

    let animationId: number;
    const animate = () => {
      // Background dégradé
      ctx.fillStyle = '#0B1F3A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dégradé violet mystique
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(43, 15, 58, 0.4)');
      gradient.addColorStop(1, 'rgba(11, 31, 58, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dessiner les étoiles avec halo doré
      stars.forEach(star => {
        star.alpha += star.alphaChange;
        if (star.alpha >= 1 || star.alpha <= 0.2) {
          star.alphaChange = -star.alphaChange;
        }

        // Halo doré
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 177, 90, ${star.alpha * 0.2})`;
        ctx.fill();

        // Étoile
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 177, 90, ${star.alpha})`;
        ctx.fill();
      });

      // Ajouter des étoiles filantes
      if (Math.random() < 0.005) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 100 + 60,
          speed: Math.random() * 12 + 8,
          angle: Math.PI / 4,
          alpha: 1
        });
      }

      // Dessiner les étoiles filantes
      shootingStars.forEach((star, index) => {
        // Traînée lumineuse
        const gradient2 = ctx.createLinearGradient(
          star.x, star.y,
          star.x - star.length * Math.cos(star.angle),
          star.y - star.length * Math.sin(star.angle)
        );
        gradient2.addColorStop(0, `rgba(216, 177, 90, ${star.alpha})`);
        gradient2.addColorStop(1, 'rgba(216, 177, 90, 0)');

        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - star.length * Math.cos(star.angle),
          star.y - star.length * Math.sin(star.angle)
        );
        ctx.strokeStyle = gradient2;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Point brillant
        ctx.beginPath();
        ctx.arc(star.x, star.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.x += star.speed * Math.cos(star.angle);
        star.y += star.speed * Math.sin(star.angle);
        star.alpha -= 0.008;

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
      style={{ zIndex: 0 }}
    />
  );
}

export default function AiLunaWidget({ isEmbed = false }: AiLunaWidgetProps) {
  const [isOpen, setIsOpen] = useState(isEmbed);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Message de bienvenue initial
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: '🌙 Bienvenue, voyageur des étoiles !\n\nJe suis Luna, votre guide spirituelle. Je suis ici pour vous aider à découvrir votre signe lunaire et à comprendre son influence sur votre vie émotionnelle.\n\n✨ Pour commencer, dites-moi votre date de naissance (jour, mois, année) et je révélerai les secrets de votre Lune natale...'
        }
      ]);
    }
  }, [isOpen, messages.length]);

  // Scroll automatique vers le bas
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Calculer le contexte du signe lunaire côté client
      const lunarSignContext = extractLunarSignContext(inputValue);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage],
          lunarSignContext 
        })
      });

      const data = await response.json();

      if (data.success) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.message }]);
      } else {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: '🌟 Désolée, une perturbation cosmique m\'empêche de répondre. Pouvez-vous reformuler votre question?'
        }]);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '🌟 Les étoiles sont momentanément voilées... Veuillez réessayer dans un instant.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Version embed (plein écran) - AVEC LE BEAU BACKGROUND
  if (isEmbed) {
    return (
      <div className="h-screen w-screen flex flex-col overflow-hidden relative" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #2B0F3A 50%, #0B1F3A 100%)' }}>
        <StarryBackground />
        
        {/* En-tête FIXE - Design Or Magnifique */}
        <div className="flex-shrink-0 relative z-10 px-6 py-4" style={{ 
          background: 'linear-gradient(180deg, rgba(216, 177, 90, 0.15) 0%, transparent 100%)',
          borderBottom: '2px solid rgba(216, 177, 90, 0.5)'
        }}>
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-pulse" style={{
                background: 'radial-gradient(circle, rgba(216, 177, 90, 0.6) 0%, transparent 70%)',
                filter: 'blur(10px)'
              }} />
              <div className="w-14 h-14 rounded-full overflow-hidden relative" style={{ 
                border: '3px solid #D8B15A',
                boxShadow: '0 0 20px rgba(216, 177, 90, 0.5)'
              }}>
                <img 
                  src="/deesse-lunaire.png" 
                  alt="Luna" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold" style={{ 
                color: '#D8B15A', 
                fontFamily: 'Georgia, serif',
                textShadow: '0 0 20px rgba(216, 177, 90, 0.6)'
              }}>
                Luna
              </h1>
              <p className="text-sm" style={{ color: 'rgba(216, 177, 90, 0.8)' }}>Votre guide lunaire</p>
            </div>
          </div>
        </div>

        {/* Messages avec SCROLL */}
        <div className="flex-1 overflow-y-auto relative z-10 px-6 py-4 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="relative shrink-0">
                  <div className="w-10 h-10 rounded-full overflow-hidden" style={{ 
                    border: '2px solid #D8B15A',
                    boxShadow: '0 0 15px rgba(216, 177, 90, 0.4)'
                  }}>
                    <img 
                      src="/deesse-lunaire.png" 
                      alt="Luna" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}
              <div
                className={`max-w-[80%] p-4 rounded-2xl whitespace-pre-wrap ${
                  msg.role === 'user'
                    ? 'rounded-br-sm'
                    : 'rounded-bl-sm'
                }`}
                style={{
                  fontFamily: 'Georgia, serif',
                  background: msg.role === 'user' 
                    ? 'linear-gradient(135deg, rgba(216, 177, 90, 0.3) 0%, rgba(184, 150, 58, 0.2) 100%)'
                    : 'linear-gradient(135deg, rgba(43, 15, 58, 0.6) 0%, rgba(11, 31, 58, 0.6) 100%)',
                  color: msg.role === 'user' ? '#D8B15A' : 'rgba(255, 255, 255, 0.9)',
                  border: msg.role === 'user' 
                    ? '2px solid rgba(216, 177, 90, 0.5)'
                    : '1px solid rgba(216, 177, 90, 0.3)',
                  boxShadow: msg.role === 'user' 
                    ? '0 0 20px rgba(216, 177, 90, 0.3)'
                    : '0 4px 20px rgba(0, 0, 0, 0.2)'
                }}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0" style={{ 
                border: '2px solid #D8B15A',
                boxShadow: '0 0 15px rgba(216, 177, 90, 0.4)'
              }}>
                <img 
                  src="/deesse-lunaire.png" 
                  alt="Luna" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 rounded-2xl rounded-bl-sm" style={{
                background: 'linear-gradient(135deg, rgba(43, 15, 58, 0.6) 0%, rgba(11, 31, 58, 0.6) 100%)',
                border: '1px solid rgba(216, 177, 90, 0.3)'
              }}>
                <div className="flex gap-2">
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#D8B15A', animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#D8B15A', animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#D8B15A', animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input FIXE en bas - Design Or */}
        <div className="flex-shrink-0 relative z-10 p-6" style={{ 
          background: 'linear-gradient(0deg, rgba(216, 177, 90, 0.1) 0%, transparent 100%)',
          borderTop: '2px solid rgba(216, 177, 90, 0.4)'
        }}>
          <div className="flex gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Écrivez votre message..."
              className="flex-1 text-white placeholder:text-[#D8B15A]/50"
              style={{ 
                fontFamily: 'Georgia, serif',
                background: 'rgba(11, 31, 58, 0.8)',
                border: '2px solid rgba(216, 177, 90, 0.5)',
                borderRadius: '25px',
                padding: '12px 20px'
              }}
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="px-6 rounded-full font-semibold transition-all hover:scale-105 disabled:opacity-50"
              style={{ 
                background: 'linear-gradient(135deg, #D8B15A 0%, #B8963A 100%)',
                color: '#0B1F3A',
                boxShadow: '0 0 25px rgba(216, 177, 90, 0.5)'
              }}
            >
              ✨
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Version widget (pastille) - Design Or Magnifique
  return (
    <>
      {/* Bouton pastille - Design Or Lumineux */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 rounded-full overflow-hidden hover:scale-110 transition-all duration-300 z-50 ${isOpen ? 'hidden' : ''}`}
        style={{ 
          width: '70px',
          height: '70px',
          background: 'linear-gradient(135deg, #D8B15A 0%, #B8963A 100%)',
          boxShadow: '0 0 40px rgba(216, 177, 90, 0.7), 0 0 80px rgba(216, 177, 90, 0.4)',
          border: '3px solid rgba(255, 255, 255, 0.4)'
        }}
      >
        <img 
          src="/deesse-lunaire.png" 
          alt="Luna" 
          className="w-full h-full object-cover"
        />
      </button>

      {/* Fenêtre de chat - Design Or Élégant */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 w-[380px] h-[550px] max-h-[85vh] rounded-3xl overflow-hidden shadow-2xl z-50 flex flex-col"
          style={{
            background: 'linear-gradient(160deg, #0B1F3A 0%, #1a0f2e 50%, #0B1F3A 100%)',
            boxShadow: '0 0 50px rgba(216, 177, 90, 0.4), 0 25px 50px rgba(0, 0, 0, 0.5)',
            border: '2px solid rgba(216, 177, 90, 0.5)'
          }}
        >
          {/* En-tête - Design Or Élégant */}
          <div className="flex-shrink-0 px-5 py-4 flex items-center justify-between" style={{
            background: 'linear-gradient(180deg, rgba(216, 177, 90, 0.2) 0%, transparent 100%)',
            borderBottom: '1px solid rgba(216, 177, 90, 0.4)'
          }}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 rounded-full" style={{
                  background: 'radial-gradient(circle, rgba(216, 177, 90, 0.6) 0%, transparent 70%)',
                  filter: 'blur(8px)'
                }} />
                <div className="w-11 h-11 rounded-full overflow-hidden relative" style={{ 
                  border: '2px solid #D8B15A',
                  boxShadow: '0 0 15px rgba(216, 177, 90, 0.5)'
                }}>
                  <img 
                    src="/deesse-lunaire.png" 
                    alt="Luna" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-bold" style={{ 
                  color: '#D8B15A', 
                  fontFamily: 'Georgia, serif',
                  textShadow: '0 0 15px rgba(216, 177, 90, 0.6)'
                }}>
                  Luna
                </h2>
                <p className="text-xs" style={{ color: 'rgba(216, 177, 90, 0.7)' }}>Guide lunaire</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{ 
                color: '#D8B15A',
                background: 'rgba(216, 177, 90, 0.2)',
                border: '1px solid rgba(216, 177, 90, 0.4)'
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages avec SCROLL */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0" style={{ 
                    border: '2px solid #D8B15A',
                    boxShadow: '0 0 10px rgba(216, 177, 90, 0.4)'
                  }}>
                    <img 
                      src="/deesse-lunaire.png" 
                      alt="Luna" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-2xl whitespace-pre-wrap text-sm ${
                    msg.role === 'user' ? 'rounded-br-md' : 'rounded-bl-md'
                  }`}
                  style={{
                    fontFamily: 'Georgia, serif',
                    background: msg.role === 'user' 
                      ? 'linear-gradient(135deg, rgba(216, 177, 90, 0.35) 0%, rgba(184, 150, 58, 0.25) 100%)'
                      : 'linear-gradient(135deg, rgba(43, 15, 58, 0.6) 0%, rgba(11, 31, 58, 0.6) 100%)',
                    color: msg.role === 'user' ? '#D8B15A' : 'rgba(255, 255, 255, 0.9)',
                    border: msg.role === 'user' 
                      ? '2px solid rgba(216, 177, 90, 0.5)'
                      : '1px solid rgba(216, 177, 90, 0.25)',
                    boxShadow: msg.role === 'user' 
                      ? '0 0 15px rgba(216, 177, 90, 0.25)'
                      : 'none'
                  }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0" style={{ 
                  border: '2px solid #D8B15A',
                  boxShadow: '0 0 10px rgba(216, 177, 90, 0.4)'
                }}>
                  <img 
                    src="/deesse-lunaire.png" 
                    alt="Luna" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 rounded-2xl rounded-bl-md" style={{
                  background: 'linear-gradient(135deg, rgba(43, 15, 58, 0.6) 0%, rgba(11, 31, 58, 0.6) 100%)',
                  border: '1px solid rgba(216, 177, 90, 0.25)'
                }}>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#D8B15A', animationDelay: '0ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#D8B15A', animationDelay: '150ms' }} />
                    <span className="w-2 h-2 rounded-full animate-bounce" style={{ background: '#D8B15A', animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input en bas - Design Or */}
          <div className="flex-shrink-0 p-4" style={{
            background: 'linear-gradient(0deg, rgba(216, 177, 90, 0.1) 0%, transparent 100%)',
            borderTop: '1px solid rgba(216, 177, 90, 0.4)'
          }}>
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Votre message..."
                className="flex-1 text-white placeholder:text-[#D8B15A]/50 text-sm"
                style={{ 
                  fontFamily: 'Georgia, serif',
                  background: 'rgba(11, 31, 58, 0.7)',
                  border: '2px solid rgba(216, 177, 90, 0.5)',
                  borderRadius: '20px',
                  padding: '10px 16px'
                }}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="px-4 rounded-full font-semibold transition-all hover:scale-105 disabled:opacity-50"
                style={{ 
                  background: 'linear-gradient(135deg, #D8B15A 0%, #B8963A 100%)',
                  color: '#0B1F3A',
                  boxShadow: '0 0 20px rgba(216, 177, 90, 0.5)'
                }}
              >
                ✨
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
