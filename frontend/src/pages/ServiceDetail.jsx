import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ArrowRight, UserCircle, Calendar, HardHat, Eye, Car, ShoppingBag, CheckCircle, Phone, Dog } from "@phosphor-icons/react";
import axios from "axios";
import { useQuoteModal } from "@/context/QuoteModalContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const iconMap = { UserCircle, Calendar, HardHat, Eye, Car, ShoppingBag, Dog };

export default function ServiceDetail() {
  const { slug } = useParams();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const { openQuoteModal } = useQuoteModal();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`${API}/services/${slug}`);
        setService(response.data);
      } catch (error) {
        console.error("Error fetching service:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchService();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#050810]">
        <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#050810]">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Service Not Found</h1>
          <Link to="/services" className="text-yellow-500 hover:underline">Back to Services</Link>
        </div>
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Shield;

  return (
    <div data-testid="service-detail-page" className="min-h-screen pt-20">
      <section className="relative py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <Link to="/services" className="inline-flex items-center gap-2 text-slate-400 hover:text-white mb-6 transition-colors">
              <ArrowRight weight="bold" className="w-4 h-4 rotate-180" /> Back to Services
            </Link>
            <Icon weight="duotone" className="w-16 h-16 text-yellow-500 mb-6" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-black uppercase text-white mb-6">{service.title}</h1>
            <p className="text-lg text-slate-300 leading-relaxed">{service.description}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Key Features</h2>
              <ul className="space-y-4">
                {service.features.map((feature, index) => (
                  <motion.li key={feature} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start gap-4 bg-[#0A0F1C] border border-white/10 p-6">
                    <CheckCircle weight="fill" className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <div className="bg-[#0A0F1C] border border-white/10 p-8 md:p-12 h-fit">
              <h3 className="text-xl font-bold text-white mb-6">Get Started Today</h3>
              <p className="text-slate-400 mb-8">Contact us for a free consultation and quote tailored to your specific requirements.</p>
              <div className="space-y-4">
                <button onClick={() => openQuoteModal(service?.title)} data-testid="service-get-quote" className="w-full bg-yellow-500 text-black font-bold px-6 py-4 text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all flex items-center justify-center gap-2">Get a Quote <ArrowRight weight="bold" className="w-4 h-4" /></button>
                <a href="tel:+447943715313" className="w-full bg-transparent border border-white/20 text-white font-bold px-6 py-4 text-sm uppercase tracking-wider hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2"><Phone weight="fill" className="w-4 h-4" /> +44 7943 715313</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
