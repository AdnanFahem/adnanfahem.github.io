import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowRight, UserCircle, Calendar, HardHat, Eye, Car, ShoppingBag, CheckCircle, Dog } from "@phosphor-icons/react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const iconMap = { UserCircle, Calendar, HardHat, Eye, Car, ShoppingBag, Dog };

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#050810]">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div data-testid="services-page" className="min-h-screen pt-20">
      <section className="relative py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">Our Services</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-black uppercase text-white mb-6">Comprehensive Security Solutions</h1>
            <p className="text-lg text-slate-300 leading-relaxed">From manned guarding to advanced CCTV monitoring, we offer a full range of professional security services.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="space-y-8">
            {services.map((service, index) => {
              const Icon = iconMap[service.icon] || Shield;
              const isEven = index % 2 === 0;
              return (
                <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} data-testid={`service-item-${service.slug}`} className="bg-[#0A0F1C] border border-white/10 hover:border-yellow-500/50 transition-colors overflow-hidden">
                  <div className={`grid md:grid-cols-2`}>
                    <div className={`relative h-64 md:h-auto min-h-[300px] ${isEven ? "" : "md:order-2"}`}>
                      {service.image ? (
                        <img src={service.image} alt={service.title} className="absolute inset-0 w-full h-full object-cover" />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C]/80 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Icon weight="duotone" className="w-24 h-24 text-yellow-500/50" />
                      </div>
                    </div>
                    <div className={`p-8 md:p-12 flex flex-col justify-center ${isEven ? "" : "md:order-1"}`}>
                      <Icon weight="duotone" className="w-12 h-12 text-yellow-500 mb-6" />
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{service.title}</h2>
                      <p className="text-slate-300 leading-relaxed mb-6">{service.description}</p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                            <CheckCircle weight="fill" className="w-4 h-4 text-emerald-500 flex-shrink-0" />{feature}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <Link to={`/services/${service.slug}`} data-testid={`learn-more-${service.slug}`} className="bg-yellow-500 text-black font-bold px-6 py-3 text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all inline-flex items-center justify-center gap-2">Learn More <ArrowRight weight="bold" className="w-4 h-4" /></Link>
                        <Link to="/pricing" className="bg-transparent border border-white/20 text-white font-bold px-6 py-3 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all inline-flex items-center justify-center">Get Quote</Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-black mb-6">Need a Custom Solution?</h2>
          <p className="text-lg text-black/80 mb-10 max-w-2xl mx-auto">Our security experts can create a tailored package for your specific needs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" data-testid="services-cta-contact" className="bg-black text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-[#0A0F1C] transition-all inline-flex items-center justify-center gap-2">Contact Our Team <ArrowRight weight="bold" className="w-5 h-5" /></Link>
            <Link to="/pricing" className="bg-transparent border-2 border-black text-black font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-black hover:text-white transition-all inline-flex items-center justify-center">View Pricing</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
