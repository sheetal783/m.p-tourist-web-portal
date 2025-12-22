import { Target, Lightbulb, Rocket, GraduationCap } from "lucide-react";

const AboutPage = () => {
  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 bg-forest/10 text-forest rounded-full text-sm font-medium mb-4">
              GDG Hackathon Project
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              About EcoConnect MP
            </h1>
            <p className="text-lg text-muted-foreground">
              A conceptual digital platform designed to revolutionize eco and 
              cultural tourism in Madhya Pradesh through technology and sustainable practices.
            </p>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-terracotta/20 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-terracotta" />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Problem Statement
                </h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Madhya Pradesh, often called the "Heart of India," possesses incredible 
                  natural and cultural heritage. However, the tourism sector faces several challenges:
                </p>
                <ul className="space-y-2 list-disc list-inside">
                  <li>Limited digital presence and discoverability of destinations</li>
                  <li>Lack of sustainable tourism practices</li>
                  <li>Insufficient support for local communities and guides</li>
                  <li>No centralized platform for eco-conscious travelers</li>
                  <li>Cultural heritage not adequately promoted or protected</li>
                </ul>
              </div>
            </div>
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-forest/20 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-forest" />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Proposed Solution
                </h2>
              </div>
              <p className="text-muted-foreground mb-4">
                EcoConnect MP is a comprehensive digital platform that addresses these 
                challenges through:
              </p>
              <ul className="space-y-3">
                {[
                  "Unified digital platform showcasing all destinations",
                  "AI-powered sustainable itinerary planning",
                  "Direct connection with local communities and guides",
                  "Eco-conscious travel recommendations",
                  "Cultural preservation through digital storytelling",
                  "Multilingual support for wider accessibility"
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-forest rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Future Scope */}
      <section className="section-padding bg-cream">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 bg-amber/20 rounded-xl flex items-center justify-center">
                <Rocket className="w-7 h-7 text-amber" />
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Future Scope
            </h2>
            <p className="text-muted-foreground">
              The vision extends beyond this concept to create a fully functional ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Mobile Application",
                description: "Native iOS and Android apps with offline access, AR experiences at heritage sites, and real-time notifications."
              },
              {
                title: "AR/VR Experiences",
                description: "Virtual tours of heritage sites, augmented reality guides at locations, and immersive cultural experiences."
              },
              {
                title: "Real Bookings",
                description: "Integration with hotels, guides, and transport providers for seamless booking and payment processing."
              },
              {
                title: "Community Dashboard",
                description: "Tools for local communities to manage their listings, track earnings, and receive feedback."
              },
              {
                title: "Carbon Tracking",
                description: "Real-time carbon footprint calculation and offset options through verified local projects."
              },
              {
                title: "Government Integration",
                description: "Data sharing with tourism authorities for better planning, monitoring, and development."
              }
            ].map((item, index) => (
              <div
                key={item.title}
                className="p-6 bg-card border border-border rounded-2xl"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Info */}
      <section className="section-padding bg-forest text-primary-foreground">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                <GraduationCap className="w-8 h-8" />
              </div>
            </div>
            <h2 className="text-3xl font-display font-bold mb-4">
              For GDG Hackathon
            </h2>
            <p className="text-primary-foreground/80 mb-8">
              This is a concept website developed as part of an Hackathon project 
              to demonstrate the potential of technology in promoting sustainable 
              tourism in Madhya Pradesh by 
            </p>
            {/* <div className="inline-block px-6 py-3 bg-primary-foreground/10 rounded-xl">
              <p className="text-sm"></p>
            </div> */}
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
