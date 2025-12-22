import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-forest text-primary-foreground">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="font-display text-xl font-semibold">
                MP Tourism
              </span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Discover the heart of India through authentic and responsible
              travel experiences. Showcasing cultural heritage, natural beauty,
              and local communities of Madhya Pradesh.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Explore</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/explore"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                >
                  Eco Tourism
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                >
                  Cultural Heritage
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                >
                  Tribal Experiences
                </Link>
              </li>
              <li>
                <Link
                  to="/explore"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                >
                  Nature & Waterfalls
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/features"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                >
                  Smart Features
                </Link>
              </li>
              <li>
                <Link
                  to="/sustainability"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                >
                  About Project
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/80 hover:text-primary-foreground text-sm transition-colors"
                >
                  Travel Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <span>Bhopal, Madhya Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail className="w-4 h-4 shrink-0" />
                <span>info@mptourism.in</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 11 1111 1111</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
