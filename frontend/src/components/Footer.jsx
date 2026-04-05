import { Link } from "react-router-dom";
import {
  Shield,
  Phone,
  EnvelopeSimple,
  MapPin,
  LinkedinLogo,
  TwitterLogo,
  FacebookLogo,
  InstagramLogo,
} from "@phosphor-icons/react";

const footerLinks = {
  services: [
    { name: "Manned Guarding", path: "/services/manned-guarding" },
    { name: "Event Security", path: "/services/event-security" },
    { name: "Construction Security", path: "/services/construction-security" },
    { name: "CCTV Monitoring", path: "/services/cctv-monitoring" },
    { name: "Mobile Patrols", path: "/services/mobile-patrols" },
    { name: "Retail Security", path: "/services/retail-security" },
    { name: "Dog Handling / K9", path: "/services/dog-handling" },
  ],
  company: [
    { name: "About Us", path: "/about" },
    { name: "Careers", path: "/careers" },
    { name: "Industries", path: "/industries" },
    { name: "Contact", path: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", path: "#" },
    { name: "Terms of Service", path: "#" },
    { name: "Cookie Policy", path: "#" },
  ],
};

const socialLinks = [
  { icon: LinkedinLogo, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: TwitterLogo, href: "https://twitter.com", label: "Twitter" },
  { icon: FacebookLogo, href: "https://facebook.com", label: "Facebook" },
  { icon: InstagramLogo, href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer data-testid="main-footer" className="bg-[#0A0F1C] border-t border-white/10">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <Shield weight="duotone" className="w-10 h-10 text-yellow-500" />
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white">
                  B21 SECURITY
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
                  LTD
                </span>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Professional security services across the UK. SIA licensed guards,
              24/7 protection, and complete peace of mind. Specialists in dog handling and K9 security.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`social-link-${social.label.toLowerCase()}`}
                  className="w-10 h-10 flex items-center justify-center bg-white/5 border border-white/10 text-slate-400 hover:text-yellow-500 hover:border-yellow-500/50 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon weight="fill" className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-yellow-500 mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    data-testid={`footer-service-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-slate-400 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-yellow-500 mb-6">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    data-testid={`footer-company-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-slate-400 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-yellow-500 mt-8 mb-6">
              Legal
            </h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-yellow-500 mb-6">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:+447943715313"
                  data-testid="footer-phone"
                  className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <Phone
                    weight="duotone"
                    className="w-5 h-5 text-yellow-500 mt-0.5"
                  />
                  <span className="text-sm">+44 7943 715313</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:B21secu@gmail.com"
                  data-testid="footer-email"
                  className="flex items-start gap-3 text-slate-400 hover:text-white transition-colors group"
                >
                  <EnvelopeSimple
                    weight="duotone"
                    className="w-5 h-5 text-yellow-500 mt-0.5"
                  />
                  <span className="text-sm">B21secu@gmail.com</span>
                </a>
              </li>
              <li className="flex items-start gap-3 text-slate-400">
                <MapPin
                  weight="duotone"
                  className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0"
                />
                <span className="text-sm">
                  Birmingham, UK
                </span>
              </li>
            </ul>
            <div className="mt-8 p-4 bg-white/5 border border-white/10">
              <p className="text-xs uppercase tracking-wider text-yellow-500 font-bold mb-2">
                24/7 Emergency Line
              </p>
              <a
                href="tel:+447943715313"
                className="text-lg font-bold text-white hover:text-yellow-500 transition-colors"
              >
                +44 7943 715313
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm text-center md:text-left">
              © {new Date().getFullYear()} B21 Security Ltd. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-slate-500">
              <span>SIA Approved Contractor</span>
              <span className="hidden md:inline">•</span>
              <span>ISO 9001 Certified</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
