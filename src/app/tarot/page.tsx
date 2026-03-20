'use client';

import { useState, useEffect } from 'react';

interface TarotCard {
  name: string;
  image: string;
  meaning: string;
}

interface Position {
  name: string;
  desc: string;
}

const CARDS: TarotCard[] = [
  { name: "La Lune Nouvelle", image: "/tarot-cards/01-lune-nouvelle.png", meaning: "Un nouveau cycle commence. C'est le temps des semences, des intentions et des nouveaux départs. Le moment est propice pour planter les graines de vos projets futurs." },
  { name: "La Lune Croissante", image: "/tarot-cards/02-lune-croissante.png", meaning: "La croissance et le développement sont à l'honneur. Vos projets prennent forme, l'énergie monte. Persévérez dans vos efforts, les résultats approchent." },
  { name: "Le Premier Quartier", image: "/tarot-cards/03-premier-quartier.png", meaning: "Moment de décision et d'action. Les obstacles demandent à être surmontés. Faites confiance à votre détermination pour avancer malgré les défis." },
  { name: "La Lune Gibbeuse", image: "/tarot-cards/04-lune-gibbeuse.png", meaning: "L'accomplissement est proche. Affinez vos projets, ajustez les derniers détails. La patience et la persévérance porteront bientôt leurs fruits." },
  { name: "La Pleine Lune", image: "/tarot-cards/05-pleine-lune.png", meaning: "Apogée, révélation et accomplissement. Ce que vous avez semé se manifeste pleinement. C'est un moment de célébration et de gratitude." },
  { name: "La Lune Décroissante", image: "/tarot-cards/06-lune-decroissante.png", meaning: "Le temps de la récolte et du partage. Recueillez les fruits de votre travail et partagez votre abondance avec gratitude." },
  { name: "Le Dernier Quartier", image: "/tarot-cards/07-dernier-quartier.png", meaning: "Période de réflexion et de lâcher-prise. Relâchez ce qui ne vous sert plus. Faites le tri dans votre vie pour préparer le prochain cycle." },
  { name: "La Lune Noire", image: "/tarot-cards/08-lune-noire.png", meaning: "Introspection profonde et repos. Connectez-vous à votre sagesse intérieure. Dans le silence, les réponses les plus profondes émergent." },
  { name: "L'Éclipse de Lune", image: "/tarot-cards/09-eclipse-lune.png", meaning: "Transformation puissante et changements inattendus. Un portail s'ouvre vers une nouvelle dimension de votre vie. Embrassez le changement." },
  { name: "La Lune Bleue", image: "/tarot-cards/10-lune-bleue.png", meaning: "Événement rare et magique. Un vœu profond peut se réaliser. Saisissez cette énergie exceptionnelle pour manifester vos rêves." },
  { name: "La Super Lune", image: "/tarot-cards/11-super-lune.png", meaning: "Énergie amplifiée et intensité maximale. Vos émotions sont à vif mais votre pouvoir de manifestation est décuplé." },
  { name: "L'Ange Lunaire", image: "/tarot-cards/12-ange-lunaire.png", meaning: "Protection divine et guidance céleste. Vous êtes entouré d'amour et de lumière. Les anges vous guident sur votre chemin." },
  { name: "L'Étoile du Berger", image: "/tarot-cards/13-etoile-berger.png", meaning: "Espoir et guidance. Une lumière brille dans l'obscurité pour vous montrer le chemin. Faites confiance aux signes de l'univers." },
  { name: "Le Cratère Mystique", image: "/tarot-cards/14-crater-mystique.png", meaning: "Profondeur et mystères révélés. Plongez dans les couches cachées de votre être. Les secrets anciens attendent d'être découverts." },
  { name: "La Mer de Tranquillité", image: "/tarot-cards/15-mer-tranquillite.png", meaning: "Paix intérieure et sérénité. Trouvez votre calme au milieu du chaos. La vraie force réside dans la tranquillité de l'esprit." },
  { name: "Le Clair de Lune", image: "/tarot-cards/16-clair-de-lune.png", meaning: "Romantisme et inspiration. Laissez la lumière argentée de la lune illuminer votre cœur. La beauté et la poésie vous entourent." },
  { name: "L'Aurore Boréale", image: "/tarot-cards/17-aurore-boreale.png", meaning: "Merveille et émerveillement. La magie opère dans votre vie. Restez ouvert aux expériences extraordinaires." },
  { name: "Le Ciel Étoilé", image: "/tarot-cards/18-ciel-etoile.png", meaning: "Infini des possibles. Vous êtes connecté à l'univers entier. Vos rêves sont les graines des étoiles de demain." },
  { name: "La Comète", image: "/tarot-cards/19-comete.png", meaning: "Changement rapide et opportunité fulgurante. Saisissez l'instant, car cette énergie ne repassera pas de sitôt." },
  { name: "Le Croissant d'Or", image: "/tarot-cards/20-croissant-or.png", meaning: "Abondance et prospérité croissante. Les portes de l'abondance s'ouvrent pour vous. Accueillez les bénédictions." },
  { name: "Le Voile Lunaire", image: "/tarot-cards/21-voile-lunaire.png", meaning: "Mystère et intuition. Ce qui est caché sera révélé en temps voulu. Faites confiance au processus de dévoilement." },
  { name: "Le Retour de Lune", image: "/tarot-cards/22-retour-lune.png", meaning: "Cycle complété et renouveau. Un chapitre se termine pour qu'un autre commence. La roue de la vie tourne en votre faveur." }
];

const POSITIONS: Record<string, Position[]> = {
  simple: [{ name: "Votre Message Lunaire", desc: "Ce que la Lune vous révèle maintenant" }],
  croix: [
    { name: "Le Présent", desc: "Votre situation actuelle" },
    { name: "L'Obstacle", desc: "Ce qui vous freine" },
    { name: "La Solution", desc: "Le chemin à suivre" }
  ],
  amour: [
    { name: "Votre Cœur", desc: "Vos sentiments profonds" },
    { name: "L'Autre", desc: "La personne concernée" },
    { name: "L'Avenir", desc: "Ce qui vous attend" }
  ],
  complete: [
    { name: "Le Passé", desc: "Ce qui vous a mené ici" },
    { name: "Le Présent", desc: "Votre situation actuelle" },
    { name: "L'Avenir Proche", desc: "Ce qui approche" },
    { name: "Le Conseil Lunaire", desc: "La guidance de la Lune" },
    { name: "Le Résultat", desc: "L'aboutissement probable" }
  ]
};

const SYNTHESIS: Record<string, string> = {
  simple: "La Lune vous murmure ce message. Prenez le temps de l'intégrer dans votre cœur.",
  croix: "Chaque obstacle est une opportunité déguisée. Le chemin se dessine devant vous.",
  amour: "L'amour est un voyage infini. Laissez votre cœur vous guider vers votre destin.",
  complete: "Les cycles lunaires vous accompagnent. Faites confiance au processus de transformation."
};

const CARD_COUNT: Record<string, number> = {
  simple: 1,
  croix: 3,
  amour: 3,
  complete: 5
};

export default function TarotLunaire() {
  const [currentType, setCurrentType] = useState('simple');
  const [shuffledDeck, setShuffledDeck] = useState<TarotCard[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);
  const [question, setQuestion] = useState('');
  const [showReading, setShowReading] = useState(false);

  useEffect(() => {
    resetDeck();
  }, [currentType]);

  const resetDeck = () => {
    const shuffled = [...CARDS].sort(() => Math.random() - 0.5);
    setShuffledDeck(shuffled);
    setSelectedIndices([]);
    setShowReading(false);
    setQuestion('');
  };

  const cardsToSelect = CARD_COUNT[currentType];

  const toggleCard = (index: number) => {
    if (showReading) return;

    if (selectedIndices.includes(index)) {
      setSelectedIndices(selectedIndices.filter(i => i !== index));
    } else if (selectedIndices.length < cardsToSelect) {
      setSelectedIndices([...selectedIndices, index]);
    }
  };

  const revealReading = () => {
    if (selectedIndices.length === cardsToSelect) {
      setShowReading(true);
    }
  };

  const positions = POSITIONS[currentType];
  const selectedCards = selectedIndices.map(i => shuffledDeck[i]);

  return (
    <div className="tarot-container">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

        .tarot-container {
          position: relative;
          width: 100%;
          min-height: 600px;
          padding: 30px 20px;
          background: linear-gradient(160deg, #0B1F3A 0%, #1a0f2e 50%, #0B1F3A 100%);
          border-radius: 20px;
          overflow: hidden;
          font-family: 'Cormorant Garamond', Georgia, serif;
        }

        .tarot-container::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background-image:
            radial-gradient(1.5px 1.5px at 10% 20%, rgba(216, 177, 90, 0.7), transparent),
            radial-gradient(1px 1px at 30% 50%, rgba(216, 177, 90, 0.5), transparent),
            radial-gradient(1.5px 1.5px at 50% 10%, rgba(216, 177, 90, 0.8), transparent),
            radial-gradient(1px 1px at 70% 40%, rgba(216, 177, 90, 0.6), transparent);
          pointer-events: none;
          animation: twinkle 3s ease-in-out infinite;
        }

        @keyframes twinkle { 0%, 100% { opacity: 0.6; } 50% { opacity: 1; } }

        .tarot-title { text-align: center; margin-bottom: 20px; position: relative; z-index: 2; }
        .tarot-title h2 {
          font-family: 'Cinzel', serif;
          font-size: 2.2rem;
          color: #D8B15A;
          text-shadow: 0 0 30px rgba(216, 177, 90, 0.5);
          margin: 0;
          letter-spacing: 3px;
        }
        .tarot-title p { color: rgba(216, 177, 90, 0.7); font-size: 1.1rem; margin-top: 8px; font-style: italic; }

        .type-selector { display: flex; justify-content: center; gap: 12px; margin-bottom: 25px; flex-wrap: wrap; position: relative; z-index: 2; }
        .type-btn {
          padding: 12px 20px;
          background: rgba(11, 31, 58, 0.8);
          border: 2px solid rgba(216, 177, 90, 0.4);
          border-radius: 30px;
          color: rgba(216, 177, 90, 0.8);
          font-family: 'Cinzel', serif;
          font-size: 0.85rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .type-btn:hover { background: rgba(216, 177, 90, 0.15); border-color: #D8B15A; color: #D8B15A; }
        .type-btn.active { background: linear-gradient(135deg, rgba(216, 177, 90, 0.3) 0%, rgba(184, 150, 58, 0.2) 100%); border-color: #D8B15A; color: #D8B15A; box-shadow: 0 0 20px rgba(216, 177, 90, 0.3); }

        .question-area { text-align: center; margin-bottom: 25px; position: relative; z-index: 2; }
        .question-input {
          width: 90%; max-width: 500px;
          padding: 15px 25px;
          background: rgba(11, 31, 58, 0.8);
          border: 2px solid rgba(216, 177, 90, 0.4);
          border-radius: 30px;
          color: #fff;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.1rem;
          outline: none;
        }
        .question-input::placeholder { color: rgba(216, 177, 90, 0.5); font-style: italic; }
        .question-input:focus { border-color: #D8B15A; box-shadow: 0 0 25px rgba(216, 177, 90, 0.3); }

        .instruction { text-align: center; color: rgba(216, 177, 90, 0.8); font-size: 1rem; margin-bottom: 20px; font-style: italic; position: relative; z-index: 2; }

        .deck { display: flex; justify-content: center; gap: 8px; flex-wrap: wrap; margin: 20px 0; position: relative; z-index: 2; }
        .deck-card {
          width: 55px; height: 75px;
          background: linear-gradient(145deg, #1a2a4a 0%, #0B1F3A 100%);
          border: 2px solid rgba(216, 177, 90, 0.4);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.5rem;
          color: rgba(216, 177, 90, 0.5);
        }
        .deck-card:hover { transform: translateY(-5px); border-color: #D8B15A; box-shadow: 0 5px 15px rgba(216, 177, 90, 0.4); }
        .deck-card.selected { background: linear-gradient(145deg, rgba(216, 177, 90, 0.25) 0%, rgba(184, 150, 58, 0.15) 100%); border-color: #D8B15A; box-shadow: 0 0 15px rgba(216, 177, 90, 0.5); transform: translateY(-3px); }

        .counter { text-align: center; color: rgba(216, 177, 90, 0.7); font-size: 0.9rem; margin-top: 10px; position: relative; z-index: 2; }

        .reveal-btn {
          display: block; margin: 25px auto;
          padding: 15px 40px;
          background: linear-gradient(135deg, #D8B15A 0%, #B8963A 100%);
          border: none;
          border-radius: 30px;
          color: #0B1F3A;
          font-family: 'Cinzel', serif;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative; z-index: 2;
          box-shadow: 0 0 25px rgba(216, 177, 90, 0.4);
        }
        .reveal-btn:hover { transform: scale(1.05); box-shadow: 0 0 40px rgba(216, 177, 90, 0.6); }

        .reading { max-width: 600px; margin: 30px auto; padding: 25px; background: rgba(11, 31, 58, 0.7); border: 2px solid rgba(216, 177, 90, 0.4); border-radius: 20px; position: relative; z-index: 2; }
        .reading h3 { font-family: 'Cinzel', serif; color: #D8B15A; font-size: 1.4rem; text-align: center; margin-bottom: 20px; }

        .reading-card { background: rgba(43, 15, 58, 0.5); border: 1px solid rgba(216, 177, 90, 0.3); border-radius: 12px; padding: 15px; margin-bottom: 12px; display: flex; gap: 15px; align-items: flex-start; }
        .card-image { width: 80px; height: 110px; border-radius: 8px; border: 2px solid rgba(216, 177, 90, 0.5); flex-shrink: 0; overflow: hidden; background: #1a2a4a; }
        .card-image img { width: 100%; height: 100%; object-fit: cover; }
        .card-content { flex: 1; }
        .reading-card h4 { font-family: 'Cinzel', serif; color: #D8B15A; margin: 0 0 6px 0; font-size: 1.1rem; }
        .card-position { color: rgba(216, 177, 90, 0.7); font-size: 0.85rem; margin-bottom: 8px; font-style: italic; }
        .reading-card p { color: rgba(255, 255, 255, 0.85); line-height: 1.6; margin: 0; font-size: 0.95rem; }

        .synthesis { background: linear-gradient(135deg, rgba(216, 177, 90, 0.15) 0%, rgba(184, 150, 58, 0.1) 100%); border: 2px solid rgba(216, 177, 90, 0.5); border-radius: 12px; padding: 20px; margin-top: 15px; }
        .synthesis h4 { font-family: 'Cinzel', serif; color: #D8B15A; text-align: center; margin: 0 0 12px 0; font-size: 1.2rem; }
        .synthesis p { color: rgba(255, 255, 255, 0.9); line-height: 1.7; text-align: center; font-size: 1rem; font-style: italic; }

        .reset-btn { background: transparent; border: 2px solid rgba(216, 177, 90, 0.5); color: rgba(216, 177, 90, 0.8); padding: 12px 30px; border-radius: 25px; font-family: 'Cinzel', serif; cursor: pointer; transition: all 0.3s ease; display: block; margin: 20px auto; position: relative; z-index: 2; }
        .reset-btn:hover { background: rgba(216, 177, 90, 0.1); border-color: #D8B15A; color: #D8B15A; }

        .footer { text-align: center; margin-top: 20px; padding-top: 15px; border-top: 1px solid rgba(216, 177, 90, 0.2); position: relative; z-index: 2; }
        .footer a { color: rgba(216, 177, 90, 0.8); text-decoration: none; font-style: italic; }
        .footer a:hover { color: #D8B15A; }

        @media (max-width: 600px) {
          .tarot-title h2 { font-size: 1.6rem; }
          .type-btn { padding: 10px 15px; font-size: 0.8rem; }
          .deck-card { width: 45px; height: 65px; font-size: 1.2rem; }
          .reading-card { flex-direction: column; align-items: center; text-align: center; }
          .card-image { width: 90px; height: 125px; }
        }
      `}</style>

      <div className="tarot-title">
        <h2>✧ TAROT LUNAIRE ✧</h2>
        <p>Laissez la Lune éclairer votre destin</p>
      </div>

      <div className="type-selector">
        {['simple', 'croix', 'amour', 'complete'].map(type => (
          <button
            key={type}
            className={`type-btn ${currentType === type ? 'active' : ''}`}
            onClick={() => { setCurrentType(type); resetDeck(); }}
          >
            {type === 'simple' && 'Tirage Simple'}
            {type === 'croix' && 'Croix Lunaire'}
            {type === 'amour' && 'Tarot Amour'}
            {type === 'complete' && 'Tirage Complet'}
          </button>
        ))}
      </div>

      <div className="question-area">
        <input
          type="text"
          className="question-input"
          placeholder="Posez votre question à la Lune... (optionnel)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
      </div>

      <p className="instruction">
        {showReading ? '✧ Votre lecture lunaire ✧' : `Cliquez sur ${cardsToSelect} carte${cardsToSelect > 1 ? 's' : ''}`}
      </p>

      <div className="deck">
        {shuffledDeck.map((_, index) => (
          <div
            key={index}
            className={`deck-card ${selectedIndices.includes(index) ? 'selected' : ''}`}
            onClick={() => toggleCard(index)}
          >
            {selectedIndices.includes(index) ? '★' : '☽'}
          </div>
        ))}
      </div>

      <p className="counter">
        {selectedIndices.length} / {cardsToSelect} carte{cardsToSelect > 1 ? 's' : ''} sélectionnée{selectedIndices.length > 1 ? 's' : ''}
      </p>

      {selectedIndices.length === cardsToSelect && !showReading && (
        <button className="reveal-btn" onClick={revealReading}>
          ☽ Révéler l'interprétation ☽
        </button>
      )}

      {showReading && (
        <div className="reading">
          <h3>☽ Votre Lecture Lunaire ☽</h3>
          {question && (
            <p style={{ textAlign: 'center', color: 'rgba(216,177,90,0.8)', fontStyle: 'italic', marginBottom: '20px' }}>
              "{question}"
            </p>
          )}
          {selectedCards.map((card, i) => (
            <div key={i} className="reading-card">
              <div className="card-image">
                <img src={card.image} alt={card.name} />
              </div>
              <div className="card-content">
                <h4>{card.name}</h4>
                <p className="card-position"><em>{positions[i]?.name}</em> — {positions[i]?.desc}</p>
                <p>{card.meaning}</p>
              </div>
            </div>
          ))}
          <div className="synthesis">
            <h4>✧ Message de la Lune ✧</h4>
            <p>{SYNTHESIS[currentType]}</p>
          </div>
        </div>
      )}

      {showReading && (
        <button className="reset-btn" onClick={resetDeck}>
          Nouveau Tirage
        </button>
      )}

      <div className="footer">
        <a href="https://oznya.com" target="_blank" rel="noopener">✧ Découvrez Oznya ✧</a>
      </div>
    </div>
  );
}
