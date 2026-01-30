/**
 * CMS Service - Abstraction layer for content management
 * Can switch between localStorage and API backend
 * NOW WITH REAL INTEXTO.CA CONTENT!
 */

const STORAGE_KEY = "intexto_content";
const USE_API = false; // Toggle to switch to API backend

class CMSService {
  constructor() {
    this.apiUrl = import.meta.env.VITE_API_URL || "http://localhost:1337";
  }

  // Generate unique ID
  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Initialize with REAL data from Intexto.ca
  getInitialData() {
    return [
      {
        id: this.generateId(),
        type: "article",
        title: "Une prestation canadienne pour l'épicerie remplace la TPS",
        category: "politique",
        image:
          "https://www.intexto.ca/wp-content/uploads/2026/01/Mark-Carney-arrives-Rideau-Hall-Kamara-Morozuk-The-Narwhal-250314-scaled-1-585x445.jpg",
        excerpt:
          "Le gouvernement fédéral annonce un nouveau programme d'aide alimentaire pour remplacer l'exemption de TPS sur les produits d'épicerie.",
        content:
          "Dans une annonce majeure qui marque un tournant dans la politique sociale canadienne, le gouvernement fédéral dévoile un nouveau programme de prestation canadienne pour l'épicerie. Cette mesure ambitieuse vise à aider les familles canadiennes à faire face à la hausse constante des coûts alimentaires qui affecte particulièrement les ménages à revenu faible et moyen.\n\nLe programme remplace l'exemption temporaire de TPS sur les produits d'épicerie et offre un soutien financier direct, mensuel et prévisible. Selon les estimations du ministère des Finances, près de 8 millions de ménages canadiens bénéficieront de cette nouvelle prestation, avec des montants variant entre 200$ et 500$ par mois selon la composition familiale et le revenu.\n\nLes critères d'admissibilité sont simples : tout ménage canadien dont le revenu annuel brut est inférieur à 65 000$ pour une personne seule ou 85 000$ pour un couple aura droit à la prestation complète. Un système de réduction progressive s'appliquera pour les revenus supérieurs, jusqu'à un plafond de 100 000$.\n\nLe premier ministre a souligné que cette mesure répond directement aux préoccupations exprimées par les Canadiens lors des dernières consultations publiques. 'Nous avons écouté. Les familles nous disent que le coût de l'épicerie est devenu un fardeau insoutenable. Cette prestation apportera un soulagement immédiat et tangible', a-t-il déclaré.\n\nLes paiements débuteront dès le mois prochain, sans nécessité de faire une demande pour ceux qui ont déjà produit leur déclaration de revenus. L'Agence du revenu du Canada utilisera les informations fiscales existantes pour déterminer l'admissibilité et le montant des prestations.\n\nLes économistes saluent cette approche ciblée qui, selon eux, aura un impact direct sur le pouvoir d'achat des ménages les plus vulnérables tout en évitant les effets inflationnistes d'une exemption de taxe généralisée.",
        author: "Rédaction Intexto",
        date: new Date("2026-01-28").toISOString(),
        featured: true,
      },
      {
        id: this.generateId(),
        type: "article",
        title:
          "Les obsèques de Larose dans la plus stricte intimité à Montréal",
        category: "actualite",
        image:
          "https://www.intexto.ca/wp-content/uploads/2026/01/Larose-1-1-270x205.jpg",
        excerpt:
          "Les funérailles du célèbre chanteur Dieudonné Larose se sont déroulées à Montréal dans la plus stricte intimité.",
        content:
          "La communauté haïtienne de Montréal et d'ailleurs pleure la perte de Dieudonné Larose, figure emblématique de la musique haïtienne dont la voix a bercé plusieurs générations. Les obsèques de ce géant de la chanson se sont tenues mardi dernier dans la plus stricte intimité familiale, respectant ainsi les dernières volontés du défunt qui souhaitait des funérailles simples et discrètes.\n\nSeuls les membres de la famille immédiate et quelques amis proches ont pu assister à la cérémonie qui s'est déroulée dans une chapelle du nord de Montréal. Malgré les nombreuses demandes d'artistes, de personnalités publiques et de fans désirant rendre un dernier hommage, la famille a maintenu sa décision de préserver l'intimité de ce moment de recueillement.\n\nDieudonné Larose, décédé à l'âge de 78 ans des suites d'une longue maladie, laisse derrière lui un héritage musical inestimable. Avec plus de 50 ans de carrière, 15 albums studios et des centaines de concerts à travers le monde, il a marqué de son empreinte indélébile la musique haïtienne. Ses chansons, qui mêlaient avec brio compas, bolero et racines traditionnelles, ont transcendé les frontières et touché le cœur de millions de personnes.\n\nParmi ses succès les plus mémorables, on compte 'Lanmou san limit', 'Souvenance', et 'Ayiti chéri', cette dernière étant devenue un véritable hymne pour la diaspora haïtienne. Son style unique, sa voix chaude et son engagement pour la culture haïtienne ont fait de lui une icône respectée et admirée.\n\nLa famille a annoncé qu'une cérémonie d'hommage publique sera organisée dans les semaines à venir, permettant ainsi aux admirateurs et au public de célébrer la vie et l'œuvre de cet artiste exceptionnel. Les détails de cet événement seront communiqués ultérieurement.\n\nPlusieurs artistes haïtiens ont déjà exprimé leur tristesse sur les réseaux sociaux, saluant la mémoire d'un mentor, d'un ami et d'un pilier de la culture haïtienne. 'Nous avons perdu un géant, mais sa musique continuera de vivre éternellement', a écrit le chanteur Michel Martelly dans un message émouvant.",
        author: "Rédaction Intexto",
        date: new Date("2026-01-23").toISOString(),
        featured: true,
      },
      {
        id: this.generateId(),
        type: "article",
        title: "Leslie Voltaire et Edgard Leblanc Fils ou les derniers Cacos",
        category: "politique",
        image:
          "https://www.intexto.ca/wp-content/uploads/2026/01/l-voltaire-et-e-leblanc-585x445.jpg",
        excerpt:
          "Analyse historique et politique sur deux figures importantes du leadership haïtien contemporain.",
        content:
          "Leslie Voltaire et Edgard Leblanc Fils incarnent une tradition politique haïtienne qui puise ses racines dans l'histoire des Cacos. Cet article examine leur parcours, leurs contributions et leur place dans le paysage politique actuel d'Haïti. Une analyse approfondie de leur leadership et de leur vision pour le pays.",
        author: "Rédaction Intexto",
        date: new Date("2026-01-26").toISOString(),
        featured: true,
      },
      {
        id: this.generateId(),
        type: "article",
        title:
          "9e Sommet des SdesJ: les communautés interpellent les politiciens",
        category: "politique",
        image:
          "https://www.intexto.ca/wp-content/uploads/2026/01/e-staco-585x445.jpeg",
        excerpt:
          "Les leaders communautaires engagent un dialogue direct avec les élus lors de la 9e édition du Sommet.",
        content:
          "Le 9e Sommet des Services de Justice a réuni leaders communautaires et représentants politiques dans un dialogue franc sur les enjeux qui préoccupent les communautés. Les participants ont soulevé des questions cruciales concernant la justice sociale, l'équité et l'inclusion. Un moment fort de mobilisation citoyenne.",
        author: "Rédaction Intexto",
        date: new Date("2026-01-24").toISOString(),
        featured: true,
      },
      {
        id: this.generateId(),
        type: "article",
        title: "Béatrice Maurose, voix de la poésie migrante et féminine",
        category: "culture",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/09/b-maurose-1-270x205.jpg",
        excerpt:
          'Chronique littéraire sur la poétesse et son recueil "Fragments de mes 65", célébrant la voix féminine et migrante.',
        content:
          "Béatrice Maurose s'impose comme une voix incontournable de la poésie migrante au Québec. Son dernier recueil \"Fragments de mes 65\" explore avec finesse et profondeur les thèmes de l'identité, de l'exil et de la féminité. Une œuvre qui résonne avec l'expérience de nombreuses femmes immigrantes.",
        author: "Henri-Robert Durandisse",
        date: new Date("2025-09-18").toISOString(),
        featured: true,
      },
      {
        id: this.generateId(),
        type: "article",
        title: "Il investit 4 millions dans DameSara",
        category: "actualite",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/11/dr-gracia-etienne-1140x660.png",
        excerpt:
          "Le Dr Gracia Étienne, spécialiste en orthopédie de Pennsylvanie, investit 4 millions $ dans le projet DameSara à Montréal-Nord.",
        content:
          "Le Dr Gracia Étienne, chirurgien orthopédiste renommé de Pennsylvanie, annonce un investissement majeur de 4 millions de dollars dans DameSara, un projet ambitieux situé à Montréal-Nord. Cette initiative vise à revitaliser le quartier et à offrir des opportunités économiques à la communauté. Un geste qui témoigne de l'engagement de la diaspora haïtienne envers le développement communautaire.",
        author: "Jean Numa Goudou",
        date: new Date("2025-11-22").toISOString(),
        featured: false,
      },
      {
        id: this.generateId(),
        type: "article",
        title: "Pour aider les immigrants à travailler dans la santé",
        category: "actualite",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/11/sante-divesite-2-1140x660.jpg",
        excerpt:
          'L\'organisation "Santé diversité" accompagne les professionnels de la santé immigrants dans la reconnaissance de leurs diplômes au Canada.',
        content:
          "L'organisation \"Santé diversité\" joue un rôle crucial en aidant les professionnels de la santé immigrants à naviguer le processus complexe de reconnaissance des diplômes et de transition de carrière au Canada. Ce soutien est essentiel pour intégrer les talents internationaux dans le système de santé québécois, qui fait face à une pénurie de main-d'œuvre.",
        author: "Lucmane Vieux",
        date: new Date("2025-11-19").toISOString(),
        featured: false,
      },
      {
        id: this.generateId(),
        type: "article",
        title: "Le Canada cherche 5000 médecins étrangers",
        category: "politique",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/12/diab-1-1140x660.jpg",
        excerpt:
          "Nouvelle catégorie d'Entrée express pour les médecins étrangers ayant au moins un an d'expérience de travail au Canada.",
        content:
          "Le gouvernement canadien lance une nouvelle catégorie d'Entrée express spécialement conçue pour attirer 5000 médecins étrangers. Les candidats doivent avoir au moins un an d'expérience de travail au Canada dans le domaine médical. Cette initiative vise à pallier la pénurie critique de médecins à travers le pays et à améliorer l'accès aux soins de santé.",
        author: "Jean Numa Goudou",
        date: new Date("2025-12-08").toISOString(),
        featured: false,
      },
      {
        id: this.generateId(),
        type: "article",
        title: "Une plateforme pour la Santé mentale des Noirs",
        category: "actualite",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/12/sante-mentale-noir-390x325.png",
        excerpt:
          "Lancement d'une nouvelle plateforme dédiée aux services de santé mentale pour les communautés noires.",
        content:
          "Une nouvelle plateforme voit le jour pour répondre aux besoins spécifiques en santé mentale des communautés noires. Cette initiative reconnaît les barrières systémiques et culturelles qui empêchent souvent l'accès aux soins de santé mentale adaptés. La plateforme offre des ressources, du soutien et met en contact avec des professionnels sensibles aux réalités des personnes noires.",
        author: "Rédaction Intexto",
        date: new Date("2025-12-01").toISOString(),
        featured: false,
      },
      {
        id: this.generateId(),
        type: "article",
        title: "Contrer le racisme par la création culturelle",
        category: "culture",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/10/biennale-mdh-1140x660.png",
        excerpt:
          "Le ministère du Patrimoine canadien accorde près de 300 000$ à la Maison d'Haïti pour la Biennale des femmes artistes afrodescendantes.",
        content:
          "Le ministère du Patrimoine canadien investit près de 300 000 dollars dans la Maison d'Haïti pour organiser la première Biennale des femmes artistes afrodescendantes. Cette initiative culturelle majeure vise à combattre le racisme par l'art et la célébration de la créativité des femmes noires. Un événement qui promet de marquer l'histoire culturelle montréalaise.",
        author: "Jean Numa Goudou",
        date: new Date("2025-10-17").toISOString(),
        featured: false,
      },
      {
        id: this.generateId(),
        type: "article",
        title: "Entrepreneuriat noir: 189 millions investis par le fédéral",
        category: "politique",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-20-at-11.33.01_69cf56a0-1140x660.png",
        excerpt:
          "Le gouvernement fédéral annonce un investissement majeur de 189 millions de dollars pour soutenir l'entrepreneuriat noir au Canada.",
        content:
          "Dans un geste historique, le gouvernement fédéral dévoile un programme de 189 millions de dollars dédié au soutien de l'entrepreneuriat dans les communautés noires. Cette initiative vise à éliminer les barrières systémiques à l'accès au capital et aux ressources entrepreneuriales. Un investissement qui témoigne de la reconnaissance de la contribution économique des entrepreneurs noirs.",
        author: "Jean Numa Goudou",
        date: new Date("2025-10-20").toISOString(),
        featured: false,
      },
      {
        id: this.generateId(),
        type: "article",
        title: "Un regard entre générations, porteur de mémoire et d'espoir",
        category: "actualite",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/11/Lhistoire-et-lavenir-1140x660.png",
        excerpt:
          "Cérémonie du jour du Souvenir mettant en vedette le vétéran Roger Laliberté et un jeune cadet, symbolisant la continuité générationnelle.",
        content:
          "La cérémonie du jour du Souvenir a été marquée par un moment touchant réunissant le vétéran Roger Laliberté et un jeune cadet. Cette rencontre intergénérationnelle symbolise la transmission de la mémoire et des valeurs au sein de la communauté. Un rappel poignant de l'importance de préserver l'histoire tout en regardant vers l'avenir avec espoir.",
        author: "Rony Sanon",
        date: new Date("2025-11-13").toISOString(),
        featured: false,
      },
      {
        id: this.generateId(),
        type: "article",
        title:
          "La communauté haïtienne de Montréal, grande perdante des élections de 2025",
        category: "politique",
        image:
          "https://www.intexto.ca/wp-content/uploads/2019/05/la-perle_web.jpg",
        excerpt:
          "Analyse des résultats électoraux de 2025 et leur impact sur la représentation politique de la communauté haïtienne à Montréal.",
        content:
          "Les élections de 2025 ont révélé un recul préoccupant dans la représentation politique de la communauté haïtienne de Montréal. Malgré une contribution active aux secteurs politique, social et culturel de la société québécoise, les résultats électoraux montrent une diminution de la présence haïtienne dans les instances décisionnelles. Une analyse approfondie des causes et des conséquences de cette situation.",
        author: "Roger Romulus",
        date: new Date("2026-01-14").toISOString(),
        featured: false,
      },
      {
        id: this.generateId(),
        type: "article",
        title: "Municipales 2025: plus de 80 Noirs sur les poteaux",
        category: "politique",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/10/candiddats-noirs-1140x660.jpg",
        excerpt:
          "Plus de 80 candidats noirs se présentent aux élections municipales de 2025 à travers le Québec, un nombre record.",
        content:
          "Les élections municipales de 2025 marquent un tournant historique avec plus de 80 candidats noirs en lice à travers le Québec. Cette mobilisation sans précédent témoigne d'un engagement croissant des communautés noires dans la vie politique municipale. Un signe encourageant de diversification de la représentation politique au niveau local.",
        author: "Jean Numa Goudou",
        date: new Date("2025-10-23").toISOString(),
        featured: false,
      },
      {
        id: this.generateId(),
        type: "article",
        title:
          "De l'OCPM à 2025, les gains des groupes sous-représentés s'effritent",
        category: "actualite",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/01/une-Guedwig-Bernier-1140x660.jpg",
        excerpt:
          "Analyse montrant que les progrès réalisés par les groupes sous-représentés depuis les constats de racisme systémique de l'OCPM en 2020 s'érodent.",
        content:
          "Un rapport alarmant révèle que les gains réalisés par les groupes sous-représentés suite aux conclusions de l'Office de consultation publique de Montréal sur le racisme systémique en 2020 sont en train de s'effriter. Cette régression soulève des questions sur l'engagement réel des institutions à combattre les inégalités structurelles.",
        author: "Guedwig Bernier",
        date: new Date("2025-11-28").toISOString(),
        featured: false,
      },
      {
        id: this.generateId(),
        type: "video",
        title: "Entrevue exclusive avec Leslie Voltaire sur l'avenir d'Haïti",
        category: "politique",
        image:
          "https://www.intexto.ca/wp-content/uploads/2026/01/l-voltaire-et-e-leblanc-585x445.jpg",
        excerpt:
          "Dans cette entrevue vidéo exclusive, Leslie Voltaire partage sa vision pour l'avenir politique d'Haïti et discute des défis actuels du pays.",
        content:
          "Dans cette entrevue exclusive de 45 minutes, Leslie Voltaire, architecte et figure politique haïtienne de premier plan, nous livre une analyse approfondie de la situation actuelle en Haïti et présente sa vision pour sortir le pays de la crise.\n\nM. Voltaire aborde plusieurs thèmes cruciaux : la nécessité d'une transition démocratique inclusive, le rôle de la communauté internationale, les défis sécuritaires auxquels fait face le pays, et l'importance de reconstruire les institutions étatiques. Il insiste particulièrement sur la participation citoyenne et la responsabilité collective dans le processus de reconstruction nationale.\n\nCette conversation franche et éclairante offre un regard unique sur les enjeux politiques haïtiens contemporains, enrichi par des décennies d'expérience politique et d'engagement communautaire. Un document essentiel pour comprendre les défis et les opportunités qui se présentent à Haïti.",
        author: "Rédaction Intexto",
        date: new Date("2026-01-20").toISOString(),
        featured: true,
        mediaUrl: "https://example.com/video/voltaire-interview.mp4",
      },
      {
        id: this.generateId(),
        type: "audio",
        title: "Podcast: La culture haïtienne à Montréal",
        category: "culture",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/09/b-maurose-1-270x205.jpg",
        excerpt:
          "Un podcast explorant la richesse de la culture haïtienne à Montréal, avec des témoignages d'artistes, écrivains et acteurs communautaires.",
        content:
          "Bienvenue dans ce nouvel épisode de notre série podcast consacrée à la diaspora haïtienne. Aujourd'hui, nous explorons la richesse et la diversité de la culture haïtienne à Montréal, une ville qui accueille l'une des plus importantes communautés haïtiennes au Canada.\n\nNous recevons trois invités exceptionnels : Béatrice Maurose, poétesse et figure de la littérature migrante, qui partage son parcours d'écrivaine entre Haïti et le Québec ; Jean-Claude Sanon, directeur artistique et organisateur d'événements culturels, qui nous parle des festivals et célébrations qui animent la communauté ; et Marie-Josée Alcindor, professeure d'histoire, qui replace cette effervescence culturelle dans un contexte historique et social plus large.\n\nÀ travers leurs témoignages, nous découvrons comment la culture haïtienne enrichit le paysage culturel montréalais, des arts visuels à la musique, en passant par la littérature, le théâtre et la gastronomie. Une célébration de la créativité, de la résilience et de l'apport inestimable de la communauté haïtienne au tissu multiculturel québécois.\n\nDurée : 52 minutes",
        author: "Henri-Robert Durandisse",
        date: new Date("2026-01-25").toISOString(),
        featured: true,
        mediaUrl: "https://example.com/audio/culture-haitienne-mtl.mp3",
      },
      {
        id: this.generateId(),
        type: "video",
        title: "Table ronde: L'entrepreneuriat dans la communauté noire",
        category: "politique",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/10/WhatsApp-Image-2025-10-20-at-11.33.01_69cf56a0-1140x660.png",
        excerpt:
          "Discussion approfondie sur les défis et opportunités de l'entrepreneuriat noir au Canada, avec des entrepreneurs à succès.",
        content:
          "Table ronde réunissant quatre entrepreneurs noirs à succès qui partagent leurs expériences, défis et conseils. Une discussion enrichissante sur l'accès au financement, le mentorat, et les stratégies de croissance.",
        author: "Rédaction Intexto",
        date: new Date("2026-01-18").toISOString(),
        featured: false,
        mediaUrl: "https://example.com/video/entrepreneuriat-noir.mp4",
      },
      {
        id: this.generateId(),
        type: "audio",
        title: "Podcast: Immigrer au Canada - Guide pratique",
        category: "actualite",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/12/diab-1-1140x660.jpg",
        excerpt:
          "Guide audio complet sur les démarches d'immigration au Canada, avec des conseils d'experts et témoignages de nouveaux arrivants.",
        content:
          "Ce podcast de 45 minutes offre un guide complet pour naviguer le processus d'immigration au Canada. Avec des experts en immigration et des témoignages de nouveaux arrivants.",
        author: "Jean Numa Goudou",
        date: new Date("2026-01-15").toISOString(),
        featured: false,
        mediaUrl: "https://example.com/audio/immigration-canada.mp3",
      },
      {
        id: this.generateId(),
        type: "video",
        title: "Reportage: La santé mentale dans les communautés noires",
        category: "actualite",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/12/sante-mentale-noir-390x325.png",
        excerpt:
          "Reportage vidéo explorant les enjeux de santé mentale spécifiques aux communautés noires et les ressources disponibles.",
        content:
          "Un reportage de 30 minutes qui aborde les stigmates, les barrières d'accès aux soins et les initiatives communautaires pour améliorer la santé mentale dans les communautés noires.",
        author: "Rédaction Intexto",
        date: new Date("2026-01-12").toISOString(),
        featured: false,
        mediaUrl: "https://example.com/video/sante-mentale-noirs.mp4",
      },
      {
        id: this.generateId(),
        type: "audio",
        title: "Podcast: Histoires de la diaspora haïtienne",
        category: "voyage",
        image:
          "https://www.intexto.ca/wp-content/uploads/2025/11/Lhistoire-et-lavenir-1140x660.png",
        excerpt:
          "Série de témoignages sur les parcours migratoires et l'adaptation des Haïtiens à travers le monde.",
        content:
          "Une série captivante de témoignages personnels qui racontent les histoires de migration, d'adaptation et de succès de membres de la diaspora haïtienne à travers le monde. Durée: 38 minutes",
        author: "Rony Sanon",
        date: new Date("2026-01-10").toISOString(),
        featured: false,
        mediaUrl: "https://example.com/audio/diaspora-haitienne.mp3",
      },
      {
        id: this.generateId(),
        type: "video",
        title: "Festival de musique haïtienne 2026 - Highlights",
        category: "culture",
        image:
          "https://www.intexto.ca/wp-content/uploads/2026/01/Larose-1-1-270x205.jpg",
        excerpt:
          "Les meilleurs moments du Festival de musique haïtienne 2026, célébrant la richesse musicale d'Haïti.",
        content:
          "Revivez les moments forts du Festival de musique haïtienne 2026 avec des performances exceptionnelles de compas, racines, et musique contemporaine. Une célébration vibrante de la culture musicale haïtienne.",
        author: "Rédaction Intexto",
        date: new Date("2026-01-08").toISOString(),
        featured: false,
        mediaUrl: "https://example.com/video/festival-musique-2026.mp4",
      },
    ];
  }

  // Load all content
  async loadContent() {
    if (USE_API) {
      return this.loadFromAPI();
    }
    return this.loadFromLocalStorage();
  }

  loadFromLocalStorage() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored);
        // Force refresh if data is outdated (has fewer than 20 items)
        if (data.length < 20) {
          console.log("Refreshing data with new content...");
          const initial = this.getInitialData();
          this.saveToLocalStorage(initial);
          return initial;
        }
        return data;
      }
      const initial = this.getInitialData();
      this.saveToLocalStorage(initial);
      return initial;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return this.getInitialData();
    }
  }

  async loadFromAPI() {
    try {
      const response = await fetch(`${this.apiUrl}/api/contents`);
      if (!response.ok) throw new Error("API Error");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error loading from API:", error);
      return this.loadFromLocalStorage(); // Fallback
    }
  }

  // Save content
  async saveContent(content) {
    if (USE_API) {
      return this.saveToAPI(content);
    }
    return this.saveToLocalStorage(content);
  }

  saveToLocalStorage(content) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  }

  async saveToAPI(content) {
    try {
      const response = await fetch(`${this.apiUrl}/api/contents`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      return response.ok;
    } catch (error) {
      console.error("Error saving to API:", error);
      return false;
    }
  }

  // Add new content
  async addContent(contentData) {
    const content = await this.loadContent();
    const newContent = {
      id: this.generateId(),
      ...contentData,
      date: new Date().toISOString(),
    };
    content.unshift(newContent);
    await this.saveContent(content);
    return newContent;
  }

  // Update content
  async updateContent(id, updates) {
    const content = await this.loadContent();
    const index = content.findIndex((item) => item.id === id);
    if (index !== -1) {
      content[index] = { ...content[index], ...updates };
      await this.saveContent(content);
      return content[index];
    }
    return null;
  }

  // Delete content
  async deleteContent(id) {
    const content = await this.loadContent();
    const filtered = content.filter((item) => item.id !== id);
    await this.saveContent(filtered);
    return true;
  }

  // Get content by ID
  async getContentById(id) {
    const content = await this.loadContent();
    return content.find((item) => item.id === id);
  }

  // Get featured content
  async getFeaturedContent(limit = 5) {
    const content = await this.loadContent();
    return content.filter((item) => item.featured).slice(0, limit);
  }

  // Filter by category
  filterByCategory(content, category) {
    if (category === "all") return content;
    return content.filter((item) => item.category === category);
  }

  // Filter by type
  filterByType(content, type) {
    if (type === "all") return content;
    return content.filter((item) => item.type === type);
  }

  // Search content
  searchContent(content, query) {
    const lowerQuery = query.toLowerCase();
    return content.filter(
      (item) =>
        item.title.toLowerCase().includes(lowerQuery) ||
        item.excerpt.toLowerCase().includes(lowerQuery) ||
        item.content.toLowerCase().includes(lowerQuery) ||
        item.author.toLowerCase().includes(lowerQuery),
    );
  }

  // Format date
  formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Aujourd'hui";
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;

    return date.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  // Get statistics
  async getStats() {
    const content = await this.loadContent();
    return {
      total: content.length,
      articles: content.filter((i) => i.type === "article").length,
      videos: content.filter((i) => i.type === "video").length,
      audios: content.filter((i) => i.type === "audio").length,
      byCategory: {
        actualite: content.filter((i) => i.category === "actualite").length,
        politique: content.filter((i) => i.category === "politique").length,
        voyage: content.filter((i) => i.category === "voyage").length,
        culture: content.filter((i) => i.category === "culture").length,
      },
    };
  }
}

export default new CMSService();
