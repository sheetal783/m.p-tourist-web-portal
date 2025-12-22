const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Destination = require('../models/Destination');
const connectDB = require('../config/db');

dotenv.config();
connectDB();

// Destination data with coordinates (approximate coordinates for MP locations)
const destinations = [
  {
    name: "Kanha National Park",
    slug: "kanha-national-park",
    category: "Eco Tourism",
    categoryId: "eco",
    image: "/assets/kanha-tiger.jpg",
    description: "Home to the majestic Bengal tiger",
    fullDescription: "Kanha National Park, one of the largest national parks in Madhya Pradesh, is renowned for its well-maintained ecosystem that supports a large population of Royal Bengal Tigers. The park was the inspiration for Rudyard Kipling's legendary novel 'The Jungle Book'. The lush sal and bamboo forests, grassy meadows, and ravines are home to diverse wildlife including tigers, leopards, sloth bears, and the rare Barasingha.",
    bestTime: "October to June",
    duration: "2-3 Days",
    guidelines: [
      "Maintain silence during safari to respect wildlife",
      "Do not litter - carry back all waste",
      "Stay inside the vehicle during safari",
      "Support local eco-lodges and guides",
      "Avoid flash photography"
    ],
    highlights: [
      "Tiger Safari",
      "Barasingha Spotting",
      "Bird Watching",
      "Nature Walks"
    ],
    location: {
      lat: 22.1667,
      lng: 80.6167,
      address: "Mandla District, Madhya Pradesh, India"
    }
  },
  {
    name: "Khajuraho Temples",
    slug: "khajuraho-temples",
    category: "Cultural Heritage",
    categoryId: "heritage",
    image: "/assets/khajuraho.jpg",
    description: "UNESCO World Heritage masterpiece",
    fullDescription: "The Khajuraho Group of Monuments is a UNESCO World Heritage Site featuring medieval Hindu and Jain temples, famous for their stunning erotic sculptures and intricate architectural details. Built between 950-1050 AD by the Chandela dynasty, these temples represent one of the most remarkable achievements of Indian art and architecture. The sandstone temples showcase exceptional craftsmanship with detailed carvings depicting various aspects of life.",
    bestTime: "October to March",
    duration: "1-2 Days",
    guidelines: [
      "Respect the heritage site - do not touch carvings",
      "Dress modestly as a sign of respect",
      "Hire local certified guides for authentic experiences",
      "Purchase handicrafts from local artisans",
      "Attend the evening Light & Sound show"
    ],
    highlights: [
      "Kandariya Mahadeva Temple",
      "Light & Sound Show",
      "Archaeological Museum",
      "Local Art Villages"
    ],
    location: {
      lat: 24.8519,
      lng: 79.9199,
      address: "Khajuraho, Chhatarpur District, Madhya Pradesh, India"
    }
  },
  {
    name: "Pachmarhi",
    slug: "pachmarhi",
    category: "Hill Station",
    categoryId: "eco",
    image: "/assets/pachmarhi.jpg",
    description: "Queen of Satpura ranges",
    fullDescription: "Pachmarhi, often called the 'Queen of Satpura', is the only hill station in Madhya Pradesh. Nestled at an altitude of 1,067 meters in the Satpura Range, this serene destination offers breathtaking waterfalls, ancient caves with prehistoric rock paintings, lush green forests, and a pleasant climate throughout the year. The town is part of the Pachmarhi Biosphere Reserve, making it a haven for nature lovers and adventure seekers alike.",
    bestTime: "March to June & September to November",
    duration: "2-3 Days",
    guidelines: [
      "Stay on marked trails during treks",
      "Carry reusable water bottles",
      "Support local homestays and eco-lodges",
      "Do not disturb rock art sites",
      "Participate in clean-up drives"
    ],
    highlights: [
      "Bee Falls",
      "Jata Shankar Caves",
      "Pandava Caves",
      "Satpura Tiger Reserve"
    ],
    location: {
      lat: 22.4674,
      lng: 78.4346,
      address: "Pachmarhi, Hoshangabad District, Madhya Pradesh, India"
    }
  },
  {
    name: "Sanchi Stupa",
    slug: "sanchi-stupa",
    category: "Buddhist Heritage",
    categoryId: "heritage",
    image: "/assets/sanchi.jpg",
    description: "Ancient Buddhist monuments",
    fullDescription: "Sanchi is home to the finest surviving example of Buddhist art and architecture in India. The Great Stupa, built by Emperor Ashoka in the 3rd century BC, is a UNESCO World Heritage Site. The site contains numerous stupas, monasteries, temples, and pillars in various stages of preservation, all within a serene hilltop setting. The elaborately carved gateways (toranas) depict scenes from Buddha's life and Jataka tales.",
    bestTime: "October to March",
    duration: "Half to Full Day",
    guidelines: [
      "Remove footwear at designated areas",
      "Maintain silence and respect the spiritual atmosphere",
      "Do not climb on monuments",
      "Visit the Archaeological Museum",
      "Support Buddhist art preservation efforts"
    ],
    highlights: [
      "Great Stupa",
      "Ashoka Pillar",
      "Carved Gateways",
      "Archaeological Museum"
    ],
    location: {
      lat: 23.4794,
      lng: 77.7398,
      address: "Sanchi, Raisen District, Madhya Pradesh, India"
    }
  },
  {
    name: "Bandhavgarh National Park",
    slug: "bandhavgarh-national-park",
    category: "Eco Tourism",
    categoryId: "eco",
    image: "/assets/Bandhavgarh.jpg",
    description: "Known for having one of the highest tiger densities in India",
    fullDescription: "Bandhavgarh National Park, located in the Umaria district of Madhya Pradesh, is one of India's most famous wildlife reserves, especially known for its high density of Royal Bengal Tigers. The park is set around the ancient Bandhavgarh Fort, believed to be over 2,000 years old, adding historical significance to its natural beauty. Dense forests, rocky hills, and open grasslands create a rich habitat for wildlife such as tigers, leopards, deer, wild boars, and numerous bird species, making it a prime destination for wildlife enthusiasts and photographers.",
    bestTime: "October to June",
    duration: "2-3 Days",
    guidelines: [
      "Follow forest department rules strictly during safari",
      "Maintain silence to avoid disturbing wildlife",
      "Do not feed or provoke animals",
      "Stay inside the safari vehicle at all times",
      "Avoid using flash photography"
    ],
    highlights: [
      "High Tiger Sightings",
      "Bandhavgarh Fort",
      "Jeep Safari",
      "Wildlife Photography",
      "Bird Watching"
    ],
    location: {
      lat: 23.6958,
      lng: 80.9681,
      address: "Umaria District, Madhya Pradesh, India"
    }
  },
  {
    name: "Satpura National Park",
    slug: "satpura-national-park",
    category: "Eco Tourism",
    categoryId: "eco",
    image: "/assets/satpura.jpg",
    description: "A serene wilderness known for its rich biodiversity and untouched landscapes",
    fullDescription: "Satpura National Park, located in the Hoshangabad (Narmadapuram) district of Madhya Pradesh, is a unique and less-crowded wildlife destination offering a raw and immersive jungle experience. Named after the Satpura mountain range, the park features dense forests, rugged terrain, deep valleys, sandstone peaks, and the tranquil Denwa River. Unlike many other national parks, Satpura allows walking safaris, canoeing, and night safaris, making it ideal for travelers seeking adventure and solitude. The park is home to wildlife such as leopards, sloth bears, Indian bison (gaur), wild dogs, and a wide variety of bird species.",
    bestTime: "October to June",
    duration: "2-3 Days",
    guidelines: [
      "Follow forest officials' instructions during safaris",
      "Maintain silence to preserve the natural environment",
      "Do not litter or disturb flora and fauna",
      "Photography without flash is recommended",
      "Respect local tribal communities and eco-sensitive zones"
    ],
    highlights: [
      "Walking Safari",
      "Boat & Canoe Safari",
      "Night Safari",
      "Denwa River",
      "Bird Watching"
    ],
    location: {
      lat: 22.5333,
      lng: 78.2333,
      address: "Hoshangabad District, Madhya Pradesh, India"
    }
  },
  {
    name: "Orchha",
    slug: "orchha",
    category: "Heritage & Cultural Tourism",
    categoryId: "heritage",
    image: "/assets/orchha.jpg",
    description: "A historic town known for its grand palaces, temples, and riverside charm",
    fullDescription: "Orchha, a hidden gem on the banks of the Betwa River in Madhya Pradesh, is a historic town founded in the 16th century by the Bundela ruler Raja Rudra Pratap Singh. The town is famous for its well-preserved medieval architecture, including Orchha Fort Complex, Jahangir Mahal, Raj Mahal, and numerous temples. Blending rich history with spiritual significance, Orchha is also home to the unique Ram Raja Temple, where Lord Ram is worshipped as a king. The serene riverfront, cenotaphs (chhatris), and peaceful surroundings make Orchha a perfect destination for heritage lovers and cultural explorers.",
    bestTime: "October to March",
    duration: "1-2 Days",
    guidelines: [
      "Respect religious customs while visiting temples",
      "Dress modestly at heritage and spiritual sites",
      "Avoid littering near monuments and riverbanks",
      "Photography may be restricted in certain areas",
      "Support local artisans and guides"
    ],
    highlights: [
      "Orchha Fort Complex",
      "Jahangir Mahal",
      "Ram Raja Temple",
      "Chhatris of Betwa River",
      "Heritage Walks"
    ],
    location: {
      lat: 25.3544,
      lng: 78.6403,
      address: "Orchha, Tikamgarh District, Madhya Pradesh, India"
    }
  },
  {
    name: "Mandu",
    slug: "mandu",
    category: "Heritage & Cultural Tourism",
    categoryId: "heritage",
    image: "/assets/mandu.jpg",
    description: "A historic fortress city known for its Afghan architecture and romantic legends",
    fullDescription: "Mandu, also known as Mandavgarh, is a historic fortified city located in the Malwa region of Madhya Pradesh. Perched on a plateau in the Vindhya range, Mandu is renowned for its impressive Afghan-style architecture, grand palaces, mosques, and ancient water systems. Once the capital of the Malwa Sultanate, the city is closely associated with the legendary love story of Baz Bahadur and Rani Roopmati. Surrounded by scenic landscapes, lakes, and monsoon-fed waterfalls, Mandu offers a unique blend of history, architecture, and natural beauty.",
    bestTime: "October to March",
    duration: "1-2 Days",
    guidelines: [
      "Respect historical monuments and avoid climbing restricted structures",
      "Do not litter within the fort complex or water bodies",
      "Dress modestly while visiting religious structures",
      "Photography restrictions may apply in certain areas",
      "Support local guides and handicraft sellers"
    ],
    highlights: [
      "Jahaz Mahal",
      "Hindola Mahal",
      "Rani Roopmati Pavilion",
      "Jami Masjid",
      "Baz Bahadur Palace"
    ],
    location: {
      lat: 22.3667,
      lng: 75.3833,
      address: "Mandu, Dhar District, Madhya Pradesh, India"
    }
  },
  {
    name: "Gond Villages",
    slug: "gond-villages",
    category: "Tribal & Cultural Tourism",
    categoryId: "tribal",
    image: "/assets/Gond.jpg",
    description: "An authentic glimpse into the life, art, and traditions of the Gond tribe",
    fullDescription: "Gond villages in Madhya Pradesh offer an immersive cultural experience into the life of one of India's oldest and largest tribal communities. Spread across regions such as Mandla, Dindori, Seoni, Balaghat, and parts of Betul, these villages are known for their deep connection with nature, unique customs, folklore, music, and the globally acclaimed Gond art. Visitors can witness traditional mud houses adorned with symbolic paintings, participate in local festivals, interact with artisans, and understand sustainable forest-based living practices that have been preserved for centuries.",
    bestTime: "October to March",
    duration: "1-2 Days",
    guidelines: [
      "Seek permission before photographing people or homes",
      "Respect local customs, traditions, and sacred spaces",
      "Avoid plastic and minimize environmental impact",
      "Support local artisans by purchasing authentic Gond art",
      "Prefer guided visits arranged through local communities"
    ],
    highlights: [
      "Gond Tribal Art & Paintings",
      "Traditional Music & Dance",
      "Village Walks",
      "Local Handicrafts",
      "Forest-Based Lifestyle Experience"
    ],
    location: {
      lat: 22.5983,
      lng: 80.3714,
      address: "Mandla District, Madhya Pradesh, India"
    }
  },
  {
    name: "Bhil Communities",
    slug: "bhil-communities",
    category: "Tribal & Cultural Tourism",
    categoryId: "tribal",
    image: "/assets/Bhil.jpg",
    description: "Experience the vibrant culture, traditions, and festivals of the Bhil tribe",
    fullDescription: "The Bhil communities of Madhya Pradesh represent one of the largest and most culturally rich tribal groups in India. Primarily found in the western and south-western regions of the state, including Jhabua, Alirajpur, Dhar, Barwani, and parts of Ratlam, the Bhils are known for their strong sense of community, colorful attire, folk music, dance forms like Gair and Bhagoria, and deep-rooted traditions connected to nature. Visitors can explore traditional villages, observe indigenous farming practices, enjoy local cuisine, and gain insights into Bhil art, rituals, and storytelling that have been passed down through generations.",
    bestTime: "October to March",
    duration: "1-2 Days",
    guidelines: [
      "Always take consent before photographing individuals or ceremonies",
      "Respect tribal customs, festivals, and sacred spaces",
      "Avoid plastic usage and keep the surroundings clean",
      "Do not interfere with local rituals or daily activities",
      "Encourage community-based tourism and local guides"
    ],
    highlights: [
      "Bhagoria Festival",
      "Traditional Bhil Dance & Music",
      "Village Cultural Walks",
      "Indigenous Cuisine",
      "Local Handicrafts & Jewelry"
    ],
    location: {
      lat: 22.7673,
      lng: 74.6009,
      address: "Jhabua District, Madhya Pradesh, India"
    }
  },
  {
    name: "Baiga Tribes",
    slug: "baiga-tribes",
    category: "Tribal & Cultural Tourism",
    categoryId: "tribal",
    image: "/assets/Baiga.jpg",
    description: "An ancient forest-dwelling tribe known for nature-based living and rich traditions",
    fullDescription: "The Baiga tribes are among the most ancient and culturally significant indigenous communities of Madhya Pradesh. Primarily inhabiting the forested regions of Mandla, Dindori, Balaghat, and parts of Shahdol, the Baigas are traditionally known as skilled herbal healers, nature worshippers, and practitioners of sustainable forest-based living. Their lifestyle revolves around deep respect for the land, forests, and ancestral spirits. Visitors can experience traditional Baiga villages, observe distinctive tattoo art (Godna), learn about medicinal plant knowledge, and understand a way of life that has remained largely unchanged for centuries.",
    bestTime: "October to March",
    duration: "1-2 Days",
    guidelines: [
      "Seek permission before entering villages or photographing individuals",
      "Respect traditional beliefs, rituals, and sacred forest areas",
      "Avoid plastic use and minimize environmental impact",
      "Do not disturb daily activities or agricultural practices",
      "Prefer guided visits through community-based tourism initiatives"
    ],
    highlights: [
      "Baiga Tattoo Art (Godna)",
      "Traditional Herbal Healing Practices",
      "Forest Village Walks",
      "Baiga Folk Songs & Stories",
      "Indigenous Sustainable Lifestyle"
    ],
    location: {
      lat: 22.9333,
      lng: 81.0833,
      address: "Dindori District, Madhya Pradesh, India"
    }
  },
  {
    name: "Bhedaghat",
    slug: "bhedaghat",
    category: "Natural & Heritage Tourism",
    categoryId: "nature",
    image: "/assets/Bhedaghat.jpg",
    description: "Famous for its marble rocks, Dhuandhar Falls, and scenic Narmada views",
    fullDescription: "Bhedaghat, located near Jabalpur in Madhya Pradesh, is one of the most iconic natural attractions of the state. It is renowned for the stunning Marble Rocks (Safed Sangmarmar), where the Narmada River flows through a narrow gorge of towering white marble cliffs that glow in moonlight. The nearby Dhuandhar Falls, where the river plunges forcefully creating mist like smoke, is a major highlight. Boat rides through the marble canyon, especially during moonlit nights, offer a unique and unforgettable experience. Bhedaghat also holds cultural and religious significance, with ancient temples and ghats along the riverbanks.",
    bestTime: "October to March",
    duration: "1 Day",
    guidelines: [
      "Follow safety instructions during boat rides",
      "Avoid littering near the river and marble cliffs",
      "Photography may be restricted during night boat rides",
      "Be cautious near waterfalls during high water flow",
      "Respect religious sites and local customs"
    ],
    highlights: [
      "Marble Rocks Boat Ride",
      "Dhuandhar Falls",
      "Narmada River Ghats",
      "Moonlight Marble Rocks View",
      "Chausath Yogini Temple"
    ],
    location: {
      lat: 23.1333,
      lng: 79.8000,
      address: "Bhedaghat, Jabalpur District, Madhya Pradesh, India"
    }
  },
  {
    name: "Dhuandhar Falls",
    slug: "dhuandhar-falls",
    category: "Natural Tourism",
    categoryId: "nature",
    image: "/assets/Dhuandhar.jpg",
    description: "A powerful waterfall on the Narmada River known for its misty roar",
    fullDescription: "Dhuandhar Falls, located at Bhedaghat near Jabalpur, is one of the most spectacular waterfalls in Madhya Pradesh. The name 'Dhuandhar' comes from the Hindi words 'Dhuan' (smoke) and 'Dhar' (flow), referring to the thick mist created when the Narmada River plunges down a steep rocky slope. During periods of high water flow, the falls produce a thunderous sound and dense clouds of mist that can be seen from a distance. The surrounding marble rocks and viewpoints enhance the dramatic beauty of the falls, making it a must-visit natural attraction.",
    bestTime: "October to March",
    duration: "2-3 Hours",
    guidelines: [
      "Stay behind safety railings near viewpoints",
      "Avoid slippery rocks, especially during monsoon",
      "Do not litter around the waterfall area",
      "Follow local authority instructions during high water flow",
      "Be cautious of strong mist and reduced visibility"
    ],
    highlights: [
      "Roaring Waterfall View",
      "Mist & Rainbow Effect",
      "Viewpoints Along Narmada",
      "Photography Spots",
      "Nearby Marble Rocks"
    ],
    location: {
      lat: 23.1167,
      lng: 79.8167,
      address: "Bhedaghat, Jabalpur District, Madhya Pradesh, India"
    }
  },
  {
    name: "Panna National Park",
    slug: "panna-national-park",
    category: "Eco Tourism",
    categoryId: "eco",
    image: "/assets/Panna.jpg",
    description: "A revived tiger reserve known for its scenic gorges and riverine forests",
    fullDescription: "Panna National Park, located in the Bundelkhand region of Madhya Pradesh, is a remarkable example of successful wildlife conservation in India. Once declared nearly tigerless, the park has witnessed a strong revival through dedicated reintroduction and protection efforts. The park is characterized by dramatic plateaus, deep gorges, and the Ken River flowing through its landscape, creating a rich and diverse ecosystem. Panna is home to Royal Bengal Tigers, leopards, sloth bears, gharials, crocodiles, and a wide variety of bird species, making it a unique blend of terrestrial and aquatic wildlife experiences.",
    bestTime: "October to June",
    duration: "2-3 Days",
    guidelines: [
      "Follow forest department rules during safaris",
      "Maintain silence to avoid disturbing wildlife",
      "Do not litter or feed animals",
      "Stay inside the safari vehicle at all times",
      "Avoid flash photography"
    ],
    highlights: [
      "Tiger Safari",
      "Ken River & Gorges",
      "Gharial & Crocodile Spotting",
      "Bird Watching",
      "Waterfall Views (Seasonal)"
    ],
    location: {
      lat: 24.7167,
      lng: 80.1833,
      address: "Panna District, Madhya Pradesh, India"
    }
  }
];

const seedDestinations = async () => {
  try {
    // Clear existing destinations
    await Destination.deleteMany({});
    console.log('Cleared existing destinations');

    // Insert new destinations
    const createdDestinations = await Destination.insertMany(destinations);
    console.log(`Seeded ${createdDestinations.length} destinations`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding destinations:', error);
    process.exit(1);
  }
};

seedDestinations();





