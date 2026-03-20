// Netlify Function pour appeler l'API Groq
// Cette fonction cache la clé API côté serveur

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

// Données des signes lunaires
const lunarSigns = {
  'Bélier': { name: 'Bélier', symbol: '♈', element: 'Feu', planet: 'Mars', stone: 'Diamant', keyword: 'Action', expression: 'Je suis' },
  'Taureau': { name: 'Taureau', symbol: '♉', element: 'Terre', planet: 'Vénus', stone: 'Émeraude', keyword: 'Stabilité', expression: 'J\'ai' },
  'Gémeaux': { name: 'Gémeaux', symbol: '♊', element: 'Air', planet: 'Mercure', stone: 'Agate', keyword: 'Communication', expression: 'Je pense' },
  'Cancer': { name: 'Cancer', symbol: '♋', element: 'Eau', planet: 'Lune', stone: 'Perle', keyword: 'Émotion', expression: 'Je ressens' },
  'Lion': { name: 'Lion', symbol: '♌', element: 'Feu', planet: 'Soleil', stone: 'Rubis', keyword: 'Créativité', expression: 'Je veux' },
  'Vierge': { name: 'Vierge', symbol: '♍', element: 'Terre', planet: 'Mercure', stone: 'Saphir', keyword: 'Analyse', expression: 'J\'analyse' },
  'Balance': { name: 'Balance', symbol: '♎', element: 'Air', planet: 'Vénus', stone: 'Opale', keyword: 'Harmonie', expression: 'J\'équilibre' },
  'Scorpion': { name: 'Scorpion', symbol: '♏', element: 'Eau', planet: 'Pluton', stone: 'Topaze', keyword: 'Transformation', expression: 'Je transforme' },
  'Sagittaire': { name: 'Sagittaire', symbol: '♐', element: 'Feu', planet: 'Jupiter', stone: 'Turquoise', keyword: 'Expansion', expression: 'Je comprends' },
  'Capricorne': { name: 'Capricorne', symbol: '♑', element: 'Terre', planet: 'Saturne', stone: 'Onyx', keyword: 'Ambition', expression: 'J\'utilise' },
  'Verseau': { name: 'Verseau', symbol: '♒', element: 'Air', planet: 'Uranus', stone: 'Améthyste', keyword: 'Innovation', expression: 'Je sais' },
  'Poissons': { name: 'Poissons', symbol: '♓', element: 'Eau', planet: 'Neptune', stone: 'Aquamarine', keyword: 'Intuition', expression: 'Je crois' }
};

// Système prompt pour Luna
const SYSTEM_PROMPT = `Tu es Luna, une guide spirituelle et astrologue bienveillante spécialisée dans les signes lunaires. Tu parles avec douceur, sagesse et une touche de mystère.

Ton rôle est d'aider les gens à découvrir et comprendre leur signe lunaire. Tu bases tes connaissances sur le livre "Sous quelle lune êtes-vous née?" de Diane Boyer.

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

exports.handler = async (event, context) => {
  // Vérifier la méthode HTTP
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Méthode non autorisée' })
    };
  }

  try {
    // Parser le corps de la requête
    const body = JSON.parse(event.body);
    const { messages, lunarSignContext } = body;

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Messages sont requis' })
      };
    }

    // Récupérer la clé API depuis les variables d'environnement Netlify
    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey) {
      console.error('GROQ_API_KEY non définie');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Configuration manquante - GROQ_API_KEY non définie' })
      };
    }

    // Construire les messages pour l'API
    const apiMessages = [
      {
        role: 'system',
        content: SYSTEM_PROMPT + (lunarSignContext ? '\n\n' + lunarSignContext : '')
      },
      ...messages.map(m => ({
        role: m.role,
        content: m.content
      }))
    ];

    console.log('Appel de l\'API Groq...');

    // Appeler l'API Groq depuis le serveur
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
      const errorText = await response.text();
      console.error('Erreur Groq API:', response.status, errorText);
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: 'Erreur de communication avec Luna', details: errorText })
      };
    }

    const data = await response.json();
    const responseContent = data.choices?.[0]?.message?.content || 'Désolée, je n\'ai pas pu générer une réponse.';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({
        success: true,
        message: responseContent
      })
    };

  } catch (error) {
    console.error('Erreur dans la fonction luna-chat:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Une erreur est survenue lors de la communication avec Luna' })
    };
  }
};
