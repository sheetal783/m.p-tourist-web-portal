import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bot, Map, Languages, Smartphone, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ItineraryModal from "@/components/ItineraryModal";

const features = [
  {
    icon: Bot,
    title: "AI-Powered Itinerary",
    description:
      "Get personalized travel plans based on your preferences, interests, and travel style. Our AI considers weather, local events, and crowd levels.",
    status: "Concept",
  },
  {
    icon: Map,
    title: "Interactive Maps",
    description:
      "Navigate through MP with detailed interactive maps showing attractions, eco-stays, local eateries, and sustainable transport options.",
    status: "Concept",
  },
  {
    icon: Languages,
    title: "Multilingual Support",
    description:
      "Access content in Hindi, English, and regional languages. Audio guides available for major attractions in multiple languages.",
    status: "Concept",
  },
  {
    icon: BarChart3,
    title: "Eco-Friendly Suggestions",
    description:
      "Receive recommendations for responsible travel options, sustainable stays, and eco-conscious activities throughout your journey.",
    status: "Concept",
  },
  {
    icon: Smartphone,
    title: "Mobile App (Future)",
    description:
      "A dedicated mobile application with offline access, AR experiences at heritage sites, and real-time updates.",
    status: "Planned",
  },
  {
    icon: BarChart3,
    title: "Tourism Analytics",
    description:
      "Data-driven insights for authorities to manage tourism flow, improve infrastructure, and enhance visitor experience.",
    status: "Concept",
  },
];

const SmartFeaturesPage = () => {
  const navigate = useNavigate();
  const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState<any>(null);

  const handleFeatureClick = (featureTitle: string) => {
    if (featureTitle === "AI-Powered Itinerary") {
      setIsItineraryModalOpen(true);
    } else if (featureTitle === "Interactive Maps") {
      navigate("/map");
    }
  };

  const handleItineraryGenerated = (itinerary: any) => {
    setGeneratedItinerary(itinerary);
    // Navigate to map with itinerary data
    navigate("/map", { state: { itinerary } });
  };

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-forest/10 text-forest rounded-full text-sm font-medium mb-4">
              Smart Technology
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Smart Features for Modern Travel
            </h1>
            <p className="text-lg text-muted-foreground">
              Leveraging technology to enhance your travel experience while
              promoting responsible tourism practices across Madhya Pradesh.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className={`group p-8 bg-card border border-border rounded-2xl hover:shadow-elevated transition-all duration-500 hover:-translate-y-1 ${
                  feature.title === "AI-Powered Itinerary" || feature.title === "Interactive Maps"
                    ? "cursor-pointer"
                    : ""
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleFeatureClick(feature.title)}
              >
                <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                  <feature.icon className="w-7 h-7 text-forest" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                      feature.status === "Planned"
                        ? "bg-amber/20 text-amber"
                        : "bg-forest/20 text-forest"
                    }`}
                  >
                    {feature.status}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="section-padding bg-forest">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center text-primary-foreground">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Experience the Future of Travel
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-8">
              This is a concept demonstration of how technology can
              revolutionize tourism in Madhya Pradesh. The actual implementation
              will include real-time data and functional features.
            </p>
            <Button variant="hero" size="lg">
              View Demo (Coming Soon)
            </Button>
          </div>
        </div>
      </section>

      <ItineraryModal
        open={isItineraryModalOpen}
        onOpenChange={setIsItineraryModalOpen}
        onItineraryGenerated={handleItineraryGenerated}
      />
    </main>
  );
};

export default SmartFeaturesPage;
