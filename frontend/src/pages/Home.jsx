import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import {
  Shield,
  ArrowRight,
  Phone,
  CheckCircle,
  UserCircle,
  Calendar,
  HardHat,
  Eye,
  Car,
  ShoppingBag,
  Star,
  Buildings,
  Storefront,
  Crane,
  House,
  Ticket,
  Quotes,
  Dog,
} from "@phosphor-icons/react";
import axios from "axios";
import { useQuoteModal } from "@/context/QuoteModalContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const iconMap = {
  UserCircle,
  Calendar,
  HardHat,
  Eye,
  Car,
  ShoppingBag,
  Buildings,
  Storefront,
  Crane,
  House,
  Ticket,
};

const trustBadges = [
  "SIA Approved Contractor",
  "ISO 9001 Certified",
  "24/7 Support",
  "5000+ Guards",
  "20+ Years Experience",
  "UK Wide Coverage",
];

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "5000+", label: "Security Officers" },
  { value: "500+", label: "Active Clients" },
  { value: "24/7", label: "Support Available" },
];

export default function Home() {
  const [services, setServices] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [industries, setIndustries] = useState([]);
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, testimonialsRes, industriesRes] = await Promise.all([
          axios.get(`${API}/services`),
          axios.get(`${API}/testimonials`),
          axios.get(`${API}/industries`),
        ]);
        setServices(servicesRes.data);
        setTestimonials(testimonialsRes.data);
        setIndustries(industriesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div data-testid="home-page" className="min-h-screen">
      {/* Hero Section */}
      <section
        data-testid="hero-section"
        className="relative min-h-screen flex items-center pt-20"
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1573575633303-42e3e9fdd6c5?w=1920&q=80"
            alt="Security professional overlooking city at night"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050810]/95 via-[#050810]/80 to-[#050810]/60" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-6">
              UK's Trusted Security Partner
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl tracking-tighter font-black uppercase text-white mb-6 leading-[0.9]">
              Your Safety,
              <br />
              <span className="text-gradient-gold">Our Priority</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed mb-10 max-w-xl">
              Professional SIA-licensed security services protecting businesses,
              events, and properties across the United Kingdom. Available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => openQuoteModal()}
                data-testid="hero-cta-quote"
                className="bg-yellow-500 text-black font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-yellow-400 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(234,179,8,0.3)] transition-all inline-flex items-center justify-center gap-2 btn-shine"
              >
                Get a Free Quote
                <ArrowRight weight="bold" className="w-5 h-5" />
              </button>
              <a
                href="tel:+447943715313"
                data-testid="hero-cta-call"
                className="bg-transparent border border-white/20 text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all inline-flex items-center justify-center gap-2"
              >
                <Phone weight="fill" className="w-5 h-5" />
                +44 7943 715313
              </a>
            </div>
          </motion.div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 z-10 bg-[#0A0F1C]/90 backdrop-blur-xl border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="py-6 md:py-8 text-center"
                >
                  <p className="text-2xl md:text-3xl lg:text-4xl font-black text-yellow-500">
                    {stat.value}
                  </p>
                  <p className="text-xs md:text-sm uppercase tracking-wider text-slate-400 mt-1">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Marquee */}
      <section className="py-6 bg-yellow-500">
        <Marquee gradient={false} speed={40} pauseOnHover>
          {[...trustBadges, ...trustBadges].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-3 mx-8 text-black"
            >
              <Shield weight="fill" className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-wider whitespace-nowrap">
                {badge}
              </span>
            </div>
          ))}
        </Marquee>
      </section>

      {/* Services Section */}
      <section
        data-testid="services-section"
        className="py-24 md:py-32 bg-[#050810]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">
              What We Offer
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-white">
              Our Security Services
            </h2>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-6">
            {services.slice(0, 6).map((service, index) => {
              const Icon = iconMap[service.icon] || Shield;
              const isLarge = index === 0;
              const isMedium = index === 1 || index === 2;

              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    ${isLarge ? "md:col-span-8 lg:col-span-8 lg:row-span-2" : ""}
                    ${isMedium ? "md:col-span-4 lg:col-span-4" : ""}
                    ${!isLarge && !isMedium ? "md:col-span-4 lg:col-span-4" : ""}
                  `}
                >
                  <Link
                    to={`/services/${service.slug}`}
                    data-testid={`service-card-${service.slug}`}
                    className={`block bg-[#0A0F1C] border border-white/10 p-8 hover:border-yellow-500/50 transition-all group h-full ${
                      isLarge ? "min-h-[400px]" : "min-h-[200px]"
                    }`}
                  >
                    <Icon
                      weight="duotone"
                      className="w-12 h-12 text-yellow-500 mb-6 group-hover:scale-110 transition-transform"
                    />
                    <h3 className="text-xl sm:text-2xl tracking-tight font-semibold text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">
                      {service.description}
                    </p>
                    {isLarge && (
                      <ul className="space-y-2 mt-6">
                        {service.features.slice(0, 4).map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-slate-300"
                          >
                            <CheckCircle
                              weight="fill"
                              className="w-4 h-4 text-emerald-500"
                            />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <div className="flex items-center gap-2 text-yellow-500 text-sm font-semibold mt-auto pt-4">
                      Learn More
                      <ArrowRight
                        weight="bold"
                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/services"
              data-testid="view-all-services"
              className="inline-flex items-center gap-2 bg-transparent border border-white/20 text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all"
            >
              View All Services
              <ArrowRight weight="bold" className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section
        data-testid="industries-section"
        className="py-24 md:py-32 bg-[#0A0F1C]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">
              Sectors We Protect
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-white">
              Industries We Serve
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {industries.map((industry, index) => {
              const Icon = iconMap[industry.icon] || Shield;
              return (
                <motion.div
                  key={industry.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to="/industries"
                    data-testid={`industry-card-${industry.slug}`}
                    className="block bg-[#050810] border border-white/10 p-6 md:p-8 text-center hover:border-yellow-500/50 hover:bg-[#0A0F1C] transition-all group"
                  >
                    <Icon
                      weight="duotone"
                      className="w-10 h-10 md:w-12 md:h-12 text-yellow-500 mx-auto mb-4 group-hover:scale-110 transition-transform"
                    />
                    <h3 className="text-sm md:text-base font-semibold text-white uppercase tracking-wider">
                      {industry.title}
                    </h3>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        data-testid="testimonials-section"
        className="py-24 md:py-32 bg-[#050810]"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">
              Client Testimonials
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-white">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                data-testid={`testimonial-${testimonial.id}`}
                className="bg-[#0A0F1C] border border-white/10 p-8 hover:border-yellow-500/50 transition-colors"
              >
                <Quotes
                  weight="fill"
                  className="w-10 h-10 text-yellow-500/30 mb-4"
                />
                <p className="text-slate-300 leading-relaxed mb-6">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-yellow-500/20 flex items-center justify-center text-yellow-500 font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-white font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-slate-400">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                  <div className="ml-auto flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        weight="fill"
                        className="w-4 h-4 text-yellow-500"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        data-testid="cta-section"
        className="py-24 md:py-32 bg-yellow-500"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-black mb-6">
              Ready to Secure Your Business?
            </h2>
            <p className="text-lg text-black/80 mb-10 max-w-2xl mx-auto">
              Get in touch today for a free, no-obligation security assessment
              and quote tailored to your specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openQuoteModal()}
                data-testid="cta-get-quote"
                className="bg-black text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-[#0A0F1C] transition-all inline-flex items-center justify-center gap-2"
              >
                Get a Free Quote
                <ArrowRight weight="bold" className="w-5 h-5" />
              </button>
              <Link
                to="/contact"
                data-testid="cta-contact"
                className="bg-transparent border-2 border-black text-black font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all inline-flex items-center justify-center"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
