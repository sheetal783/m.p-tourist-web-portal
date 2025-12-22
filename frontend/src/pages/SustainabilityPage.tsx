import { Users, TreePine, Heart, Globe, Shield, Recycle } from "lucide-react";

const principles = [
  {
    icon: Users,
    title: "Community Empowerment",
    description: "Supporting local communities through tourism. Our platform promotes local guides, homestays, and community-run initiatives that directly benefit residents."
  },
  {
    icon: TreePine,
    title: "Conservation Awareness",
    description: "Educating visitors about the importance of wildlife conservation and habitat protection. Every visit contributes to preservation efforts."
  },
  {
    icon: Heart,
    title: "Cultural Respect",
    description: "Promoting respectful engagement with tribal and local cultures. We encourage authentic cultural exchanges while protecting traditions."
  },
  {
    icon: Globe,
    title: "Low Carbon Travel",
    description: "Recommending eco-friendly transportation options and offsetting carbon footprints through tree plantation and renewable energy initiatives."
  },
  {
    icon: Shield,
    title: "Heritage Protection",
    description: "Working with authorities to protect and preserve historical monuments and archaeological sites for future generations."
  },
  {
    icon: Recycle,
    title: "Zero Waste Tourism",
    description: "Promoting plastic-free travel, waste reduction, and responsible consumption throughout the tourist journey."
  },
];

const impactStats = [
  { number: "50+", label: "Communities Supported" },
  { number: "25K+", label: "Trees Planted" },
  { number: "100%", label: "Local Guide Network" },
  { number: "Zero", label: "Plastic Tolerance" },
];

const SustainabilityPage = () => {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-forest/10 text-forest rounded-full text-sm font-medium mb-4">
              Our Commitment
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              Sustainability at the Core
            </h1>
            <p className="text-lg text-muted-foreground">
              We believe tourism should benefit both travelers and destinations. 
              Our approach ensures that every journey leaves a positive impact on 
              communities, cultures, and the environment.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-forest">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center text-primary-foreground">
                <p className="text-4xl md:text-5xl font-display font-bold mb-2 text-amber">
                  {stat.number}
                </p>
                <p className="text-sm text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Our Sustainability Principles
            </h2>
            <p className="text-muted-foreground">
              Every decision we make is guided by these core principles of responsible tourism.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <div
                key={principle.title}
                className="p-8 bg-card border border-border rounded-2xl hover:shadow-elevated transition-all duration-500 hover:-translate-y-1"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-forest/10 rounded-xl flex items-center justify-center mb-6">
                  <principle.icon className="w-7 h-7 text-forest" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {principle.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pledge Section */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-6">
              Take the Sustainable Travel Pledge
            </h2>
            <p className="text-muted-foreground mb-8">
              Join thousands of conscious travelers who have committed to 
              traveling responsibly in Madhya Pradesh.
            </p>
            <div className="p-8 bg-card border border-border rounded-2xl text-left">
              <ul className="space-y-4">
                {[
                  "I will respect local customs and traditions",
                  "I will minimize my environmental footprint",
                  "I will support local communities and businesses",
                  "I will follow all conservation guidelines",
                  "I will leave every place better than I found it"
                ].map((pledge, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-forest rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground">{pledge}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SustainabilityPage;
