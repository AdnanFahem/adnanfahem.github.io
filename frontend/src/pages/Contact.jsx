import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Phone, EnvelopeSimple, MapPin, ArrowRight, Clock, CaretDown } from "@phosphor-icons/react";
import axios from "axios";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const contactInfo = [
  { icon: Phone, label: "Phone", value: "+44 7943 715313", href: "tel:+447943715313" },
  { icon: EnvelopeSimple, label: "Email", value: "B21secu@gmail.com", href: "mailto:B21secu@gmail.com" },
  { icon: MapPin, label: "Address", value: "Birmingham, UK", href: null },
  { icon: Clock, label: "Hours", value: "24/7 - Always Available", href: null },
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [faqs, setFaqs] = useState([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(`${API}/faqs`);
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
      }
    };
    fetchFaqs();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/contact`, formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div data-testid="contact-page" className="min-h-screen pt-20">
      <section className="relative py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">Contact Us</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tighter font-black uppercase text-white mb-6">Get In Touch</h1>
            <p className="text-lg text-slate-300 leading-relaxed">Have questions about our security services? We're here to help. Reach out to us and our team will respond within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#050810]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Contact Information</h2>
              <div className="space-y-4 mb-12">
                {contactInfo.map((item, index) => (
                  <motion.div key={item.label} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="flex items-start gap-4 bg-[#0A0F1C] border border-white/10 p-6">
                    <item.icon weight="duotone" className="w-8 h-8 text-yellow-500 flex-shrink-0" />
                    <div>
                      <p className="text-sm uppercase tracking-wider text-slate-400 mb-1">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-white hover:text-yellow-500 transition-colors">{item.value}</a>
                      ) : (
                        <p className="text-white">{item.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="bg-yellow-500 p-6">
                <h3 className="text-lg font-bold text-black mb-2">24/7 Emergency Line</h3>
                <a href="tel:+447943715313" className="text-2xl font-black text-black hover:opacity-80 transition-opacity">+44 7943 715313</a>
              </div>
            </div>
            <form onSubmit={handleSubmit} data-testid="contact-form" className="bg-[#0A0F1C] border border-white/10 p-8">
              <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Name *</label>
                  <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} data-testid="contact-name" className="bg-[#050810] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="John Smith" required />
                </div>
                <div>
                  <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Email *</label>
                  <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} data-testid="contact-email" className="bg-[#050810] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="john@company.com" required />
                </div>
                <div>
                  <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Phone *</label>
                  <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} data-testid="contact-phone" className="bg-[#050810] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600" placeholder="020 1234 5678" required />
                </div>
                <div>
                  <label className="text-sm uppercase tracking-wider text-slate-400 font-semibold mb-2 block">Message *</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} data-testid="contact-message" rows={4} className="bg-[#050810] border border-white/10 text-white px-4 py-3 w-full focus:outline-none focus:border-yellow-500 placeholder:text-slate-600 resize-none" placeholder="How can we help you?" required />
                </div>
              </div>
              <button type="submit" disabled={loading} data-testid="contact-submit" className="w-full bg-yellow-500 text-black font-bold px-6 py-4 text-sm uppercase tracking-wider hover:bg-yellow-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                {loading ? "Sending..." : (<>Send Message <ArrowRight weight="bold" className="w-4 h-4" /></>)}
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-[#0A0F1C]">
        <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">Our Location</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Visit Our Office</h2>
              <p className="text-slate-300 mb-8">Our headquarters is located in the heart of London. Feel free to visit us during business hours or schedule an appointment.</p>
              <div className="aspect-video bg-[#050810] border border-white/10 overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2483.542767784389!2d-0.14066368423417573!3d51.49707797963387!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487604d94a5e99bb%3A0xf7c7fb0b7aa19dfc!2sVictoria%20St%2C%20London!5e0!3m2!1sen!2suk!4v1680000000000!5m2!1sen!2suk"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Office Location"
                />
              </div>
            </div>
            <div>
              <p className="text-xs sm:text-sm uppercase tracking-[0.2em] font-bold text-yellow-500 mb-4">FAQ</p>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="space-y-2">
                {faqs.map((faq) => (
                  <AccordionItem key={faq.id} value={faq.id} className="bg-[#050810] border border-white/10 px-6">
                    <AccordionTrigger data-testid={`faq-${faq.id}`} className="text-left text-white hover:text-yellow-500 py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-slate-400 pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
