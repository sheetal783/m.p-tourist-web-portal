import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mountain, Users, TreePine } from "lucide-react";
import heroImage from "@/assets/hero-mp.jpg";
import kanhaImage from "@/assets/kanha-tiger.jpg";
import khajurahoImage from "@/assets/khajuraho.jpg";
import pachmarhiImage from "@/assets/pachmarhi.jpg";
import sanchiImage from "@/assets/sanchi.jpg";

const categories = [
  {
    icon: TreePine,
    title: "Eco Tourism",
    description: "Wildlife sanctuaries & natural reserves",
    color: "bg-forest",
  },
  {
    icon: Mountain,
    title: "Heritage Sites",
    description: "UNESCO World Heritage monuments",
    color: "bg-terracotta",
  },
  {
    icon: Users,
    title: "Tribal Culture",
    description: "Indigenous community experiences",
    color: "bg-amber",
  },
];

const destinations = [
  {
    name: "Kanha National Park",
    category: "Eco Tourism",
    image: kanhaImage,
    description: "Home to the majestic Bengal tiger",
  },
  {
    name: "Khajuraho Temples",
    category: "Heritage",
    image: khajurahoImage,
    description: "UNESCO World Heritage masterpiece",
  },
  {
    name: "Pachmarhi",
    category: "Hill Station",
    image: pachmarhiImage,
    description: "Queen of Satpura ranges",
  },
  {
    name: "Sanchi Stupa",
    category: "Buddhist Heritage",
    image: sanchiImage,
    description: "Ancient Buddhist monuments",
  },
];

const HomePage = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0">
          <img
            src={heroImage}
            alt="Scenic view of Madhya Pradesh"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/70 to-transparent" />
        </div>

        <div className="container-custom relative z-10 pt-20">
          <div className="max-w-2xl text-primary-foreground">
            <span className="inline-block px-4 py-2 bg-primary-foreground/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              Sustainable Tourism Initiative
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Discover Madhya Pradesh
              <span className="block text-amber">
                Sustainably & Authentically
              </span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 leading-relaxed">
              Experience the heart of India through eco-friendly tourism that
              celebrates nature, culture, and local communities.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/explore">
                  Explore Places
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button variant="hero-outline" size="xl" asChild>
                <Link to="/features">Plan Your Trip</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Explore by Category
            </h2>
            <p className="text-muted-foreground">
              Discover the diverse treasures of Madhya Pradesh through curated
              experiences
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.title}
                to="/explore"
                className="group p-6 bg-card rounded-2xl shadow-soft hover:shadow-elevated transition-all duration-500 hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 ${category.color} rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}
                >
                  <category.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {category.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Destinations & CTA sections unchanged */}
    </main>
  );
};

export default HomePage;
