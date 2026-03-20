// Données des signes lunaires basées sur le livre "Sous quelle lune êtes-vous née?" de Diane Boyer

export interface LunarSign {
  name: string;
  element: string;
  planet: string;
  color: string;
  stone: string;
  symbol: string;
  expression: string;
  keyword: string;
  qualities: string[];
  faults: string[];
  description: string;
  emotionalNeeds: string;
  inLove: string;
  advice: string;
}

export const lunarSigns: Record<string, LunarSign> = {
  "Bélier": {
    name: "Bélier",
    element: "Feu",
    planet: "Mars",
    color: "Rouge vif",
    stone: "Rubis",
    symbol: "♈",
    expression: "Je suis",
    keyword: "ACTION",
    qualities: [
      "L'affirmation de soi", "L'authenticité", "L'énergie", "La spontanéité",
      "Le tempérament", "L'identité", "La fougue", "La rapidité",
      "L'initiative", "La confiance en soi", "L'allant", "L'individualité",
      "L'esprit de conquête", "Le courage", "L'efficacité"
    ],
    faults: [
      "Brutalité", "Impulsivité", "Impatience", "Naïveté",
      "Imprévoyance", "Ostentation", "Colère", "Fanatisme",
      "Lubricité", "Imprudence"
    ],
    description: "Un Bélier lunaire est beaucoup plus émotif que le Bélier solaire. Les sautes d'humeur sont courtes, mais elles ne durent pas longtemps. Le Bélier lunaire montre qu'il existe toujours une part intime de votre être qui se rebelle contre l'ordre établi, refuse de se soumettre, de s'incliner. Vous ne connaissez qu'une loi, la vôtre, et vous suivez obstinément le chemin qui vous donne une entière autonomie. Cramponnée à votre liberté, vous n'autorisez personne à vous emprisonner ! Vous fourmillez d'idées nouvelles, mais vous manquez de patience et vous n'allez pas toujours au bout de vos idées...",
    emotionalNeeds: "Le Bélier lunaire est un leader, un chef. La Lune ici se sent en sécurité si elle peut commander, ou à tout le moins faire les choses à sa manière, sans devoir se plier aux ordres d'un autre. Vous devez être en position de responsabilité. Vous devez être « numéro un » pour être bien avec vous-même.",
    inLove: "En amour le Bélier lunaire n'est pas toujours champion, car il a tendance à penser à lui avant de penser aux autres. Cependant quand le Bélier lunaire est amoureux, il ose et entreprend beaucoup pour conquérir l'objet de sa flamme. Il se donne à fond et prend des risques. Le Bélier lunaire aime ardemment, mais pas toujours de manière très stable ni de manière continue.",
    advice: "Combattez votre côté dispersé, vous gagnerez du temps. Au travail, vous aimez diriger. Vous avez l'art de dénicher les postes dans lesquels vous serez sûre d'évoluer. Attention cependant à ne pas devenir égocentrique."
  },
  "Taureau": {
    name: "Taureau",
    element: "Terre",
    planet: "Vénus",
    color: "Vert pré ou rose indien",
    stone: "Émeraude",
    symbol: "♉",
    expression: "J'ai",
    keyword: "ACQUISITION",
    qualities: [
      "L'âpreté", "L'accumulation", "La sensualité", "Le réalisme",
      "La volupté", "Persévérance", "Constance", "Bon vivant",
      "Résistance", "Prévoyant", "Fidélité", "Générosité",
      "Affectueux", "Efficacité", "Sens pratique"
    ],
    faults: [
      "Lenteur", "Matérialiste", "Entêté", "Gourmand",
      "Avarice", "Paresse", "Réticent", "Méfiance",
      "Jalousie", "Rancune", "L'inertie"
    ],
    description: "La Lune en Taureau montre qu'il existe, profondément ancré en vous, le besoin de jouir de l'existence et de posséder ce qui est beau, ce qui est bon. Vous êtes quelqu'un d'hyper affectif, et votre cœur est fait d'un bloc. Quand vous aimez, c'est pour la vie. Vous nouez avec les choses et les êtres des liens solides, durables. Votre personnalité est à l'image d'un arbre qui se ramifie sans rien perdre de sa solidité et qui plante ses racines profondément sous terre.",
    emotionalNeeds: "Ce qui vous définit, c'est un énorme besoin de sécurité affective et matérielle. Le Taureau étant un signe matérialiste et pragmatique, la Lune dans ce signe crée le besoin de construire une sécurité émotionnelle et matérielle et de la maintenir à tout prix.",
    inLove: "Le Taureau lunaire a besoin de temps avant de s'engager, car il a besoin de savoir où la relation va le conduire. Il aime avec les gestes et adore les manifestations physiques de l'amour : baisers, câlins, tendresse. Il aime toucher et être touché. Le Taureau lunaire a un terrible besoin de sécurité affective et de relation durable.",
    advice: "Le challenge pour la Lune en Taureau est d'accepter l'évolution nécessaire et le changement quand il s'impose, afin d'éviter le statisme. Construisez votre sécurité émotionnelle et maintenez-la."
  },
  "Gémeaux": {
    name: "Gémeaux",
    element: "Air",
    planet: "Mercure",
    color: "Mêlées, changeantes",
    stone: "Aigue-marine",
    symbol: "♊",
    expression: "Je pense",
    keyword: "COMMUNICATION",
    qualities: [
      "La curiosité", "Le mouvement", "Le langage", "La mimique",
      "Sociabilité", "Inventif", "Esprit vif", "Humour",
      "Virtuosité", "Rapidité", "Adresse", "Éloquence",
      "Ingéniosité", "Facilité d'adaptation"
    ],
    faults: [
      "Vagabondage", "Inconsistance", "Dispersion", "Agitation",
      "Superficialité", "Naïveté", "Infantilisme", "Moqueur",
      "Infidélité", "Bavard", "Le travestissement"
    ],
    description: "La Lune en Gémeaux est le signe d'une grande jeunesse d'esprit et d'une immaturité profonde. Il existe, profondément ancré en vous, le besoin de découvrir, de connaître, d'expérimenter. Vous êtes dotée d'un esprit vif, capable de comprendre rapidement les situations, et vous vous y adaptez avec souplesse. Vous vous nourrissez d'idées, de projets intellectuels, avec lesquels vous jouez et jonglez.",
    emotionalNeeds: "Ici, la communication est la clé. Le natif lunaire Gémeaux a besoin d'être charmant, vif, apprécié socialement pour son intelligence, ses capacités de communication. Le besoin de communiquer et d'échanger intellectuellement est crucial.",
    inLove: "Sa nature amoureuse est éveillée rapidement et il n'a pas la langue dans sa poche. Il aime jouer la comédie, flirter, amuser les autres, exciter leur intérêt. Ses sentiments ont la sincérité et la légèreté de l'instant. Sa jeunesse d'esprit et son insouciance le rendent intéressant.",
    advice: "Hyperactive, vous vous ennuyez vite lorsqu'on vous oblige à rester statique. Vous êtes curieuse, et vous aimez apprendre. Évitez la dispersion et cultivez la profondeur dans vos relations."
  },
  "Cancer": {
    name: "Cancer",
    element: "Eau",
    planet: "Lune",
    color: "Blanc et bleu",
    stone: "Pierre de lune",
    symbol: "♋",
    expression: "Je sens",
    keyword: "SÉCURITÉ",
    qualities: [
      "Les rêves", "Mystère", "La vie intérieure", "La nuit",
      "L'imagination", "La sensibilité", "La réceptivité", "La féminité",
      "La douceur", "La persévérance", "L'altruisme", "L'amour maternel",
      "La clairvoyance", "Émotivité"
    ],
    faults: [
      "La passivité", "L'irréalisme", "La velléité", "La peur",
      "L'instabilité", "L'anxiété", "La paresse", "La frivolité",
      "Susceptibilité", "Versatilité"
    ],
    description: "La Lune en Cancer montre qu'il existe, profondément ancré en lui, le besoin de revenir aux origines. C'est ainsi que vous aimez baigner dans une ambiance chaleureuse et paisible, créer un cocon rassurant. Vous ressentez un immense besoin d'attaches, de liens, de protection. Vous cherchez à garder en vous, et autour de vous, ce qui peut vous rassurer.",
    emotionalNeeds: "Ici, la famille est très importante puisque cette Lune a une énorme demande de sécurité affective. Le besoin de tendresse au quotidien est au cœur de la personnalité, et les racines, le chez-soi sont essentiels.",
    inLove: "L'amour est la grande affaire du Cancer lunaire. Il met de l'amour dans tout et avec tout. Il aime être aimé et le rend parfaitement bien pour peu qu'il se sente en confiance. Le Cancer lunaire a besoin d'être constamment rassuré.",
    advice: "Il est important de trouver un dérivatif à l'expression de la sensibilité (expression artistique). La solitude peut être particulièrement difficile à vivre, source de déséquilibre. Trouvez la sécurité émotionnelle en vous-même."
  },
  "Lion": {
    name: "Lion",
    element: "Feu",
    planet: "Soleil",
    color: "Or et orange",
    stone: "Or",
    symbol: "♌",
    expression: "Je veux",
    keyword: "CRÉATION",
    qualities: [
      "La noblesse", "La grandeur", "La générosité", "L'autorité",
      "La créativité", "La loyauté", "Le courage", "L'enthousiasme",
      "La magnanimité", "La chaleur", "Le charisme", "La vitalité",
      "L'orgueil", "La protection"
    ],
    faults: [
      "Vanité", "Despotisme", "Ostentation", "Mégalomanie",
      "Intolérance", "Prétention", "Dominatrice", "Infidélité",
      "Dramatisation", "Narcissisme"
    ],
    description: "La Lune en Lion montre un immense besoin de briller, d'être reconnu, admiré. Vous avez un cœur noble et généreux, mais votre orgueil est facilement blessé. Vous cherchez constamment à vous mettre en valeur et à être le centre d'attention. Votre créativité est au cœur de votre être et vous avez besoin de l'exprimer pleinement.",
    emotionalNeeds: "Le Lion lunaire a besoin de reconnaissance, d'admiration et de sentir qu'il est spécial aux yeux des autres. L'amour doit être grandiose, passionné et romantique. Vous avez besoin de sentir que vous êtes le roi ou la reine du cœur de votre partenaire.",
    inLove: "En amour, vous êtes passionné et romantique. Vous aimez les grandes déclarations et les gestes spectaculaires. Votre partenaire doit vous admirer et vous faire sentir spécial. Vous êtes loyal et protecteur, mais vous pouvez être dominateur dans vos relations.",
    advice: "Apprenez à partager la vedette et à reconnaître la valeur des autres sans vous sentir menacé. Votre générosité naturelle est votre plus grand atout - utilisez-la pour illuminer la vie des autres, pas seulement pour obtenir leur admiration."
  },
  "Vierge": {
    name: "Vierge",
    element: "Terre",
    planet: "Mercure",
    color: "Vert foncé, beige",
    stone: "Sardoine",
    symbol: "♍",
    expression: "J'analyse",
    keyword: "PERFECTION",
    qualities: [
      "L'analyse", "L'ordre", "La méthode", "La précision",
      "Le sens du détail", "L'efficacité", "La discrétion", "L'humilité",
      "Le service", "L'intelligence pratique", "La minutie", "L'organisation",
      "La fiabilité", "Le sens critique"
    ],
    faults: [
      "Perfectionnisme excessif", "Critique", "Anxiété", "Hypocondrie",
      "Froideur", "Pédanterie", "Rigidity", "Inquiétude chronique",
      "Auto-critique", "Timidité"
    ],
    description: "La Lune en Vierge révèle un besoin profond d'ordre, de précision et d'utilité. Vous avez un sens aigu du détail et une capacité d'analyse remarquable. Votre besoin de perfection peut parfois devenir source d'anxiété, mais il est aussi votre moteur pour vous améliorer constamment.",
    emotionalNeeds: "Le Vierge lunaire a besoin de sentir utile et d'apporter une contribution concrète. L'ordre et l'organisation dans son environnement sont essentiels à son bien-être émotionnel. Vous avez besoin de routines saines et d'un cadre de vie ordonné.",
    inLove: "En amour, vous êtes réservé mais dévoué. Vous montrez votre amour par des actes concrets de service plutôt que par de grandes déclarations. Vous cherchez un partenaire fiable et stable. Votre critique peut parfois blesser ceux que vous aimez.",
    advice: "Apprenez à accepter l'imperfection - en vous-même et chez les autres. Votre sens du service est admirable, mais n'oubliez pas de prendre soin de vos propres besoins émotionnels. La perfection n'existe pas, et c'est tant mieux."
  },
  "Balance": {
    name: "Balance",
    element: "Air",
    planet: "Vénus",
    color: "Rose, bleu pastel",
    stone: "Saphir",
    symbol: "♎",
    expression: "J'équilibre",
    keyword: "HARMONIE",
    qualities: [
      "La diplomatie", "L'élégance", "Le charme", "L'équité",
      "La coopération", "Le sens esthétique", "La sociabilité", "La grâce",
      "La médiation", "La gentillesse", "L'art", "Le raffinement",
      "La justice", "L'harmonie"
    ],
    faults: [
      "Indécision", "Dépendance affective", "Superficialité", "Indulgence",
      "Conformisme", "Hésitation", "Fuite des conflits", "Séduction manipulatrice",
      "Vanité", "Coquetterie excessive"
    ],
    description: "La Lune en Balance révèle un besoin profond d'harmonie, de beauté et de partenariat. Vous ne vous sentez vraiment complète que lorsque vous êtes en relation avec quelqu'un. Votre sens de la justice et de l'équité est très développé, et vous cherchez constamment à créer l'équilibre autour de vous.",
    emotionalNeeds: "La Balance lunaire a un besoin vital de partenariat et d'harmonie relationnelle. Vous ne supportez pas les conflits et la discorde. L'esthétique et la beauté de votre environnement sont essentielles à votre bien-être émotionnel.",
    inLove: "En amour, vous êtes romantique et idéaliste. Vous cherchez le partenaire parfait et l'harmonie absolue. Votre charme est votre arme, mais vous pouvez parfois perdre votre identité dans la relation. Vous avez besoin de sentir que votre partenaire vous complète.",
    advice: "Apprenez à prendre des décisions seule et à affirmer vos propres désirs. L'harmonie à tout prix peut vous amener à nier vos vrais besoins. Cultivez votre propre identité en dehors de vos relations."
  },
  "Scorpion": {
    name: "Scorpion",
    element: "Eau",
    planet: "Pluton",
    color: "Noir, rouge foncé",
    stone: "Topaze",
    symbol: "♏",
    expression: "Je désire",
    keyword: "TRANSFORMATION",
    qualities: [
      "L'intensité", "La profondeur", "La passion", "Le magnétisme",
      "La perspicacité", "Le courage émotionnel", "La loyauté absolue", "La détermination",
      "Le mystère", "La régénération", "L'intuition profonde", "La puissance",
      "La résilience", "L'authenticité"
    ],
    faults: [
      "Jalousie", "Possessivité", "Rancune", "Manipulation",
      "Secret excessif", "Destructivité", "Obsession", "Méfiance",
      "Cruauté", "Vindicte"
    ],
    description: "La Lune en Scorpion indique une vie émotionnelle d'une intensité extrême. Vous ressentez tout profondément - l'amour comme la haine, la joie comme la douleur. Votre capacité de transformation et de régénération est votre plus grande force. Vous cherchez l'authenticité absolue dans toutes vos relations.",
    emotionalNeeds: "Le Scorpion lunaire a besoin d'intensité émotionnelle et de fusion. Les relations superficielles vous effraient. Vous avez besoin de sentir que vous pouvez faire entièrement confiance à votre partenaire, ce qui implique souvent des tests émotionnels.",
    inLove: "En amour, vous êtes passionné et possessif. L'amour pour vous est une expérience totale, transformante. Vous cherchez la fusion complète avec votre partenaire, mais votre peur de la trahison peut créer des tensions. Votre loyauté est absolue pour ceux qui l'ont méritée.",
    advice: "Apprenez à lâcher prise et à faire confiance. Votre capacité à régénérer est un don - utilisez-la pour vous transformer, pas pour vous détruire. La vengeance ne vous apportera jamais la paix que vous cherchez."
  },
  "Sagittaire": {
    name: "Sagittaire",
    element: "Feu",
    planet: "Jupiter",
    color: "Violet, turquoise",
    stone: "Turquoise",
    symbol: "♐",
    expression: "Je vois",
    keyword: "EXPANSION",
    qualities: [
      "L'optimisme", "La philosophie", "L'aventure", "La liberté",
      "La générosité", "L'enthousiasme", "La sagesse", "L'ouverture d'esprit",
      "L'honnêteté", "Le sens de l'humour", "L'idéalisme", "La vision",
      "La joie de vivre", "L'exploration"
    ],
    faults: [
      "Impatience", "Imprudence", "Tactlessness", "Exagération",
      "Promesses non tenues", "Superficialité philosophique", "Inconstance",
      "Dogmatisme", "Étourderie", "Fuite des responsabilités"
    ],
    description: "La Lune en Sagittaire révèle un besoin fondamental de liberté, d'aventure et de sens. Vous êtes un éternel optimiste, toujours à la recherche de nouvelles expériences et de vérités plus grandes. Votre vision de la vie est large et généreuse, et vous avez besoin d'horizons illimités pour vous épanouir.",
    emotionalNeeds: "Le Sagittaire lunaire a besoin de liberté et d'aventure. L'ennui est votre pire ennemi. Vous avez besoin de sens et de but dans votre vie émotionnelle. Les voyages - physiques ou mentaux - nourrissent votre âme.",
    inLove: "En amour, vous êtes passionné mais avez peur de l'engagement qui pourrait vous enfermer. Vous cherchez un partenaire qui soit aussi votre meilleur ami, avec qui vous pouvez explorer le monde et partager des aventures. L'honnêteté et la liberté sont essentielles dans vos relations.",
    advice: "Apprenez que la vraie liberté peut exister dans l'engagement. Votre soif d'aventure peut être satisfaite par une exploration intérieure autant qu'extérieure. Les promesses que vous faites ont de la valeur - essayez de les honorer."
  },
  "Capricorne": {
    name: "Capricorne",
    element: "Terre",
    planet: "Saturne",
    color: "Noir, brun",
    stone: "Onyx",
    symbol: "♑",
    expression: "J'utilise",
    keyword: "RÉALISATION",
    qualities: [
      "L'ambition", "La discipline", "La persévérance", "La responsabilité",
      "Le pragmatisme", "La maîtrise de soi", "La fiabilité", "L'intégrité",
      "La maturité", "L'organisation", "Le sens du devoir", "La patience",
      "La détermination", "Le réalisme"
    ],
    faults: [
      "Rigidité", "Pessimisme", "Froideur émotionnelle", "Matérialisme",
      "Calcul", "Cynisme", "Exigence excessive", "Réticence au changement",
      "Répression émotionnelle", "Austérité"
    ],
    description: "La Lune en Capricorne révèle un besoin profond d'accomplissement, de structure et de reconnaissance sociale. Vous êtes naturellement ambitieux et discipliné, prêt à travailler dur pour atteindre vos objectifs. Votre maturité émotionnelle est grande, mais vous pouvez avoir du mal à exprimer vos sentiments.",
    emotionalNeeds: "Le Capricorne lunaire a besoin de structure, de buts clairs et de reconnaissance de ses accomplissements. La sécurité matérielle et le statut social sont importants pour votre bien-être émotionnel. Vous avez besoin de sentir que vous construisez quelque chose de durable.",
    inLove: "En amour, vous êtes sérieux et fidèle. Vous montrez votre amour par des actions concrètes et un engagement durable plutôt que par des démonstrations émotionnelles. Vous cherchez un partenaire fiable qui partage vos ambitions et vos valeurs traditionnelles.",
    advice: "Apprenez à vous permettre d'être vulnérable et à exprimer vos émotions. Le succès professionnel ne comblera pas tous vos besoins émotionnels. Permettez-vous de jouer et de vous détendre - la vie n'est pas qu'une série d'objectifs à accomplir."
  },
  "Verseau": {
    name: "Verseau",
    element: "Air",
    planet: "Uranus",
    color: "Bleu électrique, argent",
    stone: "Améthyste",
    symbol: "♒",
    expression: "Je sais",
    keyword: "INNOVATION",
    qualities: [
      "L'originalité", "L'indépendance", "L'humanitarisme", "La vision",
      "L'inventivité", "La liberté", "L'intellect", "L'amitié",
      "La modernité", "L'altruisme", "La progression", "L'objectivité",
      "L'ouverture d'esprit", "La créativité unique"
    ],
    faults: [
      "Détachement émotionnel", "Excentricité", "Têtu", "Rebellion",
      "Imprévisibilité", "Distance", "Utopisme", "Intolérance aux opinions contraires",
      "Froideur apparente", "Provocation"
    ],
    description: "La Lune en Verseau révèle un besoin fondamental de liberté et d'originalité. Vous êtes un visionnaire, toujours en avance sur votre temps, et vous avez besoin de vous sentir unique et différent. Les conventions sociales vous étouffent et vous cherchez constamment à repousser les limites établies.",
    emotionalNeeds: "Le Verseau lunaire a besoin de liberté absolue et d'exprimer son individualité. L'amitié est souvent plus importante que l'amour romantique traditionnel. Vous avez besoin d'un environnement progressiste et d'interactions intellectuelles stimulantes.",
    inLove: "En amour, vous êtes imprévisible et avez besoin de beaucoup d'espace. Vous cherchez un partenaire qui soit d'abord votre ami, qui respecte votre indépendance et partage vos idées progressistes. Les démonstrations émotionnelles traditionnelles vous mettent mal à l'aise.",
    advice: "Apprenez que la connexion émotionnelle profonde n'est pas une menace pour votre liberté. Votre détachement peut blesser ceux qui vous aiment. Permettez-vous de ressentir et d'exprimer vos émotions de manière authentique."
  },
  "Poissons": {
    name: "Poissons",
    element: "Eau",
    planet: "Neptune",
    color: "Vert d'eau, violet",
    stone: "Améthyste, Opale",
    symbol: "♓",
    expression: "Je crois",
    keyword: "TRANSCENDANCE",
    qualities: [
      "La compassion", "L'intuition", "L'imagination", "La sensibilité",
      "L'empathie", "La créativité", "Le mysticisme", "La douceur",
      "Le dévouement", "La sagesse intuitive", "L'adaptabilité", "Le romantisme",
      "La guérison", "L'inspiration"
    ],
    faults: [
      "Illusion", "Évasion", "Victimisation", "Confusion",
      "Passivité", "Dépendance", "Négligence", "Idéalisme excessif",
      "Sensibilité excessive", "Fuite de la réalité"
    ],
    description: "La Lune en Poissons révèle une sensibilité extrême et une connexion profonde avec le monde invisible. Vous êtes un éponge émotionnelle, absorbant les sentiments de ceux qui vous entourent. Votre imagination est sans limites et vous avez un accès direct à l'inconscient collectif.",
    emotionalNeeds: "Le Poissons lunaire a besoin de moments de solitude pour se régénérer émotionnellement. L'évasion sous toutes ses formes - méditation, art, rêverie, spiritualité - est essentielle à votre équilibre. Vous avez besoin de sentir connecté à quelque chose de plus grand que vous.",
    inLove: "En amour, vous êtes un romantique invétéré. Vous cherchez l'âme sœur et l'amour fusionnel. Votre capacité d'amour inconditionnel est votre plus beau don, mais vous pouvez idéaliser votre partenaire au point de ne pas voir la réalité. Les frontières émotionnelles sont difficiles pour vous.",
    advice: "Apprenez à vous protéger émotionnellement et à distinguer vos sentiments de ceux des autres. L'évasion peut devenir de l'évitement - restez ancré dans la réalité. Votre sensibilité est un don précieux qui nécessite d'être protégé."
  }
};

// Tableau des indices annuelles
const yearIndices: Record<number, number> = {
  1900: 20, 1901: 3, 1902: 13, 1903: 22, 1904: 4, 1905: 16, 1906: 26, 1907: 8, 1908: 17, 1909: 1,
  1910: 11, 1911: 20, 1912: 3, 1913: 14, 1914: 24, 1915: 6, 1916: 16, 1917: 0, 1918: 10, 1919: 19,
  1920: 1, 1921: 13, 1922: 23, 1923: 5, 1924: 14, 1925: 26, 1926: 8, 1927: 17, 1928: 0, 1929: 13,
  1930: 21, 1931: 3, 1932: 13, 1933: 25, 1934: 7, 1935: 16, 1936: 26, 1937: 10, 1938: 20, 1939: 2,
  1940: 12, 1941: 23, 1942: 5, 1943: 14, 1944: 25, 1945: 9, 1946: 18, 1947: 0, 1948: 11, 1949: 22,
  1950: 4, 1951: 13, 1952: 24, 1953: 7, 1954: 17, 1955: 26, 1956: 10, 1957: 20, 1958: 2, 1959: 12,
  1960: 23, 1961: 6, 1962: 15, 1963: 25, 1964: 8, 1965: 19, 1966: 1, 1967: 11, 1968: 21, 1969: 4,
  1970: 13, 1971: 24, 1972: 7, 1973: 17, 1974: 26, 1975: 10, 1976: 20, 1977: 3, 1978: 12, 1979: 12,
  1980: 5, 1981: 16, 1982: 25, 1983: 8, 1984: 18, 1985: 1, 1986: 11, 1987: 21, 1988: 4, 1989: 14,
  1990: 24, 1991: 7, 1992: 17, 1993: 27, 1994: 9, 1995: 20, 1996: 2, 1997: 13, 1998: 22, 1999: 5,
  2000: 17, 2001: 27, 2002: 9, 2003: 19, 2004: 2, 2005: 14, 2006: 24, 2007: 7, 2008: 18, 2009: 28,
  2010: 10, 2011: 21, 2012: 4, 2013: 15, 2014: 25, 2015: 8, 2016: 19, 2017: 1, 2018: 12, 2019: 22,
  2020: 5, 2021: 16, 2022: 26, 2023: 9, 2024: 20, 2025: 3, 2026: 13, 2027: 23, 2028: 6, 2029: 17,
  2030: 27, 2031: 10, 2032: 21, 2033: 4, 2034: 14, 2035: 25, 2036: 8, 2037: 19, 2038: 2, 2039: 12,
  2040: 23, 2041: 6, 2042: 16, 2043: 27, 2044: 10, 2045: 20, 2046: 3, 2047: 13, 2048: 24, 2049: 7
};

// Tableau des indices mensuelles
const monthIndices: Record<number, number> = {
  1: 0,   // Janvier
  2: 4,   // Février
  3: 4,   // Mars
  4: 8,   // Avrile
  5: 11,  // Mai
  6: 14,  // Juin
  7: 17,  // Juillet
  8: 21,  // Août
  9: 24,  // Septembre
  10: 27, // Octobre
  11: 3,  // Novembre
  12: 6   // Décembre
};

// Correspondance indices/signes
const indexToSign: Record<number, string> = {
  0: "Bélier", 1: "Bélier", 27: "Bélier", 28: "Bélier",
  2: "Taureau", 3: "Taureau", 4: "Taureau",
  5: "Gémeaux", 6: "Gémeaux",
  7: "Cancer", 8: "Cancer",
  9: "Lion", 10: "Lion",
  11: "Vierge", 12: "Vierge", 13: "Vierge",
  14: "Balance", 15: "Balance",
  16: "Scorpion", 17: "Scorpion",
  18: "Sagittaire", 19: "Sagittaire",
  20: "Capricorne", 21: "Capricorne", 22: "Capricorne",
  23: "Verseau", 24: "Verseau",
  25: "Poissons", 26: "Poissons"
};

// Vérifier si une année est bissextile
function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Calculer le signe lunaire
export function calculateLunarSign(day: number, month: number, year: number): LunarSign | null {
  // Valider les entrées
  if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2050) {
    return null;
  }

  // Obtenir l'indice de l'année
  const yearIndex = yearIndices[year];
  if (yearIndex === undefined) {
    return null;
  }

  // Obtenir l'indice du mois
  const monthIndex = monthIndices[month];
  if (monthIndex === undefined) {
    return null;
  }

  // Calculer la somme
  let total = yearIndex + monthIndex + day;

  // Ajouter 1 si année bissextile
  if (isLeapYear(year)) {
    total += 1;
  }

  // Soustraire 27 ou 55 si nécessaire
  if (total >= 55) {
    total -= 55;
  } else if (total >= 27) {
    total -= 27;
  }

  // Obtenir le signe correspondant
  const signName = indexToSign[total];
  if (!signName) {
    return null;
  }

  return lunarSigns[signName] || null;
}

// Obtenir tous les signes
export function getAllLunarSigns(): LunarSign[] {
  return Object.values(lunarSigns);
}
