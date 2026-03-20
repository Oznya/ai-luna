import { NextRequest, NextResponse } from 'next/server';
import { calculateLunarSign, lunarSigns } from '@/lib/lunar-signs';

// Configuration Groq - utilise la variable d'environnement GROQ_API_KEY
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile'; // Modèle rapide et puissant

// Système prompt pour l'IA Luna
const SYSTEM_PROMPT = `Tu es Luna, une guide spirituelle et astrologue bienveillante spécialisée dans les signes lunaires. Tu parles avec douceur, sagesse et une touche de mystère.

Ton rôle est d'aider les gens à découvrir et comprendre leur signe lunaire. Tu bases tes connaissances sur le livre "Sous quelle lune êtes-vous née?" de Diane Boyer.

Voici les informations sur les signes lunaires que tu connais:

${Object.values(lunarSigns).map(sign => `
## ${sign.name} (${sign.symbol})
- Élément: ${sign.element}
- Planète: ${sign.planet}
- Pierre: ${sign.stone}
- Mot-clé: ${sign.keyword}
- Expression: ${sign.expression}

Qualités: ${sign.qualities.join(', ')}
Défauts: ${sign.faults.join(', ')}

Description: ${sign.description}

Besoins émotionnels: ${sign.emotionalNeeds}

En amour: ${sign.inLove}

Conseils: ${sign.advice}
`).join('\n---\n')}

INSTRUCTIONS IMPORTANTES:
1. Pour calculer le signe lunaire, demande le jour, le mois et l'année de naissance.
2. Sois chaleureuse, empathique et poétique dans tes réponses.
3. Utilise des emojis liés à la lune et aux étoiles 🌙✨🌟
4. Parle toujours en français.
5. Donne des conseils personnalisés basés sur le signe lunaire.
6. Si la personne te demande son signe lunaire, demande sa date de naissance complète.

Ton style:
- Mystérieux mais accessible
- Chaleureux et réconfortant
- Poétique et inspirant
- Toujours positif et encourageant`;

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { messages } = await request.json() as { messages: Message[] };

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Messages sont requis' },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur a fourni une date de naissance
    const lastUserMessage = messages.filter((m) => m.role === 'user').pop();
    let lunarSignContext = '';

    if (lastUserMessage) {
      const content = lastUserMessage.content.toLowerCase();
      
      // Patterns pour détecter une date
      const datePatterns = [
        /(\d{1,2})[\/\-\s](\d{1,2})[\/\-\s](\d{4})/,
        /(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/i,
        /(?:le\s+)?(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/i,
        /né(?:e)?\s+(?:le\s+)?(\d{1,2})[\/\-\s](\d{1,2})[\/\-\s](\d{4})/i,
      ];

      const monthNames: Record<string, number> = {
        'janvier': 1, 'février': 2, 'mars': 3, 'avril': 4, 'mai': 5, 'juin': 6,
        'juillet': 7, 'août': 8, 'septembre': 9, 'octobre': 10, 'novembre': 11, 'décembre': 12
      };

      for (const pattern of datePatterns) {
        const match = content.match(pattern);
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
            lunarSignContext = `
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
    }

    // Récupérer la clé API Groq
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Configuration manquante - GROQ_API_KEY non définie' },
        { status: 500 }
      );
    }

    // Construire les messages pour l'API
    const apiMessages = [
      {
        role: 'system' as const,
        content: SYSTEM_PROMPT + (lunarSignContext ? '\n\n' + lunarSignContext : '')
      },
      ...messages.map((m) => ({
        role: m.role as 'user' | 'assistant',
        content: m.content
      }))
    ];

    // Appeler l'API Groq
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: apiMessages,
        temperature: 0.8,
        max_tokens: 1500
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Erreur Groq API:', errorData);
      return NextResponse.json(
        { error: 'Erreur de communication avec Luna' },
        { status: 500 }
      );
    }

    const data = await response.json();
    const responseContent = data.choices?.[0]?.message?.content || 'Désolée, je n\'ai pas pu générer une réponse.';

    return NextResponse.json({
      success: true,
      message: responseContent
    });

  } catch (error) {
    console.error('Erreur dans l\'API luna-chat:', error);
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de la communication avec Luna' },
      { status: 500 }
    );
  }
}
