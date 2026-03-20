'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AiLunaWidgetProps {
  isEmbed?: boolean;
}

// Composant pour le ciel étoilé animé
function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Définir la taille du canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Créer les étoiles
    const stars: { x: number; y: number; radius: number; alpha: number; alphaChange: number; twinkleSpeed: number }[] = [];
    const numStars = 200;

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5 + 0.5,
        alpha: Math.random(),
        alphaChange: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 0.02 + 0.01
      });
    }

    // Ajouter des étoiles filantes
    const shootingStars: { x: number; y: number; length: number; speed: number; angle: number; alpha: number }[] = [];

    // Animation
    let animationId: number;
    const animate = () => {
      ctx.fillStyle = '#0B1F3A';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Ajouter un dégradé violet
      const gradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      gradient.addColorStop(0, 'rgba(43, 15, 58, 0.3)');
      gradient.addColorStop(1, 'rgba(11, 31, 58, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Dessiner les étoiles
      stars.forEach(star => {
        star.alpha += star.alphaChange;
        if (star.alpha >= 1 || star.alpha <= 0.2) {
          star.alphaChange = -star.alphaChange;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 177, 90, ${star.alpha})`;
        ctx.fill();

        // Ajouter un effet de lueur
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(216, 177, 90, ${star.alpha * 0.3})`;
        ctx.fill();
      });

      // Ajouter occasionnellement une étoile filante
      if (Math.random() < 0.002) {
        shootingStars.push({
          x: Math.random() * canvas.width,
          y: 0,
          length: Math.random() * 80 + 40,
          speed: Math.random() * 10 + 5,
          angle: Math.PI / 4,
          alpha: 1
        });
      }

      // Dessiner les étoiles filantes
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

export default function AiLunaWidget({ isEmbed = false }: AiLunaWidgetProps) {
  const [isOpen, setIsOpen] = useState(isEmbed);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/luna-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage] })
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

  // Version embed (plein écran)
  if (isEmbed) {
    return (
      <div className="fixed inset-0 flex flex-col" style={{ background: 'linear-gradient(135deg, #0B1F3A 0%, #2B0F3A 100%)' }}>
        <StarryBackground />
        
        {/* En-tête */}
        <div className="relative z-10 p-4 border-b border-[#D8B15A]/30">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D8B15A] to-[#B8963A] flex items-center justify-center text-2xl">
              🌙
            </div>
            <div>
              <h1 className="text-xl font-semibold text-[#D8B15A]" style={{ fontFamily: 'Georgia, serif' }}>
                Luna
              </h1>
              <p className="text-sm text-[#D8B15A]/70">Votre guide lunaire</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 relative z-10" ref={scrollRef}>
          <div className="p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {msg.role === 'assistant' && (
                  <Avatar className="w-8 h-8 border-2 border-[#D8B15A]/50">
                    <AvatarFallback className="bg-gradient-to-br from-[#D8B15A] to-[#B8963A] text-[#0B1F3A]">
                      🌙
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#D8B15A]/20 text-[#D8B15A] rounded-br-sm'
                      : 'bg-[#2B0F3A]/50 text-white/90 rounded-bl-sm border border-[#D8B15A]/20'
                  }`}
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="w-8 h-8 border-2 border-[#D8B15A]/50">
                  <AvatarFallback className="bg-gradient-to-br from-[#D8B15A] to-[#B8963A] text-[#0B1F3A]">
                    🌙
                  </AvatarFallback>
                </Avatar>
                <div className="bg-[#2B0F3A]/50 p-4 rounded-2xl rounded-bl-sm border border-[#D8B15A]/20">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-[#D8B15A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#D8B15A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#D8B15A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="relative z-10 p-4 border-t border-[#D8B15A]/30">
          <div className="flex gap-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Écrivez votre message..."
              className="flex-1 bg-[#0B1F3A]/50 border-[#D8B15A]/30 text-white placeholder:text-[#D8B15A]/50 focus:border-[#D8B15A]"
              style={{ fontFamily: 'Georgia, serif' }}
            />
            <Button
              onClick={sendMessage}
              disabled={isLoading || !inputValue.trim()}
              className="bg-gradient-to-r from-[#D8B15A] to-[#B8963A] text-[#0B1F3A] hover:from-[#B8963A] hover:to-[#D8B15A] px-6"
            >
              ✨
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Version widget (pastille)
  return (
    <>
      {/* Bouton pastille */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-br from-[#D8B15A] to-[#B8963A] shadow-lg shadow-[#D8B15A]/30 flex items-center justify-center text-3xl hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : ''}`}
        style={{ boxShadow: '0 0 30px rgba(216, 177, 90, 0.4)' }}
      >
        🌙
      </button>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 w-96 h-[600px] rounded-2xl overflow-hidden shadow-2xl z-50 flex flex-col"
          style={{
            background: 'linear-gradient(135deg, #0B1F3A 0%, #2B0F3A 100%)',
            boxShadow: '0 0 50px rgba(216, 177, 90, 0.2)'
          }}
        >
          {/* En-tête */}
          <div className="relative p-4 border-b border-[#D8B15A]/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D8B15A] to-[#B8963A] flex items-center justify-center text-xl">
                🌙
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[#D8B15A]" style={{ fontFamily: 'Georgia, serif' }}>
                  Luna
                </h2>
                <p className="text-xs text-[#D8B15A]/70">Guide lunaire</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#D8B15A]/70 hover:text-[#D8B15A] transition-colors text-2xl"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1" ref={scrollRef}>
            <div className="p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D8B15A] to-[#B8963A] flex items-center justify-center text-sm shrink-0">
                      🌙
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] p-3 rounded-xl whitespace-pre-wrap text-sm ${
                      msg.role === 'user'
                        ? 'bg-[#D8B15A]/20 text-[#D8B15A] rounded-br-sm'
                        : 'bg-[#2B0F3A]/50 text-white/90 rounded-bl-sm border border-[#D8B15A]/20'
                    }`}
                    style={{ fontFamily: 'Georgia, serif' }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D8B15A] to-[#B8963A] flex items-center justify-center text-sm">
                    🌙
                  </div>
                  <div className="bg-[#2B0F3A]/50 p-3 rounded-xl rounded-bl-sm border border-[#D8B15A]/20">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-[#D8B15A] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-[#D8B15A] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-[#D8B15A] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-3 border-t border-[#D8B15A]/30">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Votre message..."
                className="flex-1 bg-[#0B1F3A]/50 border-[#D8B15A]/30 text-white placeholder:text-[#D8B15A]/50 focus:border-[#D8B15A] text-sm"
                style={{ fontFamily: 'Georgia, serif' }}
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="bg-gradient-to-r from-[#D8B15A] to-[#B8963A] text-[#0B1F3A] hover:from-[#B8963A] hover:to-[#D8B15A] px-4"
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
