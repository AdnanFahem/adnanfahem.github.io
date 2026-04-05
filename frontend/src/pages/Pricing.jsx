import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Shield, CheckCircle, ArrowRight, Phone, Star } from "@phosphor-icons/react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const packages = [
  { id: "basic", name: "Basic", price: "From £12/hr", description: "Essential security for small businesses", features: ["SIA Licensed Guards", "Uniform & Equipment", "Incident Reporting", "8-Hour Minimum Shift", "Basic Training"], popular: false },
  { id: "standard", name: "Standard", price: "From £15/hr", description: "Comprehensive security for growing businesses", features: ["Everything in Basic", "24/7 Control Room Support", "Mobile Patrol Backup", "Monthly Reports", "Advanced Training", "Dedicated Account Manager"], popular: true },
  { id: "premium", name: "Premium", price: "Custom", description: "Enterprise-grade security solutions", features: ["Everything in Standard", "CCTV Integration", "Risk Assessment", "Custom Protocols", "Executive Protection", "Priority Response", "Quarterly Reviews"], popular: false },
];

export default function Pricing() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", service_required: "", package: "", message: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`${API}/services`);
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.service_required) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/quote`, formData);
      toast.success("Quote request submitted! We'll contact you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", company: "", service_required: "", package: "", message: "" });
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="pricing-page" className="min-h-screen pt-20">
      <section className="relative py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">Pricing</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-black uppercase text-white mb-6">Transparent Pricing</h1>
            <p className="text-lg text-slate-300 leading-relaxed">Choose a package that suits your needs, or request a custom quote for tailored security solutions.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid md:grid-cols-3 gap-6">
            {packages.map((pkg, index) => (
              <motion.div key={pkg.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} data-testid={`package-${pkg.id}`} className={`relative bg-[#0A0F1C] border p-8 ${pkg.popular ? "border-yellow-500" : "border-white/10"}`}>
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-yellow-500 text-black text-xs font-bold px-4 py-1 uppercase tracking-wider flex items-center gap-1">
                    <Star weight="fill" className="w-3 h-3" /> Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{pkg.name}</h3>
                <p className="text-3xl font-black text-yellow-500 mb-2">{pkg.price}</p>
                <p className="text-sm text-slate-400 mb-6">{pkg.description}</p>
                <ul className="space-y-3 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-slate-300">
                      <CheckCircle weight="fill" className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />{feature}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setFormData({ ...formData, package: pkg.name })} className={`w-full font-bold px-6 py-3 text-sm uppercase tracking-wider transition-all ${pkg.popular ? "bg-yellow-500 text-black hover:bg-yellow-400" : "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black"}`}>Select Package</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">Get a Quote</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Request Your Free Quote</h2>
              <p className="text-slate-300 mb-8">Fill out the form and our team will get back to you within 24 hours with a tailored quote.</p>
              <div className="bg-[#050810] border border-white/10 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Phone weight="duotone" className="w-10 h-10 text-yellow-500" />
                  <div>
                    <p className="text-sm text-slate-400">Prefer to talk?</p>
                    <a href="tel:+447943715313" className="text-xl font-bold text-white hover:text-yellow-500 transition-colors">+44 7943 715313</a>
                  </div>
                </div>
                <p className="text-sm text-slate-400">Available 24/7 for emergencies</p>
              </div>
            </div>
            <form onSubmit={handleSubmit} data-testid="quote-form" className="bg-[#050810] border border-white/10 p-8">
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} data-testid="quote-name" className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="John Smith" required />
                </div>
                <div>
                  <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Email *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} data-testid="quote-email" className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="john@company.com" required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Phone *</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} data-testid="quote-phone" className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="020 1234 5678" required />
                </div>
                <div>
                  <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Company</label>
                  <input type="text" value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} data-testid="quote-company" className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="Company Name" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Service Required *</label>
                  <select value={formData.service_required} onChange={(e) => setFormData({ ...formData, service_required: e.target.value })} data-testid="quote-service" className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500" required>
                    <option value="">Select a service</option>
                    {services.map((s) => (<option key={s.id} value={s.title}>{s.title}</option>))}
                  </select>
                </div>
                <div>
                  <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Package</label>
                  <select value={formData.package} onChange={(e) => setFormData({ ...formData, package: e.target.value })} data-testid="quote-package" className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500">
                    <option value="">Select a package</option>
                    {packages.map((p) => (<option key={p.id} value={p.name}>{p.name}</option>))}
                  </select>
                </div>
              </div>
              <div className="mb-6">
                <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Message</label>
                <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} data-testid="quote-message" rows={4} className="bg-[#0A0F1C] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600 resize-none" placeholder="Tell us about your security requirements..." />
              </div>
              <button type="submit" disabled={loading} data-testid="quote-submit" className="w-full bg-yellow-500 text-black font-bold px-6 py-4 text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? "Submitting..." : (<>Submit Request <ArrowRight weight="bold" className="w-4 h-4" /></>)}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
