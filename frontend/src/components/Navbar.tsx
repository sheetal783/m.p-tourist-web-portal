import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";

const navLinks = [
  { name: "Home", path: "/", translationKey: "home" },
  { name: "Explore MP", path: "/explore", translationKey: "explore" },
  { name: "Smart Features", path: "/features", translationKey: "features" },
  { name: "Sustainability", path: "/sustainability", translationKey: "sustainability" },
  { name: "About", path: "/about", translationKey: "about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === "en" ? "hi" : "en";
    i18n.changeLanguage(newLang);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Site Title (Logo Removed) */}
          <Link to="/" className="text-xl font-bold text-foreground">
            MP Tourism
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link text-sm font-medium ${
                  location.pathname === link.path ? "text-foreground" : ""
                }`}
              >
{t(`nav.${link.translationKey}` as any) || link.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Languages className="w-4 h-4" />
              <span className="uppercase">{i18n.language}</span>
            </Button>
            <Button variant="nature" size="sm">
              {t("nav.planTrip")}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-up">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? "text-foreground bg-muted rounded-lg"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
  {t(`nav.${link.translationKey}` as any) || link.name}
                </Link>
              ))}
              <div className="px-4 flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleLanguage}
                  className="flex items-center gap-2"
                >
                  <Languages className="w-4 h-4" />
                  <span className="uppercase">{i18n.language}</span>
                </Button>
              </div>
              <div className="px-4 pt-2">
                <Button variant="nature" size="sm" className="w-full">
                  {t("nav.planTrip")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
