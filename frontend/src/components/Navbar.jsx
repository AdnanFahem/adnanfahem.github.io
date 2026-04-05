import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, Shield, Phone } from "@phosphor-icons/react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Services", path: "/services" },
  { name: "Industries", path: "/industries" },
  { name: "Pricing", path: "/pricing" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      data-testid="main-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#050810]/95 backdrop-blur-xl border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            data-testid="logo-link"
            className="flex items-center gap-3 group"
          >
            <Shield
              weight="duotone"
              className="w-10 h-10 text-yellow-500 group-hover:text-yellow-400 transition-colors"
            />
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-white">
                B21 SECURITY
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                LTD
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                data-testid={`nav-link-${link.name.toLowerCase()}`}
                className={`px-4 py-2 text-sm font-medium uppercase tracking-wider transition-colors ${
                  location.pathname === link.path
                    ? "text-yellow-500"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA & Mobile Menu */}
          <div className="flex items-center gap-4">
            <a
              href="tel:+447943715313"
              data-testid="nav-phone-link"
              className="hidden md:flex items-center gap-2 text-sm text-slate-300 hover:text-white transition-colors"
            >
              <Phone weight="duotone" className="w-5 h-5 text-yellow-500" />
              <span>+44 7943 715313</span>
            </a>
            <Link
              to="/pricing"
              data-testid="nav-quote-button"
              className="hidden md:inline-flex bg-yellow-500 text-black font-bold px-6 py-3 text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all btn-shine"
            >
              Get Quote
            </Link>
            <button
              onClick={() => setIsOpen(!isOpen)}
              data-testid="mobile-menu-toggle"
              className="lg:hidden p-2 text-white"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X weight="bold" className="w-6 h-6" />
              ) : (
                <List weight="bold" className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            data-testid="mobile-menu"
            className="lg:hidden bg-[#0A0F1C] border-b border-white/10"
          >
            <div className="px-6 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  data-testid={`mobile-nav-link-${link.name.toLowerCase()}`}
                  className={`block px-4 py-3 text-base font-medium uppercase tracking-wider transition-colors ${
                    location.pathname === link.path
                      ? "text-yellow-500 bg-white/5"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/pricing"
                data-testid="mobile-quote-button"
                className="block bg-yellow-500 text-black font-bold px-4 py-3 text-center uppercase tracking-wider mt-4"
              >
                Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
