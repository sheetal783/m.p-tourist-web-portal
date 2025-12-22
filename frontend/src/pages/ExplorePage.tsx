import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TreePine, Mountain, Users, Waves } from "lucide-react";
import { destinationService, Destination } from "@/services/api";
import MapComponent from "@/components/MapComponent";

// Image mapping for static imports
import kanhaImage from "@/assets/kanha-tiger.jpg";
import khajurahoImage from "@/assets/khajuraho.jpg";
import pachmarhiImage from "@/assets/pachmarhi.jpg";
import sanchiImage from "@/assets/sanchi.jpg";
import orchhaImage from "@/assets/orchha.jpg";
import manduImage from "@/assets/mandu.jpg";
import satpuraImage from "@/assets/satpura.jpg";
import BandhavgarhImage from "@/assets/Bandhavgarh.jpg";
import GondImage from "@/assets/Gond.jpg";
import BhilImage from "@/assets/Bhil.jpg";
import BaigaImage from "@/assets/Baiga.jpg";
import BhedaghatImage from "@/assets/Bhedaghat.jpg";
import DhuandharImage from "@/assets/Dhuandhar.jpg";
import PannaImage from "@/assets/Panna.jpg";

const imageMap: Record<string, string> = {
  "kanha-national-park": kanhaImage,
  "khajuraho-temples": khajurahoImage,
  "pachmarhi": pachmarhiImage,
  "sanchi-stupa": sanchiImage,
  "orchha": orchhaImage,
  "mandu": manduImage,
  "satpura-national-park": satpuraImage,
  "bandhavgarh-national-park": BandhavgarhImage,
  "gond-villages": GondImage,
  "bhil-communities": BhilImage,
  "baiga-tribes": BaigaImage,
  "bhedaghat": BhedaghatImage,
  "dhuandhar-falls": DhuandharImage,
  "panna-national-park": PannaImage,
};

const categories = [
  {
    id: "eco",
    icon: TreePine,
    title: "Eco Tourism",
    description: "Explore wildlife sanctuaries and natural reserves",
    color: "bg-forest",
  },
  {
    id: "heritage",
    icon: Mountain,
    title: "Cultural Heritage",
    description: "Discover UNESCO World Heritage monuments",
    color: "bg-terracotta",
  },
  {
    id: "tribal",
    icon: Users,
    title: "Tribal Experiences",
    description: "Connect with indigenous communities",
    color: "bg-amber",
  },
  {
    id: "nature",
    icon: Waves,
    title: "Nature & Waterfalls",
    description: "Experience scenic landscapes and water bodies",
    color: "bg-forest-light",
  },
];

const ExplorePage = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await destinationService.getAll();
        setDestinations(data);
      } catch (err: any) {
        console.error("Error fetching destinations:", err);
        const errorMessage = err.code === 'ECONNREFUSED' || err.message?.includes('Network Error')
          ? "Cannot connect to backend server. Please ensure the backend is running on http://localhost:5000"
          : err.response?.data?.message || "Failed to load destinations. Please try again later.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  // Group destinations by category
  const destinationsByCategory = categories.map((category) => ({
    ...category,
    places: destinations.filter((dest) => dest.categoryId === category.id),
  }));

  if (loading) {
    return (
      <main className="pt-20">
        <section className="section-padding bg-cream">
          <div className="container-custom">
            <div className="text-center py-20">
              <p className="text-muted-foreground">Loading destinations...</p>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pt-20">
        <section className="section-padding bg-cream">
          <div className="container-custom">
            <div className="text-center py-20">
              <p className="text-destructive mb-4">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-forest text-primary-foreground rounded-lg"
              >
                Retry
              </button>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Explore Madhya Pradesh
            </h1>
            <p className="text-lg text-muted-foreground">
              Discover the heart of India through our curated categories. From wildlife 
              sanctuaries to ancient heritage sites, tribal culture to natural wonders.
            </p>
          </div>
        </div>
      </section>

      {/* Map Section */}
      {destinations.length > 0 && (
        <section className="section-padding border-b border-border">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-6">
              Explore on Map
            </h2>
            <MapComponent
              destinations={destinations}
              selectedDestination={selectedDestination}
              onMarkerClick={setSelectedDestination}
            />
          </div>
        </section>
      )}

      {/* Categories */}
      {destinationsByCategory.map((category) => {
        if (category.places.length === 0) return null;

        return (
          <section key={category.id} className="section-padding border-b border-border last:border-b-0">
            <div className="container-custom">
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <div className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center`}>
                  <category.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                    {category.title}
                  </h2>
                  <p className="text-muted-foreground">{category.description}</p>
                </div>
              </div>

              {/* Places Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.places.map((place) => {
                  const imageSrc = imageMap[place.slug] || place.image;
                  
                  return (
                    <Link
                      key={place._id}
                      to={`/explore/${place.slug}`}
                      className="group relative overflow-hidden rounded-2xl aspect-[4/3] shadow-card hover:shadow-elevated transition-all duration-500"
                      onMouseEnter={() => setSelectedDestination(place)}
                      onMouseLeave={() => setSelectedDestination(null)}
                    >
                      <img 
                        src={imageSrc} 
                        alt={place.name}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-5 text-primary-foreground">
                        <h3 className="font-display text-lg font-semibold">
                          {place.name}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
};

export default ExplorePage;
