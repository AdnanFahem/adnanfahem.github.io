import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowRight, Buildings, Storefront, Crane, House, Ticket, CheckCircle } from "@phosphor-icons/react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const iconMap = { Buildings, Storefront, Crane, House, Ticket };

const industryDetails = {
  corporate: { image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800", features: ["Reception Security", "Access Control", "Executive Protection", "CCTV Monitoring", "Patrol Services"] },
  retail: { image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800", features: ["Loss Prevention", "Customer Safety", "Stock Protection", "Staff Training", "Incident Response"] },
  construction: { image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800", features: ["Site Patrols", "Equipment Protection", "Access Management", "Fire Watch", "Health & Safety"] },
  residential: { image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800", features: ["Gate Security", "Patrol Services", "CCTV Systems", "Visitor Management", "Emergency Response"] },
  events: { image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800", features: ["Crowd Control", "VIP Protection", "Bag Searches", "Emergency Planning", "Steward Services"] },
};

export default function Industries() {
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const response = await axios.get(`${API}/industries`);
        setIndustries(response.data);
      } catch (error) {
        console.error("Error fetching industries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchIndustries();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#050810]">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div data-testid="industries-page" className="min-h-screen pt-20">
      <section className="relative py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">Industries We Serve</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-black uppercase text-white mb-6">Sector-Specific Security</h1>
            <p className="text-lg text-slate-300 leading-relaxed">We provide tailored security solutions for a wide range of industries, understanding that each sector has unique challenges and requirements.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="space-y-16">
            {industries.map((industry, index) => {
              const Icon = iconMap[industry.icon] || Shield;
              const details = industryDetails[industry.slug] || { features: [] };
              const isEven = index % 2 === 0;
              return (
                <motion.div key={industry.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} data-testid={`industry-${industry.slug}`} className="grid lg:grid-cols-2 gap-8 items-center">
                  <div className={`${isEven ? "" : "lg:order-2"}`}>
                    <div className="relative overflow-hidden">
                      <img src={details.image} alt={industry.title} className="w-full h-64 md:h-80 object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050810] to-transparent" />
                    </div>
                  </div>
                  <div className={`${isEven ? "" : "lg:order-1"}`}>
                    <Icon weight="duotone" className="w-12 h-12 text-yellow-500 mb-6" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{industry.title}</h2>
                    <p className="text-slate-300 leading-relaxed mb-6">{industry.description}</p>
                    {details.features.length > 0 && (
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                        {details.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm text-slate-400">
                            <CheckCircle weight="fill" className="w-4 h-4 text-emerald-500 flex-shrink-0" />{feature}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Link to="/pricing" className="bg-yellow-500 text-black font-bold px-6 py-3 text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all inline-flex items-center gap-2">Get a Quote <ArrowRight weight="bold" className="w-4 h-4" /></Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-yellow-500">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight font-bold text-black mb-6">Don't See Your Industry?</h2>
          <p className="text-lg text-black/80 mb-10 max-w-2xl mx-auto">We work with businesses across all sectors. Contact us to discuss your specific security requirements.</p>
          <Link to="/contact" data-testid="industries-cta-contact" className="bg-black text-white font-bold px-8 py-4 text-sm uppercase tracking-wider hover:bg-[#0A0F1C] transition-all inline-flex items-center justify-center gap-2">Contact Us <ArrowRight weight="bold" className="w-5 h-5" /></Link>
        </div>
      </section>
    </div>
  );
}
